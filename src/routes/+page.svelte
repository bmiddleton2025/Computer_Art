<script>
	import Icon from '@iconify/svelte';
	import * as Tone from 'tone';
	import FrameOutput from '$lib/components/FrameOutput.svelte';
	import SettingsDrawer from '$lib/components/SettingsDrawer.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

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
	});
	const options = $state(['Text', 'Morse', 'Binary']);

	let userInput = $state('');
	let userOutput = $state('');
	let numIconsPerRow = $state(20);
	let textString = $state('');
	let morseString = $state('');
	let binaryString = $state('');
	let speed = $state(0.25);
	let isPlaying = $state(false);
	let playingIndex = $state(-1);
	let openDrawer = $state(false);
	let frequency = $state(600);
	let inputOption = $derived('Text');
	let outputOption = $state('Morse');
	let dotOptions = $state({
		color: 'ff0000',
		icon: 'material-symbols:square-rounded',
		show: true
	});
	let dashOptions = $state({
		color: '0000ff',
		icon: 'material-symbols:square-rounded',
		show: true
	});
	let spaceOptions = $state({
		color: '000000',
		icon: 'material-symbols:square-rounded',
		show: true
	});
	let backgroundColor = $state('000000');

	onMount(() => {
		if (browser) {
			userInput = sessionStorage.getItem('userInput') ?? '';
			inputOption = sessionStorage.getItem('inputOption') ?? 'Text';
			outputOption = sessionStorage.getItem('outputOption') ?? 'Morse';
			convertInput();
		}
	});

	function textToMorse() {
		morseString = textString
			.toUpperCase()
			.split('')
			.map((letter) => morseCodeValues[letter] || '')
			.join(' ');
	}

	function textToBinary() {
		const encoder = new TextEncoder('utf-8');
		let uint8Array = encoder.encode(textString);
		binaryString = Array.from(uint8Array)
			.map((byte) => byte.toString(2).padStart(8, '0'))
			.join(' ');
	}

	function morseToText() {
		textString = morseString
			.split(' ')
			.map((letter) => Object.keys(morseCodeValues).find((key) => morseCodeValues[key] === letter) || '')
			.join('');
	}

	function convertInput() {
		if (browser) {
			sessionStorage.setItem('inputOption', inputOption);
			sessionStorage.setItem('outputOption', outputOption);
		}
		userInput = userInput.trimStart();
		if (inputOption == 'Text') {
			textString = userInput;
			textToMorse();
			textToBinary();
		} else if (inputOption == 'Morse') {
			userInput = userInput.replaceAll(/[^\.\- ]+/g, '');
			morseString = userInput;
			morseToText();
			textToBinary();
		} else if (inputOption == 'Binary') {
			userInput = userInput.replaceAll(/[^0-1 ]+/g, '');
			binaryString = userInput;
			const bytes = new Uint8Array(binaryString.split(' ').map((byteStr) => parseInt(byteStr, 2)));
			const decoder = new TextDecoder('utf-8');
			textString = decoder.decode(bytes);
			textToMorse();
		}

		if (outputOption == 'Text') userOutput = textString.trimEnd().trimStart();
		else if (outputOption == 'Morse') userOutput = morseString.trimEnd().trimStart();
		else if (outputOption == 'Binary') userOutput = binaryString.trimEnd().trimStart();

		if (browser) sessionStorage.setItem('userInput', userInput);
	}

	function waitTime(seconds) {
		return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
	}

	async function playMorseCode() {
		if (!isPlaying) {
			isPlaying = true;

			// 1. Use a Gain node to control volume (the "Gate")
			const gainNode = new Tone.Gain(0).toDestination();
			const osc = new Tone.Oscillator(frequency, 'sine').connect(gainNode).start();

			for (let [index, value] of userOutput.split('').entries()) {
				playingIndex = index;

				let duration = 0;
				if (value === '.' || value === '0') duration = speed / 3;
				else if (value === '-' || value === '1') duration = speed;

				if (duration > 0) {
					// 2. Ramp up quickly (5ms) to avoid the start pop
					gainNode.gain.rampTo(1, 0.005);
					await waitTime(duration);
					// 3. Ramp down quickly (5ms) to avoid the end pop
					gainNode.gain.rampTo(0, 0.005);
				} else if (value === ' ') await waitTime(speed);

				await waitTime(speed / 4); // break between tones

				if (!isPlaying) break;
			}

			// Clean up
			osc.stop().dispose();
			gainNode.dispose();
			isPlaying = false;
			playingIndex = -1;
		}
	}
