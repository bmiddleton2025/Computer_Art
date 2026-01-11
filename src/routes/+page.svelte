<script>
	import { Carousel } from 'flowbite-svelte';
	const images = [
		{ src: '/images/MorseCodeImage.png', title: 'MorseCodeImage' },
		{ src: '/images/MorseCodeImage-1.png', title: 'MorseCodeImage11' }
	];
</script>

<div class="flex min-h-screen w-full flex-col items-center justify-center gap-8">
	<div>
		<h1 class="text-3xl font-bold">Welcome to Mrs. Middleton's Corner</h1>
	</div>
	<div class="w-2/3">
		<Carousel class="flex justify-center" {images} duration={3000} />
	</div>
</div>
