<script>
    import './app.css'
    import { env } from '$env/dynamic/public'
    import { fly,fade } from 'svelte/transition'
    let {data} = $props()
</script>

<div class="app-layout-wrapper">
    {#key data}
    <!-- <div class="page-load-wrapper" in:fly={{y: -200, duration: 500, delay: 500}} out:fly={{y: 200, duration: 500}}>
      <slot />
    </div> -->
    <div class="page-load-wrapper" in:fade={{duration: 400, delay: 400}} out:fade={{duration: 400}}>
        <slot />
    </div>
  {/key}
</div>

<style>
    .app-layout-wrapper {
        /* padding: 20px; */
        /* background-color: rgb(51, 51, 51); */
    }
</style>