</script>

<SettingsDrawer
	bind:openDrawer
	bind:dotOptions
	bind:dashOptions
	bind:spaceOptions
	bind:speed
	bind:numIconsPerRow
	bind:backgroundColor
	bind:frequency
/>

<div class="space-y-5">
	<div class="flex items-center justify-end gap-10">
		<button
			class="h-fit cursor-pointer items-center rounded-lg bg-green-500 p-2 text-center text-black transition-transform hover:scale-105 hover:bg-green-300"
			>Reset Input</button
		>
		<button
			class="cursor-pointer rounded-lg p-2 text-gray-400 transition-transform hover:scale-105 hover:text-zinc-500"
			aria-label="Settings"
			onclick={() => (openDrawer = true)}
		>
			<Icon icon="mdi:gear" width="40" />
		</button>
	</div>
	<div class="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
		<!-- Input Section -->
		<div class="w-full space-y-2 text-black sm:max-w-3xl lg:w-1/3">
			<div class="flex justify-center">
				<select
					bind:value={inputOption}
					class="w-full rounded-3xl border-2 border-black p-2 shadow-lg sm:w-1/2"
					aria-label="Input type"
					onchange={convertInput}
				>
					{#each options as option (option)}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>
			<textarea
				class="min-h-[200px] w-full rounded-lg border-2 border-black p-3 text-base {inputOption == 'Morse'
					? 'font-bold'
					: 'font-semibold'} shadow-lg/100 sm:text-lg"
				bind:value={userInput}
				oninput={convertInput}
				aria-label="Input text"
			></textarea>
		</div>

		<div class="mx-auto mt-4 flex hidden flex-col items-center lg:mt-10 lg:block lg:w-fit">
			<Icon icon="pajamas:arrow-up" width="150" class="rotate-90 text-zinc-400" aria-hidden="true" />
			<!-- Buttons -->
			<div class="flex items-center justify-center space-x-10">
				<button
					onclick={playMorseCode}
					class={isPlaying || userOutput.length == 0 ? 'text-zinc-500' : 'cursor-pointer text-green-700 hover:text-green-300'}
					disabled={isPlaying || userOutput.length == 0}><Icon icon="icon-park-twotone:play" width="50" /></button
				>
				<button
					onclick={() => (isPlaying = false)}
					class={!isPlaying ? 'text-zinc-500' : 'cursor-pointer text-red-700 hover:text-red-300'}
					disabled={!isPlaying}><Icon icon="icon-park-twotone:handle-square" width="50" /></button
				>
			</div>
		</div>

		<!-- Output Section -->
		<div class="w-full space-y-2 text-black sm:max-w-3xl lg:w-1/3">
			<div class="flex justify-center">
				<select
					bind:value={outputOption}
					class="w-full rounded-3xl border-2 border-black p-2 shadow-lg sm:w-1/2"
					aria-label="Output type"
					onchange={convertInput}
				>
					{#each options as option (option)}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>
			<textarea
				disabled
				class="min-h-[200px] w-full rounded-lg border-2 border-black bg-gray-400 p-3 text-base {outputOption == 'Morse'
					? 'font-bold'
					: 'font-semibold'} text-black uppercase shadow-lg/100 sm:text-lg"
				bind:value={userOutput}
				aria-label="Output text"
			></textarea>
		</div>

		<div class="mt-5 flex w-full flex-col items-center justify-center space-y-4 lg:hidden lg:w-fit">
			<!-- Buttons for small screen-->
			<div class="flex items-center justify-center space-x-6">
				<button
					onclick={playMorseCode}
					class={isPlaying || userOutput.length == 0 ? 'text-zinc-500' : 'cursor-pointer text-green-700 hover:text-green-300'}
					disabled={isPlaying || userOutput.length == 0}><Icon icon="icon-park-twotone:play" width="60" /></button
				>
				<button
					onclick={() => (isPlaying = false)}
					class={!isPlaying ? 'text-zinc-500' : 'cursor-pointer text-red-700 hover:text-red-300'}
					disabled={!isPlaying}><Icon icon="icon-park-twotone:handle-square" width="60" /></button
				>
			</div>
		</div>
	</div>
	<FrameOutput
		bind:userOutput
		bind:isPlaying
		bind:playingIndex
		bind:dotOptions
		bind:dashOptions
		bind:spaceOptions
		bind:numIconsPerRow
		bind:backgroundColor
	/>
</div>
