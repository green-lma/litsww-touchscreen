<script>
import {media, captions, mediaPlayerStop, mediaPlayerStart} from '$lib/stateStores/mediaPlayerState.svelte.js'
import MediaItem from '$lib/components/MediaItem.svelte'
import Accordion from '$lib/components/Accordion.svelte'
import { onMount } from 'svelte';
import { cubicOut, cubicInOut, linear } from 'svelte/easing';
import { fade, fly } from 'svelte/transition';
import { millisecondsToReadableTime, formatTimecode } from '$lib/helpers/conversion.js'
import { transcriptScroll } from '$lib/helpers/TranscriptActions.js'
import { RangeSlider } from 'svelte-range-slider-pips'
import { goto } from '$app/navigation';
import { tick } from "svelte";

let interactiveCaptionRefs = $state([])
let listContainer
let { data } = $props()
let sliderValue = $state(0)
let observer

let sideMenuItems = $state([])
let sideMenuContainer;

let showInteractiveCaptions = $state(false)
let showSmallImage = $state(true)
let showDev = $state(false)
let staticCaption = $state(true)

let rangeRef 


let sliderTouch = $state(false)

let stiffness = $state(0.1)
// let springs = $state({ stiffness: 0.01, damping: 0.5 })
let springs = $state({ stiffness: 1, damping: 1 })


let values = $state([0]);
let custVal = $state(0)

$effect(() => {
    // console.log('CV',custVal)
    console.log("AC ID", captions.activeCueID, )
})


let calculated = $derived(media.duration * (values[0] / 1000))

let prevIcon
let nextIcon

$effect(() => {
    media.currentTimeMs;
    let percent = (media.currentTimeMs / media.duration) * 1000
    let percent2 = (media.currentTimeMs / media.duration) * 100
    if(!sliderTouch && media.duration > 0){
        values[0] = percent
    }
})

	
function createDataTrack(el){
   
    if(el.event_type === 'cue_transition'){
        if(el.speaker){
            console.log('SPEAKER',el.speaker)
        }
        return {caption: el.new_captions, id: el.sequence, speaker: el.speaker}
    }
    if(el.event_type === 'image_transition'){
       
        return { 
            caption: el.image_reference, 
            collectionId: el.expand.image_reference.collectionId, 
            imageRefId: el.expand.image_reference.id, 
            imageFileName: el.expand.image_reference.image_file
        }
    }
}


function prepDataForCues(arr){
   
   let transformed
   if(arr){
    transformed = arr.map((el, index) => {
        return {
            id: index,
            start: `${el.start}`,
            end: `${el.end}`,
            text: JSON.stringify({event: el.event_type, data: createDataTrack(el)})
        }
    })
   } else {
    transformed = {}
   }

    return transformed
}

let currentItem = $state(0)

async function scrollToActive(index) {
    console.log('CALEEDDD')
        await tick(); // Ensure the DOM updates before scrolling

        const el = sideMenuItems[index];
        if (el && sideMenuContainer) {
            const containerTop = sideMenuContainer.getBoundingClientRect().top;
            const elementTop = el.getBoundingClientRect().top;
            const offset = elementTop - containerTop;

            sideMenuContainer.scrollTo({
                top: sideMenuContainer.scrollTop + offset - 100, // Adjust offset as needed
                behavior: "smooth"
            });
        }
}

$effect(() => {
currentItem;
console.log('RRRRR', sideMenuItems[currentItem])

scrollToActive(currentItem)

})


let nextItem = $derived.by((e) => { 
    if(currentItem < data.records.length){
        return currentItem + 1
    } else {
        return currentItem
    }
})

let prevItem = $derived.by(() => {
    
    if(currentItem > 0){
        return currentItem - 1
    } else {
        return currentItem
    }
})

let canvas


// USE this to control the playlist - fires when global state is set to ended. This is fired from the videojs component

$effect(() => { 
if(media.ended && nextItem !== data.records.length){
    changeSource(data.records[nextItem], nextItem)
    media.ended = false
} else {
    media.ended = false
}
})

function scrollToItem(attribute) {
    const item = attribute;
    if (item && listContainer) {
      // Scroll to ensure the item is visible
      listContainer.scrollTo({
        top: item.offsetTop - listContainer.offsetTop,
        behavior: 'smooth'
      });
    }
}

