<script>
	import Icon from '@iconify/svelte';
	import FrameOutput from '$lib/components/FrameOutput.svelte';
	import SettingsDrawer from '$lib/components/SettingsDrawer.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { processInput, getOutput } from '$lib/utils/morse-conversion.js';
	import { playMorseCode } from '$lib/utils/audio-player.js';

	// Conversion format options
	const options = $state(['Text', 'Morse', 'Binary']);

	// User input/output state
	let userInput = $state('');
	let userOutput = $state('');
	let inputOption = $state('Text');
	let outputOption = $state('Morse');

	// Internal string representations for each format
	let textString = $state('');
	let morseString = $state('');
	let binaryString = $state('');

	// Audio playback state
	let isPlaying = $state(false);
	let playingIndex = $state(-1);
	let frequency = $state(600);
	let speed = $state(0.25);

	// Visualization settings
	let numIconsPerRow = $state(20);
	let backgroundColor = $state('000000');
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

	// UI state
	let openDrawer = $state(false);

	onMount(() => {
		if (browser) {
			userInput = sessionStorage.getItem('userInput') ?? '';
			inputOption = sessionStorage.getItem('inputOption') ?? 'Text';
			outputOption = sessionStorage.getItem('outputOption') ?? 'Morse';
			convertInput();
		}
	});

	/**
	 * Converts user input to internal representations and updates output
	 * Processes the input based on selected format, persists to sessionStorage
	 */
	function convertInput() {
		if (browser) {
			sessionStorage.setItem('inputOption', inputOption);
			sessionStorage.setItem('outputOption', outputOption);
		}

		const result = processInput(userInput, inputOption);
		textString = result.textString;
		morseString = result.morseString;
		binaryString = result.binaryString;
		userInput = result.cleanedInput;

		userOutput = getOutput(outputOption, textString, morseString, binaryString);

		if (browser) sessionStorage.setItem('userInput', userInput);
	}

	/**
	 * Plays the current morse/binary output with audio and visual feedback
	 * Uses tone synthesis to generate appropriate frequencies for dots and dashes
	 */
	async function handlePlayMorseCode() {
		await playMorseCode(userOutput, frequency, speed, {
			setPlayingIndex: (index) => (playingIndex = index),
			setIsPlaying: (playing) => (isPlaying = playing),
			shouldStop: () => !isPlaying
		});
	}

	/**
	 * Resets all user inputs and settings to their default values
	 */
	function resetValues() {
		userInput = '';
		userOutput = '';
		inputOption = 'Text';
		outputOption = 'Morse';
		sessionStorage.clear();
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
	<div class="flex items-center justify-between gap-10 lg:justify-end">
		<button
			class="h-fit items-center rounded-lg p-2 text-center text-black transition-transform {userInput.length == 0 &&
			inputOption == 'Text' &&
			outputOption == 'Morse'
				? 'bg-green-800'
				: 'cursor-pointer bg-green-500 hover:scale-105 hover:bg-green-300'}"
			disabled={userInput.length == 0 && inputOption == 'Text' && outputOption == 'Morse'}
			onclick={resetValues}>Reset Input</button
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
					onclick={handlePlayMorseCode}
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

		<div class="mb-4 flex w-full flex-col items-center justify-center space-y-4 lg:hidden lg:w-fit">
			<!-- Buttons for small screen-->
			<div class="flex items-center justify-center space-x-6">
				<button
					onclick={handlePlayMorseCode}
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
