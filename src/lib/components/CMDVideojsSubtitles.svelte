<script>
import { onMount, onDestroy } from 'svelte';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

let {videoOptions, subtitleData} = $props()

let currentClipIndex = $state(0);
let played = $state(false);

const clips = [
  { start: 20, end: 22 },
  { start: 70, end: 72 },
  
];

// let clips


function cueChangeHandler(track){
    track.addEventListener('cuechange', () => {
      const activeCues = track.activeCues;
      if (activeCues.length > 0) {
        console.log("Current Cue:", activeCues[0].text);
      } else {
        console.log("No active cue");
      }
    });
}

function addTextTrackFromJSON(player, subtitleData) {
  // Create a new text track in the video.js player instance
  const track = player.addTextTrack("subtitles", "English", "en");
  track.mode = "showing";  // Set track to show subtitles by default
  // Add cues to the track
  subtitleData.forEach((cueData) => {
    const cue = new VTTCue(cueData.start, cueData.end, cueData.text);
    track.addCue(cue);
  });
  cueChangeHandler(track)
} 

let videoElement; // Reference to the video element
let player; // Store the video.js player instance

onMount(() => {
  const modalContent = document.createElement('div');
    modalContent.className = 'vjs-modal-dialog-content';

    // Create the unpause button
    const unpauseButton = document.createElement('button');
    unpauseButton.className = 'vjs-unpause-button';
    unpauseButton.textContent = 'Resume Video';

    // Append the button to the modal content
    modalContent.appendChild(unpauseButton);
  // Initialize Video.js when the component is mounted
  player = videojs(videoElement, videoOptions);
  var ModalDialog = videojs.getComponent('ModalDialog');

var modal = new ModalDialog(player, {
  temporary: false,
  content: modalContent,
  uncloseable: true
});
modal.addClass('vjs-my-fancy-modal');
player.addChild(modal);

  player.ready(() => {
    addTextTrackFromJSON(player, subtitleData);
  });



unpauseButton.addEventListener('click', () => {
  played = false   
      modal.close();
      playClip()
});

function playClip() {
  const clip = clips[currentClipIndex];
  player.currentTime(clip.start);  // Jump to the start of the current clip
  player.play();
}
  player.on('timeupdate', () => {
      
      
      // Check if the player has reached the end of the current clip
      if(!played && clips){
        const clip = clips[currentClipIndex];
        if (player.currentTime() >= clip.end) {
        player.pause(); // Pause at the end of the clip
        currentClipIndex += 1; // Move to the next clip
        
        // Check if there are more clips to play
        if (currentClipIndex < clips.length) {
          playClip(); // Play the next clip
        } else {
          console.log("All clips have been played.");
          
          player.pause()
          
          played = true
          currentClipIndex = 0
          modal.open();
        }
      }
      }
      
    });
  
    player.ready(() => {
      if(clips){
        playClip(); 
      }
      
    });
  // Clean up Video.js when the component is unmounted
  return () => {
    console.log('I have unmounted', cueChangeHandler)
    if (player) {
      player.dispose();
    }
  };
});
</script>
  
<div class="video-container">
  <video bind:this={videoElement} class="video-js vjs-default-skin" playsinline></video>
</div>

<style>
  /* Add optional custom styles here */
  .video-container {
    max-width: 800px;
  }




</style>