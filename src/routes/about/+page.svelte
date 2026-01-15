<script>
	import { Carousel, Controls } from 'flowbite-svelte';

	let { data } = $props();
	const images = $derived(data.images);

	let index = $state(0);
</script>

<div class="space-y-10">
	<div class="space-y-8">
		<h1 class="text-6xl font-bold">Creators</h1>
		<div
			class="items-center justify-around gap-20 space-y-2 lg:flex lg:grid lg:grid-cols-2 lg:space-y-0"
		>
			<div class="mx-auto w-2/3 text-center lg:w-1/2">
				<img
					alt="Bobbi Middleton"
					src="bobbi-middleton.jpg"
					class="mx-auto w-1/2 rounded-full border-2 border-black object-contain"
				/>
				<div class="text-sm lg:text-base">
					<h2 class="font-semibold">Project Concept:</h2>
					<h2>Bobbi Middleton</h2>
				</div>
			</div>
			<div class="mx-auto w-2/3 text-center lg:w-1/2">
				<img
					alt="Dakota Gullicksen"
					src="dakota2025.jpg"
					class="mx-auto w-1/2 rounded-full border-2 border-black object-contain"
				/>
				<div class="text-sm lg:text-base">
					<h2 class="font-semibold">Software Developer:</h2>
					<h2>Dakota Gullicksen</h2>
				</div>
			</div>
		</div>
	</div>
	<div class="space-y-10">
		<h1 class="text-6xl font-bold">Purpose</h1>
		<p>Place holder</p>
	</div>
	<div class="space-y-10">
		<h1 class="text-6xl font-bold">Examples</h1>
		<div class="mx-auto mb-10 items-center">
			<Carousel
				{images}
				classes={{ slide: 'w-fit' }}
				class="flex justify-center"
				bind:index
				duration={10000}
			>
				<Controls />
			</Carousel>
		</div>
	</div>
</div>
