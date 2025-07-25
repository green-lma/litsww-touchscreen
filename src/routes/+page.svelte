<script>
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { onDestroy } from 'svelte';

    let images = [
        '/images/screensaver/rotator1.webp',
        '/images/screensaver/rotator2.webp',
        '/images/screensaver/rotator3.webp',
        '/images/screensaver/rotator5.webp'
    ];

    let index = 0;
    let interval;

    function startInterval() {
        interval = setInterval(() => {
            index = (index + 1) % images.length;
        }, 7000);
    }

    startInterval();

    onDestroy(() => {
        clearInterval(interval);
    });

    function handleClick() {
        goto('/menu');
    }
</script>

<div
    class="carousel-container"
    on:click={handleClick}
    
>
    {#each images as image, i}
        {#if i === index}
            <div
                transition:fade={{ duration: 2000 }}
                class="carousel-image"
                style="background-image: url({image});"
            ></div>
        {/if}
    {/each}
</div>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="red-rectangle"
    on:click={handleClick}
   
    
>
    <div>
        <h1 class="front-page-type">Explore Further</h1>
        <h3>Samuel Lewis Housing Trust Remembered</h3>
        <h3>Percy Home's War Diary...a London record</h3>
    </div>
</div>

<div class="touchscreen-graphic" on:click={handleClick}>
    <img src="/images/touchscreen-to-start.png" alt="" />
</div>

<style>
    .touchscreen-png {
        width: 150px;
        height: 100%;
    }

    h1 {
        letter-spacing: 0.8rem;
        text-transform: uppercase;
        font-size: 2.85rem;
        line-height: 3rem;
        margin-bottom: 10px;
    }

    h3 {
        letter-spacing: 0.22rem;
        font-weight: 450;
        font-size: 1.40rem;
        margin-bottom: 2px;
    }

    .touchscreen-graphic {
        position: absolute;
        right: 100px;
        bottom: 100px;
        z-index: 99;
    }

    .touchscreen-graphic img {
        width: 190px;
        height: 190px;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .carousel-container {
        position: fixed;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        cursor: pointer;
    }

    .carousel-container::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),
            radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
        z-index: 1;
        pointer-events: none;
    }

    .carousel-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        animation: scaleUp 9.5s linear;
    }

    /* @keyframes scaleUp {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.05);
        }
    } */

    .red-rectangle {
        color: white;
        display: flex;
        gap: 4rem;
        position: fixed;
        left: 0;
        bottom: 100px;
        width: fit-content;
        background-color: var(--branding-secondary-red);
        z-index: 98;
        padding: 35px 35px 35px 100px;
        cursor: pointer;
    }
</style>