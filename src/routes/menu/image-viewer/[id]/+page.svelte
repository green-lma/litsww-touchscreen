<script>
    import { goto } from '$app/navigation';
    let {data} = $props()

    // Set the initial image to the first item in the 'items' array
    // let currentItem = $state(parseInt(data.returned.items[0].id));
    let currentItem = $state(parseInt(data.returned.items[0].dataIndex));
     

    let zoomIn = $state()
    let zoomOut = $state()
    let zoomHome = $state()
    let rotate = $state()
    let navigatorDiv = $state()

    import Thumbnails from '$lib/components/Thumbnails.svelte'
    import Seadragon from '$lib/components/Seadragon.svelte'
    import { fade, blur, fly, slide } from 'svelte/transition';

    function setCurrentItem(newItem){
       
        if (currentItem != parseInt(newItem)){
            currentItem = newItem
        }  
    }

    function setURL(thisitem, arr){
        // const result = arr.find(item => parseInt(item.id) === parseInt(thisitem));
        const result = arr[thisitem]
        return result?.image
    }

    let currentURL = $derived(setURL(currentItem, data.returned.items))

    function nextItem(){
        const currentItemIndex = data.returned.items.findIndex(item => parseInt(item.id) === parseInt(currentItem));
        if(currentItem < data.returned.items.length - 1){
            // let nextId = parseInt(data.returned.items[currentItemIndex + 1].id)
            // setCurrentItem(nextId)
            setCurrentItem(currentItem + 1)
        }
    }

    function prevItem(){
        const currentItemIndex = data.returned.items.findIndex(item => parseInt(item.id) === parseInt(currentItem));
        if(currentItem > 0){
            // let prevId = parseInt(data.returned.items[currentItemIndex - 1].id)
            // setCurrentItem(prevId) 
            setCurrentItem(currentItem - 1)
        }
    }


</script>


<!-- <p>Current Item {currentItem} URL {currentURL}</p> -->
<!-- <p>item {data.id}</p>
<p>Current Item {currentItem} URL {currentURL}</p> -->
<!-- <div bind:this={viewer} id="viewer" class="viewer-window" in:blur={{duration: 400, amount: '8px'}}> -->
<div class="page-wrapper">

    <div class="side-panel">
        <p>This is the side panel</p>
        <nav class="sidebar-nav">
            <button onclick={() => {goto('/menu')}}>Main menu</button>
            <button onclick={() => {goto('/')}}>Close and exit</button>
        </nav>
    </div>

    <div class="viewer-wrapper">
       
        <div class="view-area">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="prev-next-buttons" id="prev-button" onclick={prevItem}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="nav-icon size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              </button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="prev-next-buttons" id="next-button" onclick={nextItem}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="nav-icon size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              </button>
            <div class="osd-controls-buttons">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <span class="nav-span" bind:this={zoomIn} id="zoom-in">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon osd-button w-6 h-6">
                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Zm8.25-3.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-1.5 0v-2.25H7.5a.75.75 0 0 1 0-1.5h2.25V7.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                    </svg>  -->
                    <!-- <svg class="icon osd-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Zm-40-60v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/></svg>  -->
                    <svg class="icon osd-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </span>
                <span class="nav-span" bind:this={zoomOut}  id="zoom-out">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon osd-button">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6" />
                  </svg> -->
                  <!-- <svg class="icon osd-button" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400ZM280-540v-80h200v80H280Z"/></svg> -->

                  <svg class="icon osd-button" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"><path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                  </span>
               
                <span class="nav-span" bind:this={rotate} id="rotate">  
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon osd-button">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                      </svg> -->
                      <svg class="icon osd-button" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"><path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z"/></svg>
                </span>
                <span class="nav-span" bind:this={zoomHome} id="reset">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon osd-button">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                      </svg> -->
                      <svg class="icon osd-button" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"><path d="m156-100-56-56 124-124H120v-80h240v240h-80v-104L156-100Zm648 0L680-224v104h-80v-240h240v80H736l124 124-56 56ZM120-600v-80h104L100-804l56-56 124 124v-104h80v240H120Zm480 0v-240h80v104l124-124 56 56-124 124h104v80H600ZM480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Z"/></svg>
                </span>
        
            </div>
            {#key currentItem}
            <div class="viewer-window" transition:fade={{ delay: 50, duration: 400}}>
                <Seadragon {navigatorDiv} {zoomHome} {zoomIn} {zoomOut} {rotate} imageURL={currentURL} viewerId={currentItem}/>
            </div>
            {/key}
        </div>
            
    
    
    
        <Thumbnails items={data.returned.items} currentItem={currentItem} inflate={setCurrentItem}/>
    </div>

</div>



<style>

    svg.osd-button {
        fill: rgb(255, 255, 255);
        background-color: var(--branding-secondary-blue);
        border-radius: 50%;
        /* padding: 2px; */
        border: 2px solid rgb(52, 82, 157);
        width: 3rem;
    }
span.nav-span {
    /* background-color: rgba(237, 237, 237, 0.414);
    height: fit-content;
    border-radius: 5px;
    line-height: 0px;
    border: 2px solid rgb(255, 255, 255); */

    /* padding: 5px; */
}

span.nav-span svg {
    padding: 0.3rem;
}
   

    #prev-button {
        position: absolute;
        top: 50%;
        left: 10px;
        z-index: 4;
    }

    #next-button {
        position: absolute;
        top: 50%;
        right: 10px;
        z-index: 4;
    }

    .page-wrapper {
        display: grid;
        grid-template-columns: 1fr 4fr;
        height: 100vh;
    }

    .viewer-wrapper {
        /* max-width: 920px; */
        /* position: relative;
        display: flex;
        flex-direction: column;
        height: 100vh;
        justify-content: space-between; */
        display: grid;
        grid-template-rows: minmax(auto, 1fr) 120px;
        
    }

    .viewer-window {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100%;
    /* flex: 1; */
    
    width: 100%;
    /* background-color: black; */
}

