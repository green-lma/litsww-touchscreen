<script>
	import { goto } from '$app/navigation';
	import { setContext } from 'svelte';

	let defaultModalTimeOut = 10
	let defaultInactivityTimeOut = 60 * 1000 * 60
	let showModal = $state(false);
	let timer;
	let isModalActive = $state(false);
	let timeLeft = $state(defaultModalTimeOut);
	let isCountingDown = $state(false);
	let isInactivityPaused = $state(false);

	// Reset the timer when user interacts with the page
	function resetTimer() {
		// Only reset if modal is not active and timer isn't paused
		if (!isModalActive && !isInactivityPaused) {
			clearTimeout(timer);
			showModal = false;
			isCountingDown = false;
			timeLeft = defaultModalTimeOut;

			// Set timer for inactivity
			timer = setTimeout(() => {
				showModal = true;
				isModalActive = true;
				isCountingDown = true;
			}, defaultInactivityTimeOut);
		}
	}

	// Functions to control inactivity timer
	function pauseInactivityTimer() {
		isInactivityPaused = true;
		clearTimeout(timer);
	}

	function resumeInactivityTimer() {
		isInactivityPaused = false;
		resetTimer();
	}

	// Handle user's choice
	function handleContinue() {
		isModalActive = false;
		showModal = false;
		isCountingDown = false;
		timeLeft = defaultModalTimeOut;
		resetTimer();
	}

	function handleExit() {
		clearTimeout(timer);
		isCountingDown = false;
		showModal = false;
		isModalActive = false;
		goto('/', { replaceState: true });
	}

	// Handle countdown
	$effect(() => {
		if (isCountingDown && timeLeft > 0 && !isInactivityPaused) {
			const countdownTimer = setTimeout(() => {
				timeLeft--;
			}, 1000);

			return () => clearTimeout(countdownTimer);
		} else if (isCountingDown && timeLeft <= 0) {
			handleExit();
		}
	});

	// Set up event listeners when component mounts
	$effect(() => {
		const events = [
			'mousedown',
			'mousemove',
			'keydown',
			'scroll',
			'touchstart',
			'touchmove', // Add this: detects finger movement on screen
			'touchend', // Add this: detects when touch ends
			'touchcancel' // Add this: detects when touch is interrupted
		];

		events.forEach((event) => {
			window.addEventListener(event, resetTimer);
		});

		// Initial timer setup
		resetTimer();

		// Cleanup when component unmounts
		return () => {
			events.forEach((event) => {
				window.removeEventListener(event, resetTimer);
			});
			clearTimeout(timer);
		};
	});

	// Expose timer controls to child components
	setContext('inactivityTimer', {
		pause: pauseInactivityTimer,
		resume: resumeInactivityTimer,
		isPaused: () => isInactivityPaused
	});
</script>

{#if showModal}
	<div class="modal-overlay">
		<div class="modal">
			<h2>You have been inactive for a while</h2>
			<p>Would you like to continue?</p>
			<p>Closing the session in {timeLeft} seconds...</p>
			<div class="button-group">
				<button on:click={handleContinue}>Continue</button>
				<button on:click={handleExit}>Exit</button>
			</div>
		</div>
	</div>
{/if}

<slot />

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(1px);
		-webkit-backdrop-filter: blur(1px); /* For Safari support */
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal {
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		background-color: var(--branding-secondary-blue);
		color: white;
		text-align: center;
		width: 50vw;
		height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.modal h2 {
		letter-spacing: 0.4rem;
		text-transform: uppercase;
	}

	.button-group {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
	}

	button {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1.1rem;
	}

	button:first-child {
		background: #4caf50;
		color: white;
	}

	button:last-child {
		background: #f44336;
		color: white;
	}

	h2 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.2rem;
		margin: 0.5rem 0;
	}
</style>
