<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';

	let activeUrl = $derived(page.url.pathname);
	const activeClass = 'text-white hover:bg-zinc-800 text-shadow-lg/100';
	const nonActiveClass = 'hover:text-white hover:bg-zinc-800 text-shadow-none hover:text-shadow-lg/100';
</script>

<div
	class="fixed flex w-full items-center justify-around space-x-4 bg-zinc-800 px-4 py-3 text-base text-zinc-400 sm:space-x-6 sm:px-6 sm:py-4 md:text-lg lg:text-xl"
>
	<a href="{base}/" class={activeUrl == '/' ? activeClass : nonActiveClass}>Home</a>
	<a href="{base}/how-to-use" class={activeUrl == '/how-to-use' ? activeClass : nonActiveClass}>How To Use</a>
	<a href="{base}/about" class={activeUrl == '/about' ? activeClass : nonActiveClass}>About</a>
</div>