$effect(() => {
    scrollToItem(interactiveCaptionRefs[captions.activeCueID -1])
})



onMount(async () => {
  window.oncontextmenu = function() { return false; }
  
  const { Wave } = await import('@foobar404/wave');
  let els = document.getElementsByClassName('vjs-tech')[0]
  let wave = new Wave(els, canvas);
  
    wave.addAnimation(new wave.animations.Wave({
    count: 100,
    lineWidth: 1,
    // fillColor: 'rgba(255, 255, 255, 0.2)',
    // lineColor: 'rgba(255, 255, 255, 0.01)',
    fillColor: '#4b78b9',
    lineColor: '#6294DD',
    center: true,
    mirroredY: true,
    }));

    wave.addAnimation(
        new wave.animations.Lines({
          count: 100,
          center: true,
          mirroredY: true,
          lineColor: '#4b78b9',
          rounded: true,
          lineWidth: 2,
        })
    );
     
})

// INIT - Set the initial record
changeSource(data.records[0], 0)


function allowedMime(ext){
if(ext === 'mp3'){
    return `audio/mpeg`
} else {
    return ''
}
}

function setCaptions(index){
// console.log('190',data.records[index].expand['metadata_caption_cue(parent)'])
    let captionCues = data.records[index].expand.metadata_caption_cue_via_parent
    let imageCues = data.records[index].expand.metadata_image_cues

    captions.captionData = prepDataForCues(captionCues)
    captions.imagesData = prepDataForCues(imageCues)
}

function changeSource(item, index){
    setCaptions(index)
    currentItem = index
    let {id, collectionId, audio} = item.expand.media
    let extension = audio.split('.').pop()
    let mediaURL = `http://127.0.0.1:8090/api/files/${collectionId}/${id}/${audio}`
        media.src = mediaURL
        media.type = allowedMime(extension)
}

function formatMs(value) {
    return `${value} ms`;
  }

    function sliderChange(e){
        media.seek = calculated 
    }

    function sliderStart(e){
        // media.playing = false
        // mediaPlayerStop()
        sliderTouch = true
        springs.stiffness = 1
        springs.damping = 1
    }
    
    function sliderEnd(e){
        // mediaPlayerStart()
        // media.playing = true

        sliderTouch = false
        springs.stiffness = 1
        springs.damping = 1
    }

    function volumeControl(e){
        
        if(e.target.getAttribute('data-volume')){
            if(e.target.getAttribute('data-volume') === 'up'){
                if(media.volume < 100){
                    media.volume = media.volume + 10
                }
            }

            if(e.target.getAttribute('data-volume') === 'down'){
                if(media.volume > 0){
                    media.volume = media.volume - 10
                }
                
            }
        }
    }

    function handlePlayButton(e){
        console.log('Play Clicked', media.playing)
        // media.playing = !media.playing
        if(media.playing === true){
            mediaPlayerStop()
        } else {
            mediaPlayerStart()
        }
    }

    function handlePrev(){
        console.log('PREV')
        changeSource(data.records[prevItem], prevItem)
    }

    function handleNext(e){
        if(currentItem < data.records.length - 1){
            changeSource(data.records[nextItem], nextItem)
            nextIcon.classList.remove('icon-disabled')
        } else {
            nextIcon.classList.add('icon-disabled')
        }
    }

    function handleCustomSlider(e){
        let ggg = (media.currentTimeMs / media.duration * 100).toFixed(0)
        console.log( ggg)
    }

    function getPercent(){
        let sss = (media.currentTimeMs / media.duration * 1000).toFixed(0)
        return sss
    }

    function setPercent(valString){
        let val = parseInt(valString)
        media.seek = val * media.duration / 1000
    }

    // function handleCustomStart(e){
      
    //     console.log('start', e)

    //     media.playing = false 
       
    // }

    // function handleCustomEnd(e){
    //     console.log('stop', e.target.value)
        
    //     media.playing = true
    // }
    // function handleCustomMove(e){
    //     console.log('MOVE', e.target.value)
    // }

    function sortCaptions(arr){
        console.log('ARRR', arr.length)

        return arr.sort((a, b) => a.sequence - b.sequence)
    }

    
</script>


