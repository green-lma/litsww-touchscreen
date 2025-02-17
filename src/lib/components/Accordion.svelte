<script>
//   export let open = false;
    let {openState} = $props()

	

	
    let open = $state(false)
	import { slide } from 'svelte/transition';
	$effect(() => {
		openState ? open = true : open = false

	})
	
</script>

<div class="accordion">
	<div class={open ? "header header-active" : "header"}>
		
		
		<slot name="head"></slot>	
		
		<!-- {#if open}  
		<div class="header-icon">
			<img class="wave-gif" src="/test.gif" alt="wave">
		</div>        
        

		{:else}
		<div class="header-icon" onclick={() => console.log('icon clicked')}>
			<svg class="play-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
		</div>
		
        {/if} -->
		
		<!-- <button on:click={handleClick} >
			+/-
		</button> -->
	</div>
	
	{#if open}
	<div class="details" transition:slide={{delay: 100, duration: 800}}>
		<slot name="details">
		</slot>
	</div>
	{/if}
</div>

<style>

	/* .play-icon {
		fill: var(--branding-secondary-blue);
		width: 50px;
	} */

	/* .wave-gif {
		height: 30px;
	} */
	div.accordion {
		/* margin: 1rem 0; */
		/* font-size: 1.1rem; */
	}
	
	/* div.header {
		display:flex;
		flex-direction: row-reverse;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;
		width:100%;
		
	}

	div.header-active {
		font-weight: 500;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--branding-secondary-blue-tint);
	} */
	
</style>
