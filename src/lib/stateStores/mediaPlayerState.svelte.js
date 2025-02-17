export const media = $state({
	vjs: null,
	type: undefined,
	src: '',
	keystoneId: '',
	type: '',
	seek: 0,
	seekingValue: 0,
	currentTimeMs: 0,
	loadeddata: 50,
	playing: false,
	interaction: false,
	duration: 0,
	ended: false,
	volume: null
});

export function mediaPlayerStart() {
	console.log('mpstart called');
	if (media.playing === false) {
		media.playing = true;
	} else {
		console.log('mediaPlayerStart called but media already playing');
	}
}

export function mediaPlayerStop() {
	console.log('mpstop called');
	if (media.playing) {
		media.playing = false;
		console.log('mediaPlayerStop called but media already paused');
	}
}

export function mediaStateReset() {}

// export const captions = $state({
// 	currentTimeMs: 0,
// 	playing: false,
// 	captionData: []
// });

export const captions = $state({
	currentTimeMs: 0,
	playing: false,
	captionData: [],
	imagesData: [],
	activeCueID: '',
	activeCueSpeaker: '',
	activeCueText: '',
	activeImage: ''
});
