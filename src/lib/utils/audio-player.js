import * as Tone from 'tone';

/**
 * Audio playback utilities for morse code visualization
 * Handles tone generation and playback control
 */

/**
 * Creates a delay promise for pausing execution
 * @param {number} seconds - Number of seconds to wait
 * @returns {Promise} Promise that resolves after the specified time
 */
export function waitTime(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/**
 * Calculates the duration a tone should play for a given character
 * Standard morse timing: dot = 1 unit, dash = 3 units
 * @param {string} character - The character to calculate duration for ('.' or '0' = dot, '-' or '1' = dash, ' ' = space)
 * @param {number} speed - The speed multiplier (in seconds for a dash)
 * @returns {number} The duration in seconds
 */
export function getToneDuration(character, speed) {
	if (character === '.' || character === '0') return speed / 3; // Dot duration (1 unit)
	if (character === '-' || character === '1') return speed; // Dash duration (3 units)
	return 0; // Space/other characters have no tone
}

/**
 * Plays morse code audio with visual feedback
 * Generates sine wave tones for dots and dashes with appropriate durations
 * Updates playingIndex to highlight the current character being played
 *
 * @param {string} morseOutput - The morse/binary string to play
 * @param {number} frequency - The frequency in Hz for the tone
 * @param {number} speed - The speed setting (duration of a dash in seconds)
 * @param {Object} callbacks - Callback functions
 * @param {Function} callbacks.setPlayingIndex - Called with the current index
 * @param {Function} callbacks.setIsPlaying - Called with the playing state
 * @param {Function} callbacks.shouldStop - Called to check if playback should stop (returns boolean)
 * @returns {Promise} Promise that resolves when playback completes
 */
export async function playMorseCode(morseOutput, frequency, speed, callbacks) {
	const { setPlayingIndex, setIsPlaying, shouldStop } = callbacks;

	setIsPlaying(true);

	// Create audio nodes
	const gainNode = new Tone.Gain(0).toDestination();
	const osc = new Tone.Oscillator(frequency, 'sine').connect(gainNode).start();

	try {
		for (let [index, value] of morseOutput.split('').entries()) {
			if (shouldStop()) break;

			setPlayingIndex(index);

			const duration = getToneDuration(value, speed);

			if (duration > 0) {
				// Ramp up quickly (5ms) to avoid the start pop
				gainNode.gain.rampTo(1, 0.005);
				await waitTime(duration);
				// Ramp down quickly (5ms) to avoid the end pop
				gainNode.gain.rampTo(0, 0.005);
			} else if (value === ' ') {
				await waitTime(speed);
			}

			// Brief silence between characters
			await waitTime(speed / 4);
		}
	} finally {
		// Always clean up resources
		osc.stop().dispose();
		gainNode.dispose();
		setIsPlaying(false);
		setPlayingIndex(-1);
	}
}
