<script>
    // export let items

    let {items, currentItem, inflate} = $props()

   

   

    console.log(items)
    import { onMount, createEventDispatcher } from 'svelte'
    // export let currentItem
    
    let _refs = $state([])
    
    let thumbContainer = $state()
    let flickityCarousel = $state()
    let firstthumb = $state()
    let lastthumb = $state()
    let lastthumbnumber = $state()
    
    
    let flkty = $state()

    function setSelectedCell(index){
      flkty?.selectCell(index)
    }

    // set flickity selected cell when the current item index changes
    $effect(() => {
      setSelectedCell(currentItem)
    })

    
    
    async function flickityInit(){
      let elem = flickityCarousel
      const Flickity = (await import('flickity')).default
        
      flkty = new Flickity(elem, {
        imagesLoaded: true,
        cellAlign: "center",
        pageDots: false,
        contain: true,
        resize: true,
        initialIndex: 0,
        percentPosition: false,
        freeScroll: true,
        prevNextButtons: false,
      });
    }
    
    onMount(() => {
    
      firstthumb = _refs[0]
      lastthumb = _refs[_refs.length - 1]
      lastthumbnumber = _refs.length - 1
    
      let options = {
      root: thumbContainer,
      rootMargin: "0px",
      threshold: 1.0,
      };
    
      flickityInit()
      
    return () => {
      flkty.destroy()
    }
      
    }) 
       
    const dispatch = createEventDispatcher()

    
    
    function sendChangeEvent(event) {
        console.log('event fires')
        console.log('HERE',parseInt(event.target.getAttribute('data-index')))
        event.preventDefault()
        inflate(parseInt(event.target.getAttribute('data-index')))
    }
    
    function golast(){
      flkty.selectCell(_refs.length - 1)
    }
    
    function gofirst(){
      flkty.selectCell(0)
    }
    </script>


    
    <div bind:this={thumbContainer} id="thumbtest" class="thumbnail-holder" >
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button onclick={gofirst} class="thumb-button gofirst">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 thumb-button-nav">
          <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        
      </button>
      
        <div bind:this={flickityCarousel} class="carousel">
          {#each items as item, i}  
            <div class="thumb-container">
              <div class="imageicon"></div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <!-- svelte-ignore event_directive_deprecated -->
            <img bind:this={_refs[i]} class:active-thumbnail={i === currentItem} class="carousel-image" onclick={sendChangeEvent} data-index={item.dataIndex} src="http://127.0.0.1:8090/api/files/{item.thumbnail}" alt="" />
            </div>
          {/each}
        </div>
    
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button onclick={golast} class="thumb-button golast">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="thumb-button-nav w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          
        </button>
      <!-- <div class="fade"></div> -->
    </div>
    
    <style>
    
    @import '../../../node_modules/flickity/css/flickity.css';

    #thumbtest {
      height: fit-content;
      /* margin-bottom: 10px; */
      background-color: rgb(34, 34, 34);
      /* padding-left: 10px; */
    }

    .thumb-container {
      
    }
    
    .thumb-button-nav {
      width: 30px;
      color: pink;
    }
    
    .imageicon {
      height: 20px;
      width: 20px;
      background-color: var(--id-light-pink);
      position: absolute;
      z-index: 99;
      bottom: 1px;
      right: 10px;
      margin: 3px;
      display: none;
    }
    
    .thumb-button {
      border: none;
      display: none;
      background-color: rgba(15, 35, 58, 0.585);
      padding-left: 5px;
      padding-right: 5px;
    }
    
    .golast {
      margin-left: 10px;
    }
    .gofirst {
      /* margin-right: 10px; */
    }
    /* .golast {
      position: absolute;
      z-index: 99;
      right: 20px;
      top: 30px;
      height: 50px;
      width: 50px;
    }
    
    .gofirst {
      position: absolute;
      z-index: 99;
      left: 20px;
      top: 30px;
      height: 50px;
      width: 50px;
    } */
    .fade {
      height: 100%;
      width: 40px;
      background: rgb(0,0,0);
      background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 45%);
      position: absolute;
      right: 0;
      top: 0;
      pointer-events: none;
    }
    .carousel {
      width: 100%;
      padding-top: 10px;
      margin-bottom: 10px;
      margin-left: 10px;
    }
    .thumbnail-holder {
      /* padding-left: 30px;
      padding-right: 30px; */
      /* background-color: blue; */
      border-top: 1px solid #616161;
      height: 100%;
      width: 100%;
      position: relative;
      display: flex;
    }
    
    /* .thumbnail-holder {
      padding-left: 30px;
      padding-right: 30px;
      background-color: rgba(15, 35, 58, 0.585);
      border-top: 1px solid #848484;
      height: 140px;
    
      width: 100%;
      position: relative;
    
    } */
    
    .carousel-image {
      box-sizing: border-box;
      display: block;
      height: 100px;
      max-height: 100px;
      margin-right: 10px;
      border: 4px solid rgba(0, 0, 0, 0);
      filter: grayscale(0.9) brightness(0.8) sepia(0.7);
     
    }
    
    /* img.flickity-cell.is-selected {
        border: 2px solid pink;
    } */
    
    :global(.carousel-image.active-thumbnail){
      border: 2px solid pink;
      filter: grayscale(0) brightness(1.1) saturate(1.1);
      border-radius: 3px;
    }
    
    :global(.flickity-slider :last-child){
    
    }
    :global(.flickity-slider :first-child){
    margin-left: 10px;
    }
    
    :global(.flickity-slider ){
    
    }
     
    
    :global(.flickity-button) {
      z-index: 99;
      background-color: var(--id-light-pink-light);
      border: 2px solid rgb(255, 255, 255);
      
    }
    
    :global(.flickity-button:hover) {
      background-color: var(--id-light-pink);
      border: 2px solid rgb(255, 255, 255);
    }
    
    :global(.flickity-button:focus) {
      outline: none;
      box-shadow: 0 0 0 1px rgb(202, 202, 202);
    }
    
    :global(.flickity-page-dots) {
      bottom: -14px;
     
    }
    /* dots are lines */
    :global(button.flickity-page-dot) {
      height: 4px;
      width: 40px;
      margin: 0;
      border-radius: 0;
      background: rgb(79, 79, 79);
      pointer-events: none;
    }
    
    :global(.flickity-page-dot.is-selected) {
      background: white;
    }
    
    </style>