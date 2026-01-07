<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="min-h-screen bg-linear-to-t from-black to-blue-900 px-20 py-10 text-white">
	{@render children()}
</div>