.view-area {
    position: relative;
    /* display: flex;
    flex: 1; */
    height: 100%;
    flex: 1;
    width: 100%;
    background-color: black;
}
/* from LVC */

.info-bar-container {
    display: flex;
    height: 50px;
    width: 100%;
    
    align-items: center;
    font-family: "book-antiqua-bold";
    color: var(--id-light-pink-lighter);
    padding: 5px 10px;
    border-bottom: 1px solid var(--id-light-pink);
}
.info-bar {
    display: flex;
    gap: 0.3em;
    border: 1px solid var(--id-light-pink);
    background-color: #e1afdf2a;
    border-radius: 5px;
    padding: 5px 10px ;
    
}
.info-bar p {
    margin-bottom: 0px;
}
.info-icon {
    height: 1.1em;

}
.item-count {
    font-family: "book-antiqua-bold";
    color: var(--id-light-pink-lighter);
    /* font-size: var(--paragraph-font-weight); */
}
    
.font-size-picker-container {
    display: flex;
    align-items: baseline;
    gap: 0.5em;
    color: var(--id-light-pink);
    margin-bottom: 10px;
}

.font-size-picker-container p{
    font-size: var(--paragraph-font-weight);
}



.font-size-picker {
    color: var(--id-light-pink);
    display: block;
}

.font-size-picker .font-size-picker-small {
    font-size: 0.5em;
}

.current-item-message {
  display: none;
    background-color: rgba(0, 0, 0, 0.381);
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: -10px;
    margin-top: 10px;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    padding: 5px;
    font-size: 0.8em;
    color: var(--id-light-pink-lighter);

}

.nav-button.active {
    background-color: var(--id-light-pink);
    color: black;
}

.grab-handle {
    display: flex;
    position: absolute;
    padding: 10px 10px 5px 10px;
    top: 0;
    left: 0;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid var(--id-light-pink);
}

/* .side-panel {
  background-color: var(--dark-gray-1);
  grid-area: side;
  padding: 30px 15px 30px 30px;
  border-right: 1px solid rgba(255, 255, 255, 0.135);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.side-panel-text {
    display: grid;
    gap: 1em
}

.side-panel-title {
    color: var(--id-light-pink-lighter);
    font-size: 2.5em;
}
.side-panel-description {
    color: var(--id-light-pink-lighter);
    font-size: var(--paragraph-font-weight);
    font-family: "book-antiqua-regular";
    max-height: 770px;
    overflow: auto;
    padding-right: 15px;
}
.side-panel .media-link p {
        color: var(--id-light-pink-lighter);
        font-size: var(--paragraph-font-weight);
        font-family: "book-antiqua-bold";
        cursor: pointer;
}


.side-panel-description::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #d4d4d472;
    
  }

.side-panel-description::-webkit-scrollbar-thumb {
  background: var(--id-light-pink-lighter);
}


:global(.side-panel-description h3 ) {
  font-size: 1.4em;
  font-family: "book-antiqua-black";
}

:global(.side-panel-description h3,p ) {
  margin-bottom: 15px;
}
:global(.side-panel-description img ) {
  display: none;
  max-width: 60%;
  margin-left: 20%;
  margin-bottom: 15px;
}

:global(.side-panel-description strong ) {
  font-family: "book-antiqua-black";
}

:global(.side-panel-description video ) {
  width: 100%;
  border-radius: 10px;
  border: 3px solid var(--id-light-pink);
} */




