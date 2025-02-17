<script>
import { onMount, onDestroy } from 'svelte';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

let {videoOptions} = $props()

let currentClipIndex = $state(0);
let played = $state(false);
let playListActive = $state(false)

const clips = [
  { start: 20, end: 22 },
  { start: 70, end: 72 },
];

function playClip() {
    playListActive = true
    const clip = clips[currentClipIndex];
    player.currentTime(clip.start);  // Jump to the start of the current clip
    player.play();
}

// let clips

let videoElement; // Reference to the video element
let player; // Store the video.js player instance

onMount(() => {

  

  // TODO - refactor this into a create modal function
  const modalContent = document.createElement('div');
  modalContent.className = 'vjs-modal-dialog-content';

    // Create the unpause button
  const playClipAgainButton = document.createElement('button');
  playClipAgainButton.className = 'vjs-unpause-button';
  playClipAgainButton.textContent = 'Play clip again';

  const resumeButton = document.createElement('button');
  resumeButton.className = 'vjs-unpause-button';
  resumeButton.textContent = 'Resume playback';

  // Append the button to the modal content
  modalContent.appendChild(playClipAgainButton);
  modalContent.appendChild(resumeButton);

  // Initialize Video.js when the component is mounted
  player = videojs(videoElement, videoOptions);
  var ModalDialog = videojs.getComponent('ModalDialog');

  var modal = new ModalDialog(player, {
    temporary: true,
    content: modalContent,
    uncloseable: true
  });

  modal.addClass('vjs-my-fancy-modal');

  player.addChild(modal);

  player.ready(() => {
      // if(clips){
      //   playClip(); 
      // }
      
  });

  playClipAgainButton.addEventListener('click', () => {
    // playListActive = true   
        modal.close();
        playClip()
  });

  resumeButton.addEventListener('click', () => {
    playListActive = false   
        modal.close();
        player.play()
  });


  player.on('timeupdate', () => {
  
      if(clips && playListActive){
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
          
          playListActive = false
          currentClipIndex = 0
          modal.open();
        }
      }
      }
      
  });
  
   
  // Clean up Video.js when the component is unmounted
  return () => {
    console.log('I have unmounted')
    if (player) {
      player.dispose();
    }
  };
});

function setPlaylist(id){
  console.log(id, 'is selcted')
  playClip()
}
</script>
  
<div class="video-container">
  <video bind:this={videoElement} class="video-js vjs-default-skin" playsinline></video>
</div>

<button onclick={() => setPlaylist(1)}>Playlist 1</button>
<button onclick={() => setPlaylist(2)}>Playlist 2</button>

<style>
  /* Add optional custom styles here */
  .video-container {
    max-width: 800px;
  }
</style>