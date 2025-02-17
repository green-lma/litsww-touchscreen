// @ts-nocheck
export function transcriptScroll(node, params) {
	// function scrollIntoView(activeElement) {
	// 	activeElement.scrollIntoView({
	// 		behavior: 'smooth',
	// 		block: 'center',
	// 		inline: 'nearest'
	// 	});
	// }

	let inViewport;
	let observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio >= 1) {
					console.log('IN of viewport');
					inViewport = true;
				} else {
					console.log('OUT the  viewport');
					inViewport = false;
				}
			});
		},
		{ threshold: 0 }
	);

	function scrollIntoViewAndWait(element) {
		return new Promise((resolve) => {
			element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
			node.addEventListener('scrollend', resolve, { once: true });
		});
	}

	function lastIntersectionObserver(element) {
		let lastIntersection;
		return new Promise((resolve, reject) => {
			lastIntersection = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio == 1) {
						console.log('IN of viewport');
						resolve(true);
					} else {
						console.log('OUT the  viewport');
						resolve(false);
					}
				});
				// let entry = entries[0];
				// if (!entry.isIntersecting) return;
				// console.log('Element is visible ', entry.target);
				// resolve(true);
			});
			lastIntersection.observe(element);
		});
	}

	async function startAutoScroll(el, inViewport) {
		if (inViewport == false) {
			console.log('x scrolling');
			await scrollIntoViewAndWait(el);
			console.log('finished');
		} else {
			console.log('item is still in viewport. not scrolling');
		}
	}

	return {
		update(params) {
			const InViewportEvent = new CustomEvent('intheviewport', {
				detail: {
					inViewport: true
				}
			});
			const OutViewportEvent = new CustomEvent('intheviewport', {
				detail: {
					inViewport: false
				}
			});
			let activeTransElement = params.refs[Math.floor(parseFloat(params.cueID)) - 1];
			if (activeTransElement) {
				lastIntersectionObserver(activeTransElement, node).then((result) => {
					console.log('RESULT', result);
					console.log(node);
					// startAutoScroll(activeTransElement, result);

					if (result) {
						node.dispatchEvent(InViewportEvent);
					} else {
						node.dispatchEvent(OutViewportEvent);
					}
				});
			}

			// if (params.cue === parseFloat(params.cueID)) {
			// 	console.log('Its a match');
			// 	let activeTransElement = params.refs[Math.floor(parseFloat(params.cueID)) - 1];
			// 	lastIntersectionObserver(activeTransElement).then((result) => {
			// 		console.log(result);
			// 		startAutoScroll(activeTransElement, result);
			// 	});
			// }

			// scrollIntoView(activeTransElement);
			// observer.observe(activeTransElement);
		},
		destroy() {}
	};
}
