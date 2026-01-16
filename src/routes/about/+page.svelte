<script>
	import { Carousel, Controls } from 'flowbite-svelte';

	let { data } = $props();
	const images = $derived(data.images);

	let index = $state(0);
</script>

<div class="space-y-10">
	<div class="space-y-8">
		<h1 class="text-6xl font-bold text-shadow-lg">Creators</h1>
		<div class="items-center justify-around gap-20 space-y-2 lg:flex lg:grid lg:grid-cols-2 lg:space-y-0">
			<div class="mx-auto w-2/3 text-center lg:w-1/2">
				<img alt="Bobbi Middleton" src="bobbi-middleton.jpg" class="mx-auto w-1/2 rounded-full border-2 border-black object-contain" />
				<div class="text-sm lg:text-lg">
					<h2 class="font-bold">Project Concept:</h2>
					<h2 class="font-semibold">Bobbi Middleton</h2>
				</div>
			</div>
			<div class="mx-auto w-2/3 text-center lg:w-1/2">
				<img alt="Dakota Gullicksen" src="dakota2025.jpg" class="mx-auto w-1/2 rounded-full border-2 border-black object-contain" />
				<div class="text-sm lg:text-lg">
					<h2 class="font-bold">Software Developer:</h2>
					<h2 class="font-semibold">Dakota Gullicksen</h2>
				</div>
			</div>
		</div>
	</div>
	<div class="space-y-10">
		<h1 class="text-6xl font-bold text-shadow-lg">Purpose</h1>
		<p class="text-lg font-semibold italic lg:text-2xl">
			The purpose of this site is to bridge a gap in STEM around morse code. Morse code is largely an unplugged activity; this site changes
			text to Morse code then into an image. The morse code then becomes an art piece visually and auditorily. I plan to have students write
			poems and have hidden meaning in their art.
		</p>
	</div>
	<div class="space-y-10">
		<h1 class="text-6xl font-bold text-shadow-lg">Examples</h1>
		<div class="mx-auto mb-10 items-center">
			<Carousel {images} classes={{ slide: 'w-fit' }} class="flex justify-center" bind:index duration={10000}>
				<Controls />
			</Carousel>
		</div>
	</div>
</div>
