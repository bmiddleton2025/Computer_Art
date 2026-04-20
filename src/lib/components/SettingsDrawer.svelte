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

	/**
	 * Extracts the hex color code from an HTML color input value
	 * Removes the leading '#' character from the color picker's output
	 * @param {string} value - The color value from the input element (e.g., '#ff0000')
	 * @returns {string} The hex color code without the '#' (e.g., 'ff0000')
	 */
	function handleHexInput(value) {
		return value.slice(1);
	}
</script>

<Drawer
	bind:open={openDrawer}
	placement="right"
	class="w-80 space-y-3 border-2 border-black bg-gray-400 transition duration-300 text-shadow-none sm:w-90"
>
	<h1 class="text-2xl font-bold">Settings</h1>
	<hr />
	<div class="space-y-3">
		{#each [{ title: 'Dot / 0', options: dotOptions }, { title: 'Dash / 1', options: dashOptions }, { title: 'Space', options: spaceOptions }] as section (section.title)}
			<div>
				<h2 class="text-lg font-bold sm:text-xl">{section.title}</h2>
				<div class="flex space-y-3 sm:flex sm:items-center">
					<div class="w-full space-y-1 sm:w-3/4">
						<div class="flex items-center gap-6">
							<a href="https://icon-sets.iconify.design/" target="_blank"
								><h3 class="text-base font-semibold text-blue-700 underline hover:text-blue-900 sm:text-lg">Icon:</h3></a
							>
							<input type="text" bind:value={section.options.icon} class="w-5/6 w-full rounded-lg p-2" placeholder="Icon name" />
						</div>
						<div class="flex items-center gap-3">
							<h3 class="text-base font-semibold sm:text-lg">Color:</h3>
							<input
								type="color"
								value={`#${section.options.color}`}
								onchange={(e) => (section.options.color = handleHexInput(e.target.value))}
								class="h-12 w-full cursor-pointer rounded-lg sm:h-8"
							/>
						</div>
						<div class="flex items-center gap-3">
							<h3 class="text-base font-semibold sm:text-lg">Show:</h3>
							<input type="checkbox" bind:checked={section.options.show} class="h-5 w-5 cursor-pointer" />
						</div>
					</div>
					<div class="mr-auto hidden w-1/4 sm:block">
						<Icon icon={section.options.icon} style="color: #{section.options.color}" width="fit" />
					</div>
				</div>
			</div>
		{/each}
	</div>
	<hr />
	<div class="space-y-3">
		<div class="flex gap-2 sm:flex-row sm:items-center sm:gap-3">
			<h2 class="min-w-fit text-base font-bold sm:text-xl">Background Color:</h2>
			<input
				type="color"
				value={`#${backgroundColor}`}
				onchange={(e) => (backgroundColor = handleHexInput(e.target.value))}
				class="w-full cursor-pointer rounded-lg"
			/>
		</div>
		<div class="space-y-2">
			<div class="flex gap-2 sm:flex-row sm:items-center sm:gap-4">
				<h2 class="min-w-fit text-base font-bold sm:text-xl">Frequency:</h2>
				<input type="number" bind:value={frequency} class="mr-0 ml-auto w-full rounded-lg p-2 sm:w-20 sm:p-1" />
			</div>
			<div class="flex items-center gap-2 text-sm">
				<span>100</span>
				<input type="range" min="100" max="800" step="1" bind:value={frequency} class="flex-1" />
				<span>800</span>
			</div>
		</div>
		<div class="space-y-2">
			<div class="flex gap-2 sm:flex-row sm:items-center sm:gap-4">
				<h2 class="min-w-fit text-base font-bold sm:text-xl">Icons Per Row:</h2>
				<input type="number" bind:value={numIconsPerRow} class="mr-0 ml-auto w-full rounded-lg p-2 sm:w-20 sm:p-1" />
			</div>
			<div class="flex items-center gap-2 text-sm">
				<span>1</span>
				<input type="range" min="1" max="50" step="1" bind:value={numIconsPerRow} class="flex-1" />
				<span>50</span>
			</div>
		</div>
		<div class="space-y-2">
			<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
				<h2 class="min-w-fit text-base font-bold sm:text-xl">Speed:</h2>
				<input type="number" bind:value={speed} class="mr-0 ml-auto w-full rounded-lg p-2 sm:w-20 sm:p-1" />
			</div>
			<div class="flex items-center gap-2 text-sm">
				<span>0</span>
				<input type="range" min="0" max="1" step="0.01" bind:value={speed} class="flex-1" />
				<span>1</span>
			</div>
		</div>
	</div>
</Drawer>
