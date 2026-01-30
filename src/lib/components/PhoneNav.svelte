<script>
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import { base } from '$app/paths';
	import { slide } from 'svelte/transition';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';

	let activeUrl = $derived(page.url.pathname);
	let activeClass = 'text-xl text-white self-center hover:bg-zinc-800 text-shadow-lg/100';
	const nonActiveClass = 'text-xl text-zinc-400 self-center hover:text-white hover:bg-zinc-800 text-shadow-none hover:text-shadow-lg/100';
	let isOpen = $state(false);
</script>

<div class="z-10 flex bg-zinc-800 p-3 text-zinc-400">
	<button class="w-full rounded-lg"><Icon class="mx-auto text-xl" icon="mdi:hamburger-menu" /></button>
	<Dropdown
		simple
		{activeUrl}
		class="flex w-full flex-col space-y-3 rounded-md bg-zinc-800 text-center"
		{isOpen}
		transition={slide}
		transitionParams={{ duration: 300, axis: 'y' }}
	>
		<DropdownItem onclick={() => (isOpen = false)} {activeClass} class={activeUrl != '/' ? nonActiveClass : ''} href="{base}/"
			><p class="text-center">Home</p></DropdownItem
		>
		<DropdownItem {activeClass} onclick={() => (isOpen = false)} class={activeUrl != '/about' ? nonActiveClass : ''} href="{base}/about"
			><p class="text-center">About</p></DropdownItem
		>
		<DropdownItem
			{activeClass}
			onclick={() => (isOpen = false)}
			class={activeUrl != '/how-to-use' ? nonActiveClass : ''}
			href="{base}/how-to-use"><p class="text-center">How To Use</p></DropdownItem
		>
	</Dropdown>
</div>
