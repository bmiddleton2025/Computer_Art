<script>
	import Icon from '@iconify/svelte';
	import { Drawer } from 'flowbite-svelte';

	let {
		openDrawer = $bindable(),
		numIconsPerRow = $bindable(),
		speed = $bindable(),
		frequency = $bindable(),
		dotOptions = $bindable({
			color: 'ff0000',
			icon: 'material-symbols:square-rounded'
		}),
		dashOptions = $bindable({
			color: '0000ff',
			icon: 'material-symbols:square-rounded'
		}),
		spaceOptions = $bindable({
			color: '000000',
			icon: 'material-symbols:square-rounded'
		}),
		backgroundColor = $bindable('000000')
	} = $props();

	function handleHexInput(value) {
		return value.slice(1);
	}
</script>

<Drawer bind:open={openDrawer} placement="right" class="w-90 space-y-3 border-2 border-black bg-gray-400 text-shadow-none">
	<h1 class="text-2xl font-bold">Settings</h1>
	<hr />
	<div class="space-y-3">
		{#each [{ title: 'Dot / 0', options: dotOptions }, { title: 'Dash / 1', options: dashOptions }, { title: 'Space', options: spaceOptions }] as section (section.title)}
			<div>
				<h2 class="text-xl font-bold">{section.title}</h2>
				<div class="flex items-center">
					<div class="w-3/4 space-y-1">
						<div class="flex items-center gap-3">
							<a href="https://icon-sets.iconify.design/" target="_blank"
								><h3 class="text-lg font-semibold text-blue-700 underline hover:text-blue-900">Icon:</h3></a
							>
							<input type="text" bind:value={section.options.icon} class="ml-2 w-5/6 rounded-lg p-1" placeholder="Icon name" />
						</div>
						<div class="flex items-center gap-3">
							<h3 class="text-lg font-semibold">Color:</h3>
							<input
								type="color"
								value={`#${section.options.color}`}
								onchange={(e) => (section.options.color = handleHexInput(e.target.value))}
								class="rounded-lg"
							/>
						</div>
						<div class="flex items-center gap-3">
							<h3 class="text-lg font-semibold">Show:</h3>
							<input type="checkbox" bind:checked={section.options.show} />
						</div>
					</div>
					<div class="mr-auto w-1/4">
						<Icon icon={section.options.icon} style="color: #{section.options.color}" width="fit" />
					</div>
				</div>
			</div>
		{/each}
	</div>
	<hr />
	<div class="space-y-3">
		<div class="flex items-center gap-3">
			<h2 class="min-w-fit text-xl font-bold">Background Color:</h2>
			<input
				type="color"
				value={`#${backgroundColor}`}
				onchange={(e) => (backgroundColor = handleHexInput(e.target.value))}
				class="rounded-lg"
			/>
		</div>
		<div class="space-y-2">
			<div class="flex items-center gap-4">
				<h2 class="min-w-fit text-xl font-bold">Frequency:</h2>
				<input type="number" bind:value={frequency} class="w-20 rounded-lg" />
			</div>
			<div class="flex items-center gap-2">
				<span>100</span>
				<input type="range" min="100" max="800" step="1" bind:value={frequency} class="flex-1" />
				<span>800</span>
			</div>
		</div>
		<div class="space-y-2">
			<div class="flex items-center gap-4">
				<h2 class="min-w-fit text-xl font-bold">Icons Per Row:</h2>
				<input type="number" bind:value={numIconsPerRow} class="w-20 rounded-lg" />
			</div>
			<div class="flex items-center gap-2">
				<span>1</span>
				<input type="range" min="1" max="50" step="1" bind:value={numIconsPerRow} class="flex-1" />
				<span>50</span>
			</div>
		</div>
		<div class="space-y-2">
			<div class="flex items-center gap-4">
				<h2 class="min-w-fit text-xl font-bold">Speed:</h2>
				<input type="number" bind:value={speed} class="w-20 rounded-lg" />
			</div>
			<div class="flex items-center gap-2">
				<span>0</span>
				<input type="range" min="0" max="1" step="0.01" bind:value={speed} class="flex-1" />
				<span>1</span>
			</div>
		</div>
	</div>
</Drawer>
