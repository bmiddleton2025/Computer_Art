<script>
	import { Carousel, Controls } from 'flowbite-svelte';

	let { data } = $props();
	const images = $derived(data.images);

	let index = $state(0);
</script>

<div class="space-y-10">
	<div class="space-y-8">
		<h1 class="text-6xl font-bold">Creators</h1>
		<div class="gap-20 space-y-2 lg:grid lg:grid-cols-2 lg:space-y-0">
			<div class="text-center">
				<img
					alt="Bobbi Middleton"
					src="bobbi-middleton.jpg"
					class="mx-auto w-1/4 rounded-full border-2 border-black object-contain"
				/>
				<div>
					<h2 class="flex-none font-semibold">Project Concept:</h2>
					<h2 class="flex-none">Bobbi Middleton</h2>
				</div>
			</div>
			<div class="text-center">
				<img
					alt="Dakota Gullicksen"
					src="dakota2025.jpg"
					class="mx-auto w-1/4 rounded-full border-2 border-black object-contain"
				/>
				<div>
					<h2 class="flex-none font-semibold">Software Developer:</h2>
					<h2 class="flex-none">Dakota Gullicksen</h2>
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
