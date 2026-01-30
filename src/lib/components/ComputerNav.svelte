<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';

	let activeUrl = $derived(page.url.pathname);
	const activeClass = 'text-white hover:bg-zinc-800 text-shadow-lg/100';
	const nonActiveClass = 'hover:text-white hover:bg-zinc-800 text-shadow-none hover:text-shadow-lg/100';
</script>

<div class="fixed flex w-full items-center justify-around space-x-6 bg-zinc-800 px-6 py-4 text-xl text-zinc-400">
	<a href="{base}/" class={activeUrl == '/' ? activeClass : nonActiveClass}>Home</a>
	<a href="{base}/about" class={activeUrl == '/about' ? activeClass : nonActiveClass}>About</a>
	<a href="{base}/how-to-use" class={activeUrl == '/how-to-use' ? activeClass : nonActiveClass}>How To Use</a>
</div>
