<script>
	import { expoInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	const images = [
		{ id: 1, src: '/images/MorseCodeImage.png', title: 'MorseCodeImage' },
		{ id: 2, src: '/images/MorseCodeImage-1.png', title: 'MorseCodeImage11' }
	];

	let currentId = 1;

	function waitTime(seconds) {
		return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
	}

	onMount(async () => {
		while (true) {
			await waitTime(3);
			currentId = currentId === images.length ? 1 : currentId + 1;
		}
	});
</script>

<div class="static flex min-h-screen w-full flex-col items-center justify-center">
	<div>
		<h1 class="absolute inset-x-0 top-30 mx-auto w-full text-center text-5xl font-bold">
			Welcome to Mrs. Middleton's Corner
		</h1>
	</div>

	<div id="default-carousel" class="relative w-full" data-carousel="slide">
		<div class="rounded-base relative h-56 overflow-hidden md:h-96">
			{#each images as image}
				{#if image.id == currentId}
					<div class="hidden duration-700 ease-in-out" data-carousel-item>
						<img
							src={image.src}
							alt={image.title}
							class="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
						/>
					</div>
				{/if}
			{/each}
		</div>
	</div>
	<!-- <div class="flex w-full justify-center">
		{#each images as image}
			{#if image.id == currentId}
				<img src={image.src} alt={image.title} transition:fade={{ easing: expoInOut }} />
			{/if}
		{/each}
	</div> -->
</div>
