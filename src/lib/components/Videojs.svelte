<script>
import { onMount, onDestroy } from 'svelte';
import videojs from 'video.js';

import 'video.js/dist/video-js.css';
import {media, captions} from '$lib/stateStores/mediaPlayerState.svelte.js';
let {videoOptions} = $props()

let videoElement; // Reference to the video element
let player; // Store the video.js player instance
let cueChange 


function addMetadataTrackFromJSON(player, captionCueData, tag) {
  const track = player.addTextTrack("metadata", tag, "en");
  track.mode = "hidden"; 
  captionCueData.forEach((cueData) => {
    const cue = new VTTCue(cueData.start, cueData.end, cueData.text);
    cue.id = cueData.id
    track.addCue(cue);
  });
  
  // metadataCueChangeHandler(track)
}

function addImageMetadataTrackFromJSON(player, captionCueData, tag) {
  const track = player.addTextTrack("metadata", tag, "en");
  track.mode = "hidden"; 
  captionCueData.forEach((cueData) => {
    const cue = new VTTCue(cueData.start, cueData.end, cueData.text);
    cue.id = cueData.id
    track.addCue(cue);
  });
  
  // metadataImageChangeHandler(track)
}

function testJSON(text) {
    if (typeof text !== "string") {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

// function metadataCueChangeHandler(track){
  
//   if(track.label === 'captions'){
//     track.addEventListener('cuechange', () => { 
//       const activeCues = track.activeCues;
//       if (activeCues.length > 0) {
//         let activeCue = track.activeCues[0]
    
//         let data = testJSON(activeCue.text) ? JSON.parse(activeCue.text) : {}
        
        
//           if(data?.data?.caption){
//             captions.activeCueText = data?.data?.caption
//           } else {
//             captions.activeCueText = ''
//           }
        
        
//         captions.activeCueID = activeCue.id
//       } else {
//         captions.activeCueText = ''
//         console.log("No active cue");
//       }
//     });

//   }
       
    
// }

// function metadataImageChangeHandler(track){
//   console.log('77',track.label)
//   if(track.label === 'images'){
//     track.addEventListener('cuechange', () => {
    
//     const activeCues = track.activeCues;
//     if (activeCues.length > 0) {
//       let activeCue = track.activeCues[0]
  
//       let data = testJSON(activeCue.text) ? JSON.parse(activeCue.text) : {}
      
//       if(data.event === 'image_transition'){
//         console.log('IMAGE CUE', data)
//         if(data?.data?.image_reference){
//         } else {
//           console.log('no image cue set')
//         }
//       }
      
//       captions.activeCueID = activeCue.id
//     } else {
//       captions.activeCueText = ''
//       console.log("No active cue");
//     }
    
//   });
//   }
     
  
// }

function removeOldCues(track){
  var cues = track.cues;
      if (cues) {
        for (var j = cues.length - 1; j >= 0; j--) {
          track.removeCue(cues[j]);
        }
      }
}

function addNewCues(track, cueJsonArray){
  cueJsonArray.forEach((cueData) => {
      const cue = new VTTCue(cueData.start, cueData.end, cueData.text);
      cue.id = cueData.id
      track.addCue(cue);
      refreshChapterMenu()
      
      });
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60); 
  const remainingSeconds = Math.floor(seconds % 60); 
  const paddedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  return `${minutes}:${paddedSeconds}`;
}

function refreshChapterMenu() {
  // Access the player control bar's chapters button component
  var chaptersButton = player.controlBar.getChild('ChaptersButton');
  // Check if the ChaptersButton exists (it will only exist if there are chapter tracks)
  if (chaptersButton) {
    // Force the chapters menu to re-render
    chaptersButton.update();
  }
  
}

function changeTextTrack(caps, images) {
// console.log('149',player.textTracks())
//   console.log('changing', caps, images)
  let newTracks = [caps, images ?? []]
  if(caps.length > 0){
    var textTracks = player.textTracks();
    
    for (var i = 0; i < textTracks.length; i++) {
      var track = textTracks[i];
      // console.log('134',track.label, track.cues_.length)
      removeOldCues(track)
      if(newTracks[i].length > 0){
        addNewCues(track, newTracks[i])
      }
      
    }
  }
}



$effect(() => {

  player = videojs(media.vjs, videoOptions);
  player.audioOnlyMode('true')
  

  player.on('loadedmetadata', () => {
      media.duration = player.duration()
  });

  player.on('loadeddata', () => {
      // console.log('READY')
      player.volume(!media.volume ? 0.5 : media.volume / 100)
      media.volume = player.volume() * 100
      media.loadeddata = true
  });
  
  player.on('emptied', function() {
    media.loadeddata = false
  });
  
  player.on('timeupdate', () => {
    media.currentTimeMs = player.currentTime()  
  });

  player.on('pause', () => {
    // console.log('pause active')
    media.playing = false
  })


  player.on('play', () => {
    // console.log('play active')
    !media.playing ? media.playing = true : console.log('already playing')
    media.playedBefore = true
  })

  player.on('ended', () => {
    media.ended = true
  })

  player.ready(() => { 
  //  console.log(captions.captionData)
   
      addMetadataTrackFromJSON(player, captions.captionData, 'captions')
      addImageMetadataTrackFromJSON(player, captions.imagesData, 'images')

      const textTracks = player.textTracks();

  // Loop through the text tracks
  for (let i = 0; i < textTracks.length; i++) {
    const track = textTracks[i];

    if (track.kind === 'metadata') {
      if (track.label === 'captions') {
     
        track.addEventListener('cuechange', () => {

        const activeCues = track.activeCues;

        

        if (activeCues.length > 0) {
          let activeCue = track.activeCues[0]
          console.log('229',parseInt(activeCue.id) + 1)
      
          let data = testJSON(activeCue.text) ? JSON.parse(activeCue.text) : {}
          console.log(data)
        
            if(data?.data?.caption){
              captions.activeCueText = data?.data?.caption
            } else {
              captions.activeCueText = ''
            }

            if(data?.data?.id){
              captions.activeCueID = data?.data?.id
            } else {
              captions.activeCueID = ''
            }

            if(data?.data?.speaker){
              captions.activeCueSpeaker = data?.data?.speaker
            } else {
              captions.activeCueSpeaker = ''
            }

            

            // if(data?.data?.id){
            //   captions.activeCueID = data?.data?.activeCue.id
            // } else {
            //   captions.activeCueID = ''
            // }
        
          // captions.activeCueID = parseInt(activeCue.id) + 1
        } else {
          captions.activeCueID = ''
          captions.activeCueText = ''
          console.log("No active CAPTION cue");
        }
        });
      } 
      
      else if (track.label === 'images') {
        track.addEventListener('cuechange', () => {
          const activeCues = track.activeCues;
          if (activeCues && activeCues.length > 0) {
            let activeCue = activeCues[0]
            // console.log('images', activeCue)
            let data = testJSON(activeCue.text) ? JSON.parse(activeCue.text) : {}

            console.log(data)
            if(data?.data?.imageFileName){
              captions.activeImage = data?.data
            } else {
              captions.activeImage = {}
            }
            // captions.activeImage = 
          } else {
            captions.activeImage = {}
            console.log("No active IMAGE cue");
          }
        });
      }
    }
  }
      
      
  });
  return () => {
    console.log('I have unmounted')
    if (player) {
      player.dispose();
    }
  };
});


$effect(() => {
  function changeSrc(src, type){
    player.src({
          src: src,
          type:type
          }) 
  }

  // captions.activeCueID = 1
  // captions.activeCueText = ''
  changeSrc(media.src, media.type)

  
  
  // if(media.playing === false){
  //   media.playing = true
  // }
})

$effect(() => {
  player.currentTime(media.seek)
  // if(media.interaction){
  //   player.play()
  // }
})

$effect(() => {
  // captions.captionData,
  
  changeTextTrack(captions.captionData, captions.imagesData)
  // changeTextTrack(captions.imageData)
})




// $effect(() => {
//   captions.imagesData,
//   changeTextTrack(captions.imagesData)
  
// })

$effect(() => {
  // Initialize volume if not set
  // if(media.volume === undefined){ 
  //   player.volume(0.5)
  //   media.volume = player.volume() * 100
  // }
  // Set initial volume when player loads in the .on(loadeddata event)
  player.volume(media.volume / 100)
  // console.log(player.volume(), media.volume)
})

$effect(() => {
  if(media.playing){
    // if(!player.play()){
    //   player.play()
    // }
    
    player.play()
    
  } else {
    player.pause()
  }
  // console.log({statePlaying: media.playing, playerPaused: player.paused()})
})

// $effect(() => {
//   media.seekingValue,
//   player.pause()
//   player.currentTime(media.seekingValue)
//   player.play()
// })

</script>

<div class="video-container">
  <audio bind:this={media.vjs} class="video-js vjs-default-skin" crossorigin="anonymous" ></audio>
</div>

<style>
  .video-container {
    max-width: 800px;
    /* hide the player */
    /* outline: 1px red dotted; */
    height: 0px;
    width: 0px;
  }

  .video-js {
    /* background-color: rgba(255, 255, 255, 0); */
    /* hide the player */
    height: 0px;
  }
</style>