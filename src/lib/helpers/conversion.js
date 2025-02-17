export function millisecondsToTimecode(ms) {
	return ms;
}

export function timecodeToMillisecons(ms) {
	return ms;
}

export function srtTimecodeToMillisecons(ms) {
	return ms;
}

export function millisecondsToReadableTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	const paddedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
	return `${minutes}:${paddedSeconds}`;
}

export function formatTimecode(seconds) {
	// Extract the whole minutes
	const minutes = Math.floor(seconds / 60);
	// Extract the remaining seconds
	const remainingSeconds = Math.floor(seconds % 60);
	// Extract the milliseconds
	const milliseconds = Math.round((seconds % 1) * 1000);

	// Format minutes and seconds to be two digits
	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(remainingSeconds).padStart(2, '0');
	// Format milliseconds to be three digits
	const formattedMilliseconds = String(milliseconds).padStart(3, '0');

	return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}
