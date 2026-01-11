<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { DarkMode } from 'flowbite-svelte';

	let activeUrl = $derived(page.url.href);
	let activeClass = 'text-white text-bold';
	let nonActiveClass = 'hover:text-white';
</script>

<div class="fixed flex w-full items-center space-x-4 bg-zinc-800 p-4 text-zinc-400">
	<a
		href="{base}/"
		class={!activeUrl.includes('code-art') && !activeUrl.includes('about')
			? activeClass
			: nonActiveClass}>Home</a
	>
	<a href="{base}/code-art" class={activeUrl.includes('code-art') ? activeClass : nonActiveClass}
		>Code Art</a
	>
	<a href="{base}/about" class={activeUrl.includes('about') ? activeClass : nonActiveClass}>About</a
	>
</div>
