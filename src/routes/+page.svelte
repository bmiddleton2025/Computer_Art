<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import * as Tone from 'tone';

	const morseCodeValues = $state({
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
		K: '.-..',
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
	});
	const options = $state(['Text', 'Morse']);

	let userInput = $state('');
	let userOutput = $state('');
	let inputOption = $state('Text');
	let outputOption = $state('Morse');
	let numBoxesPerRow = $state(20);
	let textString = $state('');
	let morseString = $state('');

	function convertInput() {
		if (inputOption == 'Text') {
			userInput = userInput.toUpperCase().replaceAll(/[^A-Z 0-9]+/g, '');
			textString = userInput;
			morseString = userInput
				.toUpperCase()
				.split('')
				.map((letter) => morseCodeValues[letter] || '')
				.join(' ');
		} else if (inputOption == 'Morse') {
			userInput = userInput.toUpperCase().replaceAll(/[^\.\- ]+/g, '');
			morseString = userInput;
			textString = userInput
				.split(' ')
				.map(
					(letter) =>
						Object.keys(morseCodeValues).find((key) => morseCodeValues[key] === letter) || ''
				)
				.join('');
		}

		if (outputOption == 'Text') {
			userOutput = textString;
		} else if (outputOption == 'Morse') {
			userOutput = morseString;
		}
	}

	async function playMorseCode() {
		await Tone.start();
		let synth = new Tone.Synth().toDestination();
		let timing = 0;
		for (let letter of morseString) {
			const now = Tone.now();
			if (letter == '.') {
				await synth?.triggerAttackRelease('C4', '12n', now + timing);
			} else if (letter == '-') {
				await synth?.triggerAttackRelease('G4', '4n', now + timing);
			} else if (letter == ' ') {
				timing += 0.25;
			}
			timing += 0.25;
		}
	}
</script>

<div class="space-y-5">
	<div class="flex text-gray-400">
		<button class="ml-auto" aria-label="Settings">
			<Icon icon="mdi:gear" width="30" height="30" />
		</button>
	</div>
	<div>
		<div class="flex items-center justify-center space-x-10">
			<!-- Input Section -->
			<div class="flex w-1/3 flex-col space-y-2 text-black">
				<div class="flex justify-center">
					<select
						bind:value={inputOption}
						class="w-1/2 rounded-3xl border-2 border-black bg-gray-300 shadow-lg"
						aria-label="Input type"
						onchange={convertInput}
					>
						{#each options as option (option)}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>
				<textarea
					class="min-h-[200px] w-full max-w-3xl rounded-lg border-2 border-black uppercase shadow-lg"
					bind:value={userInput}
					oninput={convertInput}
					aria-label="Input text"
				></textarea>
			</div>

			<Icon
				icon="pajamas:arrow-up"
				width="100"
				class="mt-10 rotate-90 text-gray-400"
				aria-hidden="true"
			/>

			<!-- Output Section -->
			<div class="flex w-1/3 flex-col space-y-2 text-black">
				<div class="flex justify-center">
					<select
						bind:value={outputOption}
						class="w-1/2 rounded-3xl border-2 border-black bg-gray-300 shadow-lg"
						aria-label="Input type"
						onchange={convertInput}
					>
						{#each options as option (option)}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>
				<textarea
					disabled
					class="min-h-[200px] w-full max-w-3xl rounded-lg border-2 border-black bg-gray-300 text-black uppercase shadow-lg"
					bind:value={userOutput}
					aria-label="Output text"
				></textarea>
			</div>
		</div>
	</div>
	<div class="flex">
		<div
			class="w-3/4 rounded-lg bg-black"
			style="display: grid; grid-template-columns: repeat({numBoxesPerRow}, 1fr);"
		>
			<!-- Pixel Area -->
			{#each morseString as symbol}
				{#if symbol == '.'}
					<Icon icon="material-symbols:square-rounded" class="text-red-500" width="fit" />
				{:else if symbol == '-'}
					<Icon icon="material-symbols:square-rounded" class="text-blue-500" width="fit" />
				{:else if symbol == ' '}
					<Icon icon="material-symbols:square-rounded" class="text-black" width="fit" />
				{/if}
			{/each}
		</div>
		<div>
			<!-- Buttons -->
			<button onclick={playMorseCode}>Play</button>
		</div>
	</div>
</div>
