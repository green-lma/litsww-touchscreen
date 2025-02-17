<script>
    import Videojs from '$lib/components/Videojs.svelte'
    import {media, captions} from '$lib/stateStores/mediaPlayerState.svelte.js'

    let stateData = $state(false)
    const videoOptions = {
    controls: false,
    autoplay: true,
    responsive: true,
    fluid: true,
    audioOnlyMode: true,
    // audioPosterMode: true,
    inactivityTimeout: 0,
    disablePictureInPicture: true,
    // muted: true,
    // bigPlayButton: false,
    // width: 1000,
    // height: 30,
    sources: [
        {
        src: media.src,
        type: media.type
        }
    ]
    };

</script>

<!-- <h2>Media Item Component </h2>

<button onclick={() => {updateCurrentTime(200)}}>Update Time</button>
<button onclick={() => {changeSource('http://127.0.0.1:8090/api/files/qv0pwwg999h6ehz/59l4tlfn8n9nqjr/bob_UST0DFEHsY.mp3','audio/mpeg') }}>Change Source Audio</button>
<button onclick={() => {changeSource('http://localhost/media/632dbb8d80b67b8ff6fd6de0','video/mp4') }}>Change Source Video</button> -->

<!-- <button class="btn primary" onclick={() => {stateData = !stateData}}>Show/Hide State Data</button> -->
{#if stateData}
<p>Current Time = {media.currentTimeMs}</p>
<p>Playing: {media.playing}</p>
<p>src: {media.src} {media.type}</p>
<p>Seek: {media.seek}</p>
{/if}
<Videojs {videoOptions}/>