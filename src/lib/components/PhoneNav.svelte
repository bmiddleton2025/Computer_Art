<script>
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import { base } from '$app/paths';
	import { DarkMode, Dropdown, DropdownItem } from 'flowbite-svelte';

	let activeUrl = $derived(page.url.href);
	let activeClass = 'text-white mx-auto w-full';
	let isOpen = $state(false);
</script>

<div class="z-10 flex bg-zinc-800 p-4 text-center text-zinc-400">
	<button class="rounded-lg px-3 hover:border-solid hover:border-black hover:bg-zinc-700"
		><Icon class="mx-auto text-xl" icon="mdi:hamburger-menu" /></button
	>
	<Dropdown simple {activeUrl} class="mx-auto w-full bg-zinc-800 dark:bg-zinc-800" bind:isOpen>
		<DropdownItem
			onclick={() => (isOpen = false)}
			class="text-zinc-400 hover:bg-zinc-700 hover:text-white dark:hover:bg-zinc-700 {!activeUrl.includes('about') ? activeClass : ''}"
			href="{base}/">Home</DropdownItem
		>
		<DropdownItem
			onclick={() => (isOpen = false)}
			class="text-zinc-400 hover:bg-zinc-700 hover:text-white dark:hover:bg-zinc-700 {activeUrl.includes('about') ? activeClass : ''}"
			href="{base}/about">About</DropdownItem
		>
	</Dropdown>
	<DarkMode class="my-auto mr-0 ml-auto h-fit hover:bg-zinc-700 dark:hover:bg-zinc-700" />
</div>