.side-nav {
    display: flex;
    gap: 10px;
    /* padding: 10px; */
    padding-top: 20px;
    border-top: 1px solid rgb(89, 89, 89);
}
.navigator-wrapper {
    width: 100%;
}

.navigatorContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.261);
    border: 1px solid grey;
    margin: 0px 5px;
    border-radius: 5px;
}

.navigatorDiv {
    height: 100px;
    width: 100px;
}

.icon {
    width: 42px;
    padding: 2px;

    /* margin: 10px 4px 10px 4px; */
    /* border: 2px solid var(--id-light-pink);
    color: var(--id-light-pink-lighter); */
    /* background-color: #e1afdf2a; */
    /* border-radius: 10px; */
    
}

.icon.disabled {
    color: grey;
    border: 2px solid grey;
}

.wrapper {
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 1fr 126px;
  grid-template-areas:
    "side section"
    "side thumbs";
  height: 100%;
}

.osd-text {
    padding: 10px 5px;
    /* margin-top: 10px; */
    /* border-top: 1px solid var(--id-light-pink-lighter); */
   
}

.osd-title-text {
    margin-bottom: 10px;
    font-size: var(--paragraph-font-weight);
    font-family: "book-antiqua-bold";

}

.osd-description-text {
    font-family: "book-antiqua-regular";
    font-size: var(--paragraph-font-weight);

}

.osd-reference-text {
    font-family: "book-antiqua-regular";
    font-size: var(--paragraph-font-weight);
    overflow-wrap: break-word;
}

.section-window {
  grid-area: section;
  height: 100%;
  position: relative;
}



.thumbs {
  grid-area: thumbs;
}

.nav-button {
    font-size: 1.3em;
    border: 1px solid var(--id-light-pink);
    background-color: #e1afdf2a;
    padding: 8px;
    border-radius: 5px;
}

.nav-button a {
    color: var(--id-light-pink);
}



.tha-dragon {
    position: relative;
}

.nav-btn {
    max-width: 50px;
    max-height: 50px;
}

:global(.displayregion ) {
    border: 2px solid red !important;
}

.osd-controls {
    display: flex;
    flex-direction: column;
    width: 200px;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 99;
    padding-top: 40px;
    background-color: rgba(67, 68, 69, 0.798);
    border-radius: 10px;
    border: 1px solid var(--id-light-pink);
    font-size: 1.1em;
    color: white;
}

.osd-controls::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    backdrop-filter: blur(3px);
    z-index: -1;
    
}

.osd-controls-buttons {
    display: flex;
    gap: 0.4em;
    /* justify-content: space-around; */
    /* background-color: rgba(255, 255, 255, 0.348); */
    /* backdrop-filter: blur(2px); */
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    left: 50px;
    top: 50px;
    width: fit-content;
    z-index: 3;
}

.details {
    max-height: 550px;
    padding: 5px;
    margin: 10px 5px 10px 5px;
    overflow-y: auto;
    overflow-x: hidden;
}

.details::-webkit-scrollbar {
    width: 7px;
    height: 8px;
    background-color: rgb(0, 0, 0);
   
  }
  .details::-webkit-scrollbar-thumb {
  background: var(--id-light-pink-lighter);
}

svg .icon-small {
    height: 20px;
}

.nav-icon {
        color: white;
        width: 60px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        padding: 5px;
        backdrop-filter: brightness(110%) blur(0.5px);
    
    }

    
    .prev-next-buttons {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        opacity: 100%;
        background-color: rgba(0, 0, 0, 0) !important;
        border: none;
    }

    svg.nav-icon{
     filter: drop-shadow(1px 1px 1px rgb(0 0 0 / 0.5));
    }
</style>