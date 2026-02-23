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
<div class="flex min-h-screen flex-col bg-linear-to-t from-black to-blue-900 text-white text-shadow-lg/70">
	<div class="relative">
		{#if innerWidth >= 840}
			<ComputerNav />
		{:else}
			<PhoneNav />
		{/if}
	</div>
	<div class="flex-1 px-4 pt-6 sm:px-6 md:px-20 md:pt-10 lg:pt-20">
		{@render children()}
	</div>
</div>
