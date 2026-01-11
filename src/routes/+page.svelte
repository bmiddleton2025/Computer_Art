<script>
	import SettingsModal from '$lib/components/SettingsModal.svelte';
	import Icon from '@iconify/svelte';
	import html2canvas from 'html2canvas';
	import * as Tone from 'tone';
	import { onDestroy } from 'svelte';

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
	const options = $state(['Text', 'Morse']);

	let captureTarget = $state(); // Use HTMLElement for type safety
	let userInput = $state('');
	let userOutput = $state('');
	let inputOption = $state('Text');
	let outputOption = $state('Morse');
	let numBoxesPerRow = $state(20);
	let textString = $state('');
	let morseString = $state('');
	let speed = $state(0.25);
	let isPlaying = $state(false);
	let playingIndex = $state(-1);
	let openModal = $state(false);
	let dotOptions = $state({
		color: 'ff0000',
		icon: 'material-symbols:square-rounded',
		tune: 'C4'
	});
	let dashOptions = $state({
		color: '0000ff',
		icon: 'material-symbols:square-rounded',
		tune: 'C4'
	});
	let spaceOptions = $state({
		color: '000000',
		icon: 'material-symbols:square-rounded'
	});
	let backgroundColor = $state('000000');

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
			userOutput = textString.trimEnd().trimStart();
		} else if (outputOption == 'Morse') {
			userOutput = morseString.trimEnd().trimStart();
		}
	}

	function waitTime(seconds) {
		return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
	}

	async function playMorseCode() {
		if (!isPlaying) {
			await Tone.start();
			let synth = new Tone.Synth().toDestination();
			isPlaying = true;
			for (let [index, value] of morseString.split('').entries()) {
				const now = Tone.now();
				playingIndex = index;
				if (value == '.') {
					synth.triggerAttack(dotOptions.tune);
					synth.triggerRelease(now + speed / 3);
					await waitTime(speed / 3);
				} else if (value == '-') {
					synth.triggerAttack(dashOptions.tune);
					synth.triggerRelease(now + speed);
					await waitTime(speed);
				} else if (value == ' ') {
					await waitTime(speed);
				}
				await waitTime(speed / 4); //break between tones
				playingIndex = -1;
				if (!isPlaying) break;
			}
			isPlaying = false;
		}
	}

	async function takeScreenshot() {
		if (!captureTarget) {
			console.error('Target element not found!');
			return;
		}

		// Use html2canvas with options to handle potential issues like CORS for images
		const canvas = await html2canvas(captureTarget, {
			useCORS: true, // Attempt to load images using CORS
			allowTaint: true // Allow cross-origin images to "taint" the canvas
		});

		const image = canvas.toDataURL('image/png');
		const link = document.createElement('a');
		link.download = 'MorseCodeImage.png';
		link.href = image;
		link.click(); // Programmatically click the link to trigger download

		// Clean up the temporary link element
		link.remove();
	}
</script>

<SettingsModal
	bind:openModal
	bind:dotOptions
	bind:dashOptions
	bind:spaceOptions
	bind:speed
	bind:numBoxesPerRow
	bind:backgroundColor
/>

<div class="space-y-5">
	<div class="flex text-gray-400">
		<button class="ml-auto cursor-pointer" aria-label="Settings" onclick={() => (openModal = true)}>
			<Icon icon="mdi:gear" width="40" />
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

			<div class="mt-10 flex w-fit flex-col items-center">
				<Icon
					icon="pajamas:arrow-up"
					width="150"
					class="rotate-90 text-gray-400"
					aria-hidden="true"
				/>
				<!-- Buttons -->
				<div class="flex items-center justify-center space-x-10">
					<button
						onclick={playMorseCode}
						class={isPlaying || userOutput.length == 0
							? 'text-gray-500'
							: 'cursor-pointer text-gray-400 hover:text-gray-100'}
						disabled={isPlaying || userOutput.length == 0}
						><Icon icon="gridicons:play" width="50" /></button
					>
					<button
						onclick={() => (isPlaying = false)}
						class={!isPlaying
							? 'text-gray-500'
							: 'cursor-pointer text-gray-400 hover:text-gray-100'}
						disabled={!isPlaying}><Icon icon="carbon:stop-filled" width="50" /></button
					>
				</div>
			</div>

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
	{#if userOutput.length > 0}
		<button
			class="mx-auto flex items-center space-x-2 rounded-lg p-2 text-black {isPlaying ||
			userOutput.length == 0
				? 'bg-green-800'
				: 'cursor-pointer bg-green-500 hover:bg-green-300 '}"
			onclick={takeScreenshot}
			disabled={isPlaying || userOutput.length == 0}
			><Icon icon="lsicon:picture-filled" width="20" />
			<p>Save Image</p></button
		>
		<div class="flex justify-center">
			<div
				bind:this={captureTarget}
				class="rounded-lg"
				style="display: grid; grid-template-columns: repeat({numBoxesPerRow}, 1fr); background-color: #{backgroundColor};"
			>
				<!-- Pixel Area -->
				{#each userOutput as symbol, index}
					{#if symbol == '.'}
						<Icon
							icon={dotOptions.icon}
							class={index == playingIndex ? 'scale-125' : ''}
							width="fit"
							style="color: #{dotOptions.color}"
						/>
					{:else if symbol == '-'}
						<Icon
							icon={dashOptions.icon}
							class={index == playingIndex ? 'scale-125' : ''}
							width="fit"
							style="color: #{dashOptions.color}"
						/>
					{:else if symbol == ' '}
						<Icon icon={spaceOptions.icon} style="color: #{spaceOptions.color}" width="fit" />
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
