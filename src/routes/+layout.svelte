<script>
	import '../app.css';
	import ComputerNav from '$lib/components/ComputerNav.svelte';
	import PhoneNav from '$lib/components/PhoneNav.svelte';

	let { children } = $props();
	let innerWidth = $state(0);
</script>

<svelte:head>
	<link rel="icon" />
</svelte:head>

<svelte:window bind:innerWidth />
<div class="flex min-h-screen flex-col bg-linear-to-t from-white to-blue-900 dark:from-black dark:text-white">
	<div class="relative">
		{#if innerWidth >= 840}
			<ComputerNav />
		{:else}
			<PhoneNav />
		{/if}
	</div>
	<div class="flex-1 px-20 pt-10 lg:pt-20">
		{@render children()}
	</div>
</div>
