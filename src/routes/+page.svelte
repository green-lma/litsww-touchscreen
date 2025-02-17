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

	const interval = setInterval(() => {
		index = (index + 1) % images.length;
	}, 7000);

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
	on:keydown={handleClick}
	role="button"
	tabindex="0"
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
	on:keydown={handleClick}
	tabindex="0"
>
<div>
    <h1 class="front-page-type">Featuring</h1>
    <h3>Southern Housing Group - A selection of Oral Histories </h3>
    <h3>The Diary - This is good stuff</h3>
</div>
	
    <!-- <img class="touchscreen-png" src="/images/touchscreen-to-start.png" alt="" /> -->
</div>

<div class="touchscreen-graphic">
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
    font-size: 3rem;
    line-height: 3rem;
    }

    h3 {
       letter-spacing: 0.3rem;
       font-variation-settings: 'wght' var(--regular);
       font-size: 1.5rem;
    }

    /* .front-page-type {
        color: white;
    } */

	.touchscreen-graphic {
		position: absolute;
		right: 100px;
		bottom: 100px;
	}

	.touchscreen-graphic img {
		width: 200px;
		height: 200px;
		opacity: 0.8;
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
		background:
			linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
			radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
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

	@keyframes scaleUp {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.05);
		}
	}

	.red-rectangle {
        color: white;
        display: flex;
        gap: 4rem;
		position: fixed;
		left: 0;
		bottom: 100px;
		width: fit-content;
		/* height: 200px; */
		background-color: var(--branding-secondary-red);
		z-index: 2;
		padding: 40px 40px 40px 100px;
		cursor: pointer;
	}
</style>

