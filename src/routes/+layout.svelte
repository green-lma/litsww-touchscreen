<script>
    import './app.css'
    import { env } from '$env/dynamic/public'
</script>

<div class="app-layout-wrapper">
    <slot />
</div>

<style>
    .app-layout-wrapper {
        /* padding: 20px; */
        background-color: rgb(228, 228, 228);
    }
</style>