<script>
	import Icon from '@iconify/svelte';
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
	let textInput = $state('');
	let textOutput = $state('');
	let inputOption = $state('Text');
	let outputOption = $state('Morse');
	let numBoxesPerRow = $state(20);

	function convertInput() {
		if (inputOption == 'Text' && outputOption == 'Morse') {
			textInput = textInput.toUpperCase().replaceAll(/[^A-Z 0-9]+/g, '');
			textOutput = textInput
				.toUpperCase()
				.split('')
				.map((letter) => morseCodeValues[letter] || '')
				.join(' ');
		} else if (inputOption == 'Morse' && outputOption == 'Text') {
			textInput = textInput.toUpperCase().replaceAll(/[^\.\- ]+/g, '');
			textOutput = textInput
				.split(' ')
				.map(
					(letter) =>
						Object.keys(morseCodeValues).find((key) => morseCodeValues[key] === letter) || ''
				)
				.join('');
		} else if (inputOption == outputOption) {
			textOutput = textInput;
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
					bind:value={textInput}
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
					bind:value={textOutput}
					aria-label="Output text"
				></textarea>
			</div>
		</div>
	</div>
	<div class="flex">
		<div class="flex grid w-3/4 grid-cols-{numBoxesPerRow} flex-wrap rounded-lg bg-black">
			<!-- Pixel Area -->
			{#each textOutput as symbol}
				{#if symbol == '.'}
					<Icon icon="material-symbols:square-outline-rounded" class="text-red-500" width="fit" />
				{:else if symbol == '-'}
					<Icon icon="material-symbols:square-outline-rounded" class="text-blue-500" width="fit" />
				{:else if symbol == ' '}
					<Icon icon="material-symbols:square-outline-rounded" class="text-black" width="fit" />
				{/if}
			{/each}
		</div>
		<div>
			<!-- Buttons -->
		</div>
	</div>
</div>
