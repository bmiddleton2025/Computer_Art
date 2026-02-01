<script>
	import SettingsModal from '$lib/components/SettingsModal.svelte';
	import Icon from '@iconify/svelte';
	import html2canvas from 'html2canvas-pro';
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

	let captureTarget = $state(); // Use HTMLElement for type safety
	let userInput = $state('');
	let userOutput = $state('');
	let inputOption = $state('Text');
	let outputOption = $state('Morse');
	let numIconsPerRow = $state(20);
	let textString = $state('');
	let morseString = $state('');
	let binaryString = $state('');
	let speed = $state(0.25);
	let isPlaying = $state(false);
	let playingIndex = $state(-1);
	let openModal = $state(false);
	let frequency = $state(600);
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

	function convertInput() {
		if (inputOption == 'Text') {
			userInput = userInput.toUpperCase().replaceAll(/[^A-Z 0-9]+/g, '');
			textString = userInput;
			textToMorse();
			textToBinary();
		} else if (inputOption == 'Morse') {
			userInput = userInput.toUpperCase().replaceAll(/[^\.\- ]+/g, '');
			morseString = userInput;
			textString = userInput
				.split(' ')
				.map((letter) => Object.keys(morseCodeValues).find((key) => morseCodeValues[key] === letter) || '')
				.join('');
			textToBinary();
		} else if (inputOption == 'Binary') {
			userInput = userInput.replaceAll(/[^0-1 ]+/g, '');
			binaryString = userInput;
			const bytes = new Uint8Array(binaryString.split(' ').map((byteStr) => parseInt(byteStr, 2)));
			const decoder = new TextDecoder('utf-8');
			console.log(binaryString);
			textString = decoder.decode(bytes);
			textToMorse();
		}

		if (outputOption == 'Text') userOutput = textString.trimEnd().trimStart();
		else if (outputOption == 'Morse') userOutput = morseString.trimEnd().trimStart();
		else if (outputOption == 'Binary') userOutput = binaryString.trimEnd().trimStart();
	}

	function waitTime(seconds) {
		return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
	}

	async function playMorseCode() {
		if (!isPlaying) {
			// make and start a 440hz sine tone
			const osc = new Tone.Oscillator(frequency, 'sine').toDestination();
			isPlaying = true;
			for (let [index, value] of userOutput.split('').entries()) {
				playingIndex = index;
				if (value == '.' || value == '0') {
					osc.start();
					await waitTime(speed / 3);
					osc.stop();
				} else if (value == '-' || value == '1') {
					osc.start();
					await waitTime(speed);
					osc.stop();
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
	bind:numIconsPerRow
	bind:backgroundColor
	bind:frequency
/>

<div class="space-y-5">
	<div class="flex text-gray-400">
		<button class="ml-auto cursor-pointer" aria-label="Settings" onclick={() => (openModal = true)}>
			<Icon icon="mdi:gear" width="40" />
		</button>
	</div>
	<div class="items-center justify-center space-y-2 lg:flex lg:space-y-0">
		<!-- Input Section -->
		<div class="mx-auto flex flex-col space-y-2 text-black lg:w-1/3">
			<div class="flex justify-center">
				<select
					bind:value={inputOption}
					class="w-1/2 rounded-3xl border-2 border-black shadow-lg"
					aria-label="Input type"
					onchange={convertInput}
				>
					{#each options as option (option)}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>
			<textarea
				class="min-h-[200px] w-full max-w-3xl rounded-lg border-2 border-black text-lg uppercase shadow-lg/100"
				bind:value={userInput}
				oninput={convertInput}
				aria-label="Input text"
			></textarea>
		</div>

		<div class="mx-auto flex hidden flex-col items-center lg:mt-10 lg:block lg:w-fit">
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
		<div class="mx-auto flex flex-col space-y-2 text-black lg:w-1/3">
			<div class="flex justify-center">
				<select
					bind:value={outputOption}
					class="w-1/2 rounded-3xl border-2 border-black shadow-lg"
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
				class="min-h-[200px] w-full max-w-3xl rounded-lg border-2 border-black bg-gray-300 text-lg text-black uppercase shadow-lg/100"
				bind:value={userOutput}
				aria-label="Output text"
			></textarea>
		</div>

		<div class="mt-5 flex flex-col items-center lg:hidden lg:w-fit">
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
	</div>
	{#if userOutput.length > 0}
		<button
			class="mx-auto flex w-fit items-center justify-center space-x-2 rounded-lg p-2 text-center text-black {isPlaying ||
			userOutput.length == 0
				? 'bg-green-800'
				: 'cursor-pointer bg-green-500 hover:bg-green-300 '}"
			onclick={takeScreenshot}
			disabled={isPlaying || userOutput.length == 0}
			><Icon icon="lsicon:picture-filled" width="20" />
			<p>Save Image</p></button
		>
		<div class="flex justify-center pb-5">
			<div
				bind:this={captureTarget}
				style="display: grid; grid-template-columns: repeat({numIconsPerRow}, 1fr); background-color: #{backgroundColor};"
			>
				<!-- Pixel Area -->
				{#each userOutput as symbol, index}
					{#if (symbol == '.' || symbol == '0') && dotOptions.show}
						<Icon icon={dotOptions.icon} class={index == playingIndex ? 'scale-125' : ''} width="fit" style="color: #{dotOptions.color}" />
					{:else if (symbol == '-' || symbol == '1') && dashOptions.show}
						<Icon
							icon={dashOptions.icon}
							class={index == playingIndex ? 'scale-125' : ''}
							width="fit"
							style="color: #{dashOptions.color}"
						/>
					{:else if symbol == ' ' && spaceOptions.show}
						<Icon icon={spaceOptions.icon} style="color: #{spaceOptions.color}" width="fit" />
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
