/**
 * Morse code conversion utilities
 * Handles conversions between Text, Morse Code, and Binary formats
 */

/**
 * Mapping of characters to their morse code equivalents
 * Dot (.) = dit, Dash (-) = dah
 */
export const morseCodeValues = {
	A: '.-',
	B: '-...',
	C: '-.-.',
	D: '-..',
	E: '.',
	F: '..-.',
	G: '--.',
	H: '....',
	I: '..',
	J: '.---',
	K: '-.-',
	L: '.-..',
	M: '--',
	N: '-.',
	O: '---',
	P: '.--.',
	Q: '--.-',
	R: '.-.',
	S: '...',
	T: '-',
	U: '..-',
	V: '...-',
	W: '.--',
	X: '-..-',
	Y: '-.--',
	Z: '--..',
	1: '.----',
	2: '..---',
	3: '...--',
	4: '....-',
	5: '.....',
	6: '-....',
	7: '--...',
	8: '---..',
	9: '----.',
	0: '-----',
	' ': ''
};

/**
 * Converts text to morse code
 * Transforms the text into morse code format where each character is separated by a space
 * @param {string} text - The text to convert
 * @returns {string} The morse code representation
 */
export function textToMorse(text) {
	return text
		.toUpperCase()
		.split('')
		.map((letter) => morseCodeValues[letter] || '')
		.join(' ');
}

/**
 * Converts text to binary
 * Encodes the text into UTF-8 bytes and converts each byte to 8-bit binary representation
 * @param {string} text - The text to convert
 * @returns {string} The binary representation with bytes separated by spaces
 */
export function textToBinary(text) {
	const encoder = new TextEncoder('utf-8');
	const uint8Array = encoder.encode(text);
	return Array.from(uint8Array)
		.map((byte) => byte.toString(2).padStart(8, '0'))
		.join(' ');
}

/**
 * Converts morse code to regular text
 * Looks up each morse code symbol and converts it back to text
 * @param {string} morse - The morse code string with characters separated by spaces
 * @returns {string} The decoded text
 */
export function morseToText(morse) {
	return morse
		.split(' ')
		.map((letter) => Object.keys(morseCodeValues).find((key) => morseCodeValues[key] === letter) || '')
		.join('');
}

/**
 * Converts binary to text
 * Takes binary string with bytes separated by spaces and decodes to UTF-8 text
 * @param {string} binary - The binary string with bytes separated by spaces
 * @returns {string} The decoded text
 */
export function binaryToText(binary) {
	const bytes = new Uint8Array(binary.split(' ').map((byteStr) => parseInt(byteStr, 2)));
	const decoder = new TextDecoder('utf-8');
	return decoder.decode(bytes);
}

/**
 * Gets the output string based on the selected format
 * @param {string} option - The output format ('Text', 'Morse', or 'Binary')
 * @param {string} textString - The text representation
 * @param {string} morseString - The morse representation
 * @param {string} binaryString - The binary representation
 * @returns {string} The formatted output string trimmed of whitespace
 */
export function getOutput(option, textString, morseString, binaryString) {
	if (option === 'Text') return textString.trim();
	if (option === 'Morse') return morseString.trim();
	if (option === 'Binary') return binaryString.trim();
	return '';
}

/**
 * Processes user input based on the selected input format
 * Validates and sanitizes input, then converts to all formats
 * @param {string} input - The raw user input
 * @param {string} inputOption - The input format ('Text', 'Morse', or 'Binary')
 * @returns {Object} Object with textString, morseString, binaryString, and cleaned input
 */
export function processInput(input, inputOption) {
	let cleanedInput = input.trimStart();
	let textString = '';
	let morseString = '';
	let binaryString = '';

	if (inputOption === 'Text') {
		textString = cleanedInput;
		morseString = textToMorse(textString);
		binaryString = textToBinary(textString);
	} else if (inputOption === 'Morse') {
		cleanedInput = cleanedInput.replaceAll(/[^\.\- ]+/g, '');
		morseString = cleanedInput;
		textString = morseToText(morseString);
		binaryString = textToBinary(textString);
	} else if (inputOption === 'Binary') {
		cleanedInput = cleanedInput.replaceAll(/[^0-1 ]+/g, '');
		binaryString = cleanedInput;
		textString = binaryToText(binaryString);
		morseString = textToMorse(textString);
	}

	return { textString, morseString, binaryString, cleanedInput };
}