<div class="wrapper">
    <div class="sidebar">
        <div class="sidebar-instructions">
            <p>To play an item, click on the play icon <svg style="vertical-align: baseline" class="play-icon play-icon-dummy" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg> from the menu below</p>
            
        </div>
        <div class="side-menu" bind:this={sideMenuContainer}>
            <ul>
                {#each data.records as item, index}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <li bind:this={sideMenuItems[index]} class={ currentItem === index ? 'active' : ''} >
                    <div class={currentItem === index ? "header header-active" : "header"}>
                        {#if currentItem === index}  
                        <div class="header-icon">
                            <img class="wave-gif" src="/test.gif" alt="wave">
                        </div>        
                        {:else}
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div class="header-icon" onclick={() => {changeSource(item, index)}}>
                            <!-- <svg class="play-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> -->
                            <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        </div>
                        
                        {/if}
                        <div><p>{item.title}</p></div>
                    </div>
                    
                    <Accordion openState={currentItem === index ? true : false} >
                        <!-- <div slot="head">{item.title}</div> -->
                        <div slot="details">
                            <div class="menu-details-container">
                                {@html item.description}
                            </div>
                        </div>
                    </Accordion>
                </li>
                {/each}
            </ul>
            
        </div>
        <nav class="sidebar-nav">
            <button onclick={() => {goto('/menu')}}>Main menu</button>
            <button onclick={() => {goto('/')}}>Close and exit</button>
        </nav>
    </div>
    
    <div class="main-content-window">
        {#if showDev}
        <div class="dev-window">

            <div class="dev-menu-group">
                <p>Dev Only</p>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <svg onclick={() => {showDev = false}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 dev-close-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
            </div>
             
            <div class="dev-button-group">
                <button class={showInteractiveCaptions ? "dev-button-active" : ""} onclick={() => {showInteractiveCaptions = !showInteractiveCaptions}}>interactive transcript</button>
                <button class={showSmallImage ? "dev-button-active" : ""} onclick={() => {showSmallImage = !showSmallImage}}>small image</button>
                <button class={staticCaption ? "dev-button-active" : ""} onclick={() => {staticCaption = !staticCaption}}>static caption</button>
            </div>
            
        </div>
        {/if}
        <div class="image-container">
            {#if staticCaption}
            {#key captions.activeCueText}
            <div  class="caption-container">
                <div class={captions.activeCueSpeaker ? `caption ${captions.activeCueSpeaker}` : "caption"} transition:fade={{ delay: 50, duration: 400, easing: linear }}>
                    {@html captions.activeCueText}</div>
            </div>
            
            {/key}
            {/if}
            
            {#key captions.activeImage}
    
            <div transition:fade={{delay: 100, duration: 800, easing: linear }}>
    
            
             {#if captions.activeImage.imageFileName}
             <img  class="background-image" src="http://127.0.0.1:8090/api/files/{captions.activeImage.collectionId}/{captions.activeImage.imageRefId}/{captions.activeImage.imageFileName}" alt="">
             <!-- {:else}
             <img src="/shg_images/{currentItem + 1}.jpg" alt=""> -->
             {/if}
            </div>
            {/key}

            <!-- BOOK interactive transcript-->
            {#if showInteractiveCaptions}
            <div class="interactive-transcript-container">
                {#key currentItem}
                <div in:fade={{delay: 100, duration: 800, easing: linear }} bind:this={listContainer} class="interactive-transcript" use:transcriptScroll={{
                    cue: captions.activeCueID,
                    cueID: captions.activeCueID,
                    refs: interactiveCaptionRefs
                }}>
                    {#each sortCaptions(data.records[currentItem].expand.metadata_caption_cue_via_parent) as cues, i}
                    <div bind:this={interactiveCaptionRefs[i]} class={cues.sequence == captions.activeCueID ? "caption-item caption-item-active" : "caption-item"} data-id={cues.sequence}>
                        <span class="caption-timecode">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-font-size">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>{formatTimecode(cues.start)}</p>
                        </span>
                      <span class="caption-text-box">{@html cues.new_captions}</span>
                    </div>
                    {/each}
                </div>
                {/key}
            </div>

            
            {/if}
            <!-- BOOK interactive transcript-->

        </div>

            {#if showSmallImage}
                {#key captions.activeImage}
                    <div transition:fade={{delay: 100, duration: 800, easing: linear }}>
                    {#if captions.activeImage.imageFileName}
                    <img  class="test-small-image" src="http://127.0.0.1:8090/api/files/{captions.activeImage.collectionId}/{captions.activeImage.imageRefId}/{captions.activeImage.imageFileName}" alt="">
                    {:else}
                    {/if}
                    </div>
                {/key}
            {/if}
            
        
            <div class="custom-controlbar">
                <div class="custom-controlbar-controls">
                <span class="current-track">Playing: {data.records[currentItem].title}</span>
                <div class="progress-range">
                    <p>{millisecondsToReadableTime(media.currentTimeMs)}</p>
                    
                    {#key currentItem}
                    
                    <div  >
                    
                    <RangeSlider springValues=springs on:start={sliderStart}  on:stop={sliderEnd} on:change={sliderChange} range="min" step={0.01} min={0} max={1000}  bind:values />
                    </div>
                    {/key}
                
                    <p>{millisecondsToReadableTime(media.duration)}</p>
                </div>
                
                <div class="play-nav">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="controls-ui-btn" onclick={handlePrev}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={currentItem == 0 ? "icon icon-disabled" : "icon"}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                        </svg>          
                    </button>
                    <button class="controls-ui-btn" onclick={handlePlayButton} >
                        {#if media.playing}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon icon-play-pause">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>  
                        {:else}
                        <svg bind:this={prevIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon icon-play-pause">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>  
                        {/if}
                    </button>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="controls-ui-btn" onclick={handleNext}>
                        <svg bind:this={nextIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={nextItem >= data.records.length ? "icon icon-disabled" : "icon"}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                        </svg>          
                    </button>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <canvas bind:this={canvas} id="canvas"></canvas>  
                </div>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                </div>
                
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div onclick={volumeControl} class="volume-control">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <!-- <button onclick={() => {showDev = true}} class="btn dev-only">Dev Only</button>   -->
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                     <span class="volume-control-lable">Volume Control</span>
                    <button class="controls-ui-btn" data-volume="down">
                        <svg data-volume="down" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon icon-small icon-small-volume">
                            <path data-volume="down" stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>              
                    </button>
                    <p>{media.volume}%</p>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="controls-ui-btn" data-volume="up">
                        <svg data-volume="up" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon icon-small icon-small-volume">
                            <path data-volume="up" stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>              
                    </button>  
                      
                </div> 
                
            </div>
           
            
    </div>
    
    <MediaItem />
   
</div>


<style>

    

    .volume-control-lable {
        color: white;
        /* background-color: pink; */
        text-align: center;
        align-self: center;
        padding: 2px;
    }

    .current-track {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        /* background-color: black; */
        /* font-family: monospace; */
        font-size: 1.1rem;
    }

:global(p.trigger-warning)
     {
        color: var(--branding-secondary-red);
        background-color: var(--branding-secondary-red-tint);
        border: 2px solid var(--branding-secondary-red);
        border-radius: 5px;
        margin: 0px 15px;
        /* padding: 15px; */
    }

    .play-icon {
		fill: var(--branding-secondary-blue);
		width: 40px;
        cursor: pointer;
	}

    .play-icon.play-icon-dummy {
        fill: grey;
        cursor: none;
        width: 1.2rem;
        /* height: fit-content; */
        vertical-align: baseline;
        transform: translateY(0.2rem);
    }

    .sidebar-instructions {
        padding: 15px;
        display: flex;
        gap: 0.5rem;
        background-color: rgb(221, 221, 221);
        
    }

    .sidebar-instructions p{
        font-size: 1.2rem;
        
    }

    

	.wave-gif {
		height: 30px;
	}
    div.header {
		display:flex;
		/* flex-direction: row-reverse;
		justify-content: flex-end; */
		align-items: center;
		gap: 0.5rem;
		width:100%;
		
	}

	div.header-active {
		font-weight: 500;
		margin-bottom: 10px;
        padding: 5px;
		border-bottom: 1px solid var(--branding-secondary-blue-tint);
	}

    .header-icon {
        height: 100%;
        display: flex;
    }


:global(.dev-window){
    width: 400px;
    /* height: 400px; */
    background-color: black;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -10%);
    z-index: 999;
    color: greenyellow;
    padding: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
}

.dev-menu-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.dev-button-group {
    display: flex;
    justify-content: space-between;
}
.dev-button-group button{
    color: yellowgreen;
    background-color: rgb(3, 3, 3);
    border: 1px solid yellowgreen;
    border-radius: 5px;
}

.dev-button-group  button.dev-button-active{
    background-color: yellowgreen;
    color: rgb(3, 3, 3);
    border: 1px solid yellowgreen;
    border-radius: 5px;
}



:global(.dev-window p){
font-family: monospace;
font-size: 0.9rem;
}

.dev-close-icon {
    width: 1rem;
}

.icon-font-size {
    width: 1rem;
}

.interactive-transcript::-webkit-scrollbar {
  width: 14px;
}

.interactive-transcript::-webkit-scrollbar-track {
  box-shadow: inset 0 0 14px 14px transparent;
  border: solid 4px transparent;
}

.interactive-transcript::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 14px 14px var(--branding-secondary-blue);
  border: solid 4px transparent;
  border-radius: 14px;
}

.interactive-transcript::-webkit-scrollbar-button {
  display: none;
}

.interactive-transcript-container {
    border-radius: 10px;
    position: absolute;
    z-index: 99;
    /* left: 10px;
    top: 10px; */
    left: 50%;
    transform: translate(-50%, 20%);
    width: 80%;
    background-color: rgb(233 233 233);
    padding: 10px;
}


.interactive-transcript {
    
    border-radius: inherit;
    width: 100%;
    height: 500px;
    /* padding: 10px; */
    overflow-y: auto;
    overflow-x: clip;
    scroll-margin-bottom: 150px;
    position: relative;
}

.caption-item {
    background-color: rgb(255, 255, 255);
    
    /* border: 1px solid rgb(222, 222, 222); */
    margin: 15px;
    padding: 20px;
    border-radius: 10px;
    /* border: 2px solid transparent; */
    /* scroll-snap-align: start; */
    scroll-margin-top: 20px;
    
    
}

:global(.caption-item p){
    font-variation-settings: 'wght' var(--Medium);
    color: rgb(107, 107, 107);
}

.caption-item-active {
    background-color: rgb(255, 255, 255);
    outline: 1px solid rgb(205, 205, 205);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

:global(.caption-item-active span.caption-text-box p){
    color: rgb(52, 52, 52);
    /* font-variation-settings: 'wght' var(--Medium)  */
}

.caption-timecode {
    color: rgb(175, 175, 175);
    display: flex;
    gap: 0.3rem;
    font-variation-settings: 'wght' var(--Medium) 
}

.test-small-image {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 400px;
    border: 10px solid white;
    transform: rotate(3deg);
}
.wrapper {
    display: grid;
    grid-template-columns: 3fr 9fr;
}

.sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    padding-bottom: 40px;
}

.side-menu {
    background-color: rgb(221, 221, 221);
    height: 100%;
    /* TODO Change to auto when content added */
    overflow-y: scroll;
    position: relative;
    scrollbar-color: var(--branding-secondary-blue) rgb(221, 221, 221);
    /* scrollbar-width: thin; */
    border-right: 5px solid rgb(221, 221, 221);
    padding-bottom: 20px;
}

.sidebar-nav {
    background-color: rgb(0, 0, 0);
    /* border-top: 5px solid var(--branding-secondary-blue-tint); */
    width: 100%;
    position: absolute;
    display: flex;
    gap: 1rem;
    bottom: 0;
    padding: 10px;
}

.sidebar-nav button {
    margin: 5px;
    /* color: rgb(40, 40, 40);
    background-color: var(--branding-secondary-blue-tint); */
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    border: 2px solid white;
    border-radius: 15px;
    font-size: 1.1rem;
}

.menu-details-container {
/* padding: 10px; */
}


:global(.side-menu .menu-details-container p) {
    /* margin-bottom: 10px; */
    padding: 10px 15px;
    /* color: pink; */
}

:global(.side-menu .menu-details-container p:last-child) {
    /* margin-bottom: 10px; */
    padding-bottom: 0;
    /* color: pink; */
}
.main-content-window {
    position: relative;
    height: 100vh;
    /* background-color: aqua; */
}
img.background-image {
    filter: saturate(0%) sepia(0%) brightness(40%);
}

.menu-title-container {
    display: flex;
    gap: 1rem;
    /* width: 500px; */
}


/* img.wave-gif  {
    width: 50px;
    height: fit-content;
    display: block;
    aspect-ratio: 3 / 2 ;  
} */

button.controls-ui-btn {
margin: 0px;
padding: 0px;
font-size: 0px;
background-color: rgba(255, 192, 203, 0);
border: none;
z-index: 1;
}
:global(.rangeSlider){
    font-size: 1em;
}


.icon {
    width: 60px;
    color: rgba(255, 255, 255, 0.797);
    cursor: pointer;
    /* background-color: blue; */
}

.icon path {
    fill: rgb(108, 108, 108);
    stroke-width: 1px; 
   
}

.icon-small {
    width: 35px;
}

.icon-small-volume path{
    fill: rgb(175, 50, 50)
}

.icon-small path {
    stroke-width: 1px;
}

.icon-disabled {
    color: rgb(81, 81, 81);
    cursor: default;
}

.icon-disabled path {
    stroke-width: 0.5px;
    fill: rgb(94, 94, 94)
}

.icon-play-pause {
    width: 80px;
}

.icon-play-pause path{
    stroke-width: 0.9px;
    fill: rgb(175, 50, 50);
}


.custom-controlbar {
    background-color: rgba(5, 5, 5, 0.2);
    
    /* position: fixed; */
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -20%);
    position: absolute;
    width: 500px;
    /* left: 20%; */
    min-width: 300px;
    height: fit-content;
    /* padding: 5px; */
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(5px);
    gap: 0.2rem;
    border-radius: 10px;
    z-index: 3;
    border: 3px solid rgba(255, 255, 255, 0.686);
}

.custom-controlbar-controls {
    padding: 10px;
    z-index: 5;
}

canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    pointer-events: none;
}

.custom-controlbar p{
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px;
    margin: 0px;
    font-size: 1rem;
}

input#progress {
    width: 500px;
}

.progress-text {
    display: flex;
    justify-content: space-between;
}

.progress-range {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 2px solid rgb(97, 97, 97);
}

.range-slide-holder {
    position: relative;
}

.progress-range p {
    height: fit-content;
    padding: 2px;
    width: fit-content;
    border-color: rgb(99, 99, 99);

}

.play-nav {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
    gap: 1rem;
    height: 100%;
}

.image-container {
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    position: relative;
}

.image-container::after {
    content: '';
    position: absolute;
    background: radial-gradient(circle, rgba(71, 71, 71, 0.5) 10%, rgba(71, 71, 71, .8) 95%);
    width: 100%;
    height: 100%;
}

.caption-container {
    color: rgb(255, 255, 255);
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    z-index: 2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.caption-container .caption {
    max-width: 80%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
}

ul {
    /* display: flex;
    flex-direction: column; */
    position: relative;
    margin: 0px 10px;
    /* gap: 0.5rem; */
}

ul li {
    background-color: rgb(237, 237, 237);
    transition: background-color 0.4s;
    padding: 5px;
    /* margin: 5px; */
    margin-top: 10px;
   
    border-radius: 5px;
    border: 1px solid rgb(203, 203, 203);
}



li.active {
    color: white;
    background-color: var(--branding-secondary-blue);
    /* height: fit-content; */
}

li.active .accordion .menu-details-container{
    padding: 20px;
}

:global(.caption p){
    font-size: 1.6em;
    line-height: 2.1rem;
    font-variation-settings: 'wght' var(--Medium);
    letter-spacing: 0.15rem;
    padding: 8px;
}

.caption {
    color: var(--branding-secondary-blue-tint);
}

.interviewer{
    color: pink;
}



:global(p.test-overide)
 {
    color: yellow;
 }


.volume-control {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    z-index: 1;
    padding-bottom: 5px;
}
.volume-control p {
    width: fit-content;
    height: fit-content;
    padding: 5px;
    margin: 0px;
    border-color: rgb(86, 86, 86);
    background-color: rgba(255, 255, 255, 0.216);
}

.dev-only {
    background-color: rgb(47, 47, 47);
    color: white;
    border: rgb(49, 49, 49) 1px solid;
}

:global(p.speaker_0) {
    color: rgb(237, 237, 240);
}

:global(p.speaker_1) {
    color: rgb(231, 211, 159);
}

:global(p.speaker_2) {
    color: green;
}


</style>