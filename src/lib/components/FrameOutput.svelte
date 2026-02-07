<script>
	import Icon from '@iconify/svelte';
	import html2canvas from 'html2canvas-pro';

	let {
		userOutput = $bindable(),
		isPlaying = $bindable(),
		playingIndex = $bindable(),
		dotOptions = $bindable(),
		dashOptions = $bindable(),
		spaceOptions = $bindable(),
		numIconsPerRow = $bindable(),
		backgroundColor = $bindable()
	} = $props();
	let captureTarget = $state(); // Use HTMLElement for type safety

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
					<Icon icon={dashOptions.icon} class={index == playingIndex ? 'scale-125' : ''} width="fit" style="color: #{dashOptions.color}" />
				{:else if symbol == ' ' && spaceOptions.show}
					<Icon icon={spaceOptions.icon} style="color: #{spaceOptions.color}" width="fit" />
				{/if}
			{/each}
		</div>
	</div>
{/if}
