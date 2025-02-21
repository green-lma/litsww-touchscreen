<!-- <svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/openseadragon@4.1/build/openseadragon/openseadragon.min.js"
  ></script>
</svelte:head> -->

<script>

    
    // export let viewerId;
    // export let imageURL;
    // export let zoomOut
    // export let zoomIn
    // export let zoomHome
    // export let rotate
    // export let navigatorDiv

    let {viewerId, imageURL, zoomOut, zoomIn, zoomHome, rotate, rotation, navigatorDiv} = $props()
    // console.log(navigatorDiv)
   
  
    import { onMount} from 'svelte';
    // import { env } from '$env/dynamic/public'

    // console.log(env.PUBLIC_IMAGE_SERVER)

    let osd = $state()

    
    
    // onMount(async() => {   
    //     let OpenSeadragon = (await import('Openseadragon')).default     
    //      osd = OpenSeadragon({
    //         id: `openseadragon${viewerId}`,
    //         prefixUrl: "/libs/openseadragon/images/",
    //         tileSources: [
    //            `http://localhost:8080/iiif/${imageURL}.tif/info.json`
    //         ],
    //         zoomInButton:  zoomIn,
    //         zoomOutButton:  zoomOut,
    //         homeButton: zoomHome,
    //         showRotationControl: true,
    //         rotateRightButton: rotate,
    //         visibilityRatio: 0.6,
    //         constrainDuringPan: true,
    //         showNavigator:  true,
    //         navigatorElement: navigatorDiv,
    //         // navigatorPosition:   "BOTTOM_RIGHT",
    //         // navigatorAutoFade:  false,
    //         navigatorPosition: "ABSOLUTE",
    //         navigatorTop:      "820px",
    //         navigatorLeft:     "1390px",
    //         navigatorHeight:   "120px",
    //         navigatorWidth:    "120px",
    //         // minZoomLevel: 0.3
    //         // debugMode:  true,
    //     })
    //    osd.addHandler("open", function(){
    //       let zoom = osd.viewport.getZoom() 
    //       osd.viewport.zoomTo(zoom - (zoom / 100) * 5)
    //    })
    // })

    function resetViewport() {
        if (osd.viewport) {
            osd.viewport.goHome(); 
            // osd.viewport.fitVertically();
        }
    }

     onMount(() => {

        async function OSDInit(){
            let OpenSeadragon = (await import('openseadragon')).default  
            osd = OpenSeadragon({
            id: `openseadragon${viewerId}`,
            prefixUrl: "/libs/openseadragon/images/",
            tileSources: [
               `http://localhost:8080/iiif/${imageURL}/info.json`,
            ],
            zoomInButton:  zoomIn,
            zoomOutButton:  zoomOut,
            homeButton: zoomHome,
            showRotationControl: true,
            degrees: rotation,
            rotateRightButton: rotate,
            // visibilityRatio: 0.6,
            crossOriginPolicy: 'Anonymous',
            constrainDuringPan: true,
            showNavigator:  true,
            // autoResize: true,
            // preserveImageSizeOnResize: true,
            // navigatorElement: navigatorDiv,
            // navigatorPosition:   "BOTTOM_RIGHT",
            // navigatorAutoFade:  false,
            // navigatorPosition: "ABSOLUTE",
            // navigatorTop:      "820px",
            // navigatorLeft:     "1390px",
            // navigatorHeight:   "120px",
            // navigatorWidth:    "120px",
            // minZoomLevel: 0.3
            // debugMode:  true,
        })
       osd.addHandler("open", function(){
        //   let zoom = osd.viewport.getZoom() 
        //   osd.viewport.zoomTo(zoom - (zoom / 100) * 5)
        
        // osd.viewport.fitVertically();
       })

       osd.addHandler("after-resize", function(){
           
        //    let def = osd.viewport.getHomeZoom()
        //    console.log('resize fineished', def)
        //    osd.viewport.zoomTo(def)
        // osd.viewport.goHome(false)
        //    resetViewport()
        });
   
        }  
        
           
        OSDInit()

       return () => {
        console.log('destroyed', osd.id)
        osd.destroy()
       }
    })    
    
</script>

<div class="viewer" bind:this={osd} id="openseadragon{viewerId}">

</div>



<style>

   
.navigator {
        height: 100px;
        width: 100px;
        /* background-color: green; */
    }
  
    .viewer {
        height: 100%;
        width: 100%;
        /* position: absolute; */
        /* background-color: pink; */
        /* background-color: rgba(255, 192, 203, 0.208); */
    }
#testnav {
    border: 2px solid pink;
    position: absolute;
    top: 0;
    left: 30px;
    height: 150px;
    width: 150px;

}

#navigator {
    /* background-color: brown; */
}

:global(.navigator ) {
    /* background-color: rgba(17, 15, 74, 0.562) !important; */
    /* max-width: 100px; */
    /* max-height: 100px;
    max-width: 200px; */
    
}

</style>
