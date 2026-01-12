<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ComputerNav from '$lib/components/ComputerNav.svelte';
	import PhoneNav from '$lib/components/PhoneNav.svelte';

	let { children } = $props();
	let innerWidth = $state(0);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window bind:innerWidth />
<div
	class="flex min-h-screen flex-col bg-linear-to-t from-white to-blue-900 text-white dark:from-black"
>
	<div class="relative">
		{#if innerWidth >= 840}
			<ComputerNav />
		{:else}
			<PhoneNav />
		{/if}
	</div>
	<div class="flex-1 overflow-auto px-20 pt-20">
		{@render children()}
	</div>
</div>
