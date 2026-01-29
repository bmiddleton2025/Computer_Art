<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { slide } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';

	let isOpen = $state(false);

	let activeUrl = $derived(page.url.pathname);
	const activeClass = 'text-xl text-white self-center hover:bg-zinc-800 text-shadow-lg/100';
	const nonActiveClass = 'text-xl text-zinc-400 self-center hover:text-white hover:bg-zinc-800 text-shadow-none hover:text-shadow-lg/100';
</script>

<div class="fixed flex w-full items-center justify-around space-x-6 bg-zinc-800 px-6 py-4 text-zinc-400">
	<a href="{base}/" class={activeUrl == '/' ? activeClass : nonActiveClass}>Home</a>
	<a href="{base}/about" class={activeUrl == '/about' ? activeClass : nonActiveClass}>About</a>

	<button
		class="flex items-center space-x-2 transition duration-300 {nonActiveClass}"
		onclick={() => {
			isOpen = !isOpen;
		}}
		><p>Guides</p>
		<Icon icon="ep:arrow-down-bold" class="duration-150 {isOpen ? '-rotate-180' : '-rotate-0'}" /></button
	>
	<Dropdown
		{activeUrl}
		{isOpen}
		simple
		class="flex w-40 flex-col justify-center space-y-3 rounded-md bg-zinc-800 p-1"
		transition={slide}
		transitionParams={{ duration: 300, axis: 'y' }}
	>
		<DropdownItem
			onclick={() => (isOpen = false)}
			href="{base}/guides/settings"
			{activeClass}
			class={activeUrl != '/guides/settings' ? nonActiveClass : ''}><p class="text-center">Settings</p></DropdownItem
		>
		<DropdownItem
			onclick={() => (isOpen = false)}
			href="{base}/guides/how-to-use"
			{activeClass}
			class={activeUrl != '/guides/how-to-use' ? nonActiveClass : ''}><p class="text-center">How To Use</p></DropdownItem
		>
	</Dropdown>
</div>
