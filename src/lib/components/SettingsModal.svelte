<script>
	import Icon from '@iconify/svelte';

	let {
		openModal = $bindable(),
		numBoxesPerRow = $bindable(),
		speed = $bindable(),
		dotOptions = $bindable({
			color: 'ff0000',
			icon: 'material-symbols:square-rounded',
			tune: 'C4'
		}),
		dashOptions = $bindable({
			color: '0000ff',
			icon: 'material-symbols:square-rounded',
			tune: 'C4'
		}),
		spaceOptions = $bindable({
			color: '000000',
			icon: 'material-symbols:square-rounded'
		}),
		backgroundColor = $bindable('000000')
	} = $props();

	let dialog = $state();

	function closeModal() {
		dialog.close();
	}

	function handleBackdropClick(e) {
		if (e.target === dialog) dialog.close();
	}

	function handleHexInput(value) {
		return value.slice(1);
	}

	$effect(() => {
		if (openModal) dialog.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (openModal = false)}
	onclick={handleBackdropClick}
	class="mx-auto my-auto w-2/3 rounded-lg border-2 border-black bg-gray-400 p-2"
>
	<div class="space-y-2">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold">Settings</h1>
			<button onclick={closeModal} aria-label="Close settings">
				<Icon icon="material-symbols:close-rounded" width="30" />
			</button>
		</div>
		<hr />
		<div class="justify-evenly lg:flex">
			{#each [{ title: 'Dot', options: dotOptions, hasTune: true }, { title: 'Dash', options: dashOptions, hasTune: true }, { title: 'Space', options: spaceOptions, hasTune: false }] as section (section.title)}
				<div>
					<h2 class="text-xl font-semibold">{section.title}</h2>
					<div class="flex items-center justify-around">
						<div class="space-y-2">
							<div class="flex justify-between">
								<h3>Select Icon:</h3>
								<input
									type="text"
									bind:value={section.options.icon}
									class="w-2/3 rounded-lg"
									placeholder="Icon name"
								/>
							</div>
							{#if section.hasTune}
								<div class="flex justify-between">
									<h3>Select Tune:</h3>
									<input
										type="text"
										bind:value={section.options.tune}
										class="w-1/3 rounded-lg"
										placeholder="Tune"
									/>
								</div>
							{/if}
							<div class="flex items-center justify-between">
								<h3>Select Color:</h3>
								<input
									type="color"
									value={`#${section.options.color}`}
									onchange={(e) => (section.options.color = handleHexInput(e.target.value))}
									class="rounded-lg"
								/>
							</div>
						</div>
						<div class="w-1/4">
							<Icon
								icon={section.options.icon}
								style="color: #{section.options.color}"
								width="fit"
								class="mx-auto"
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<hr />
		<div class="space-y-3">
			<div class="flex items-center gap-4">
				<h2 class="min-w-fit text-xl font-semibold">Background Color:</h2>
				<input
					type="color"
					value={`#${backgroundColor}`}
					onchange={(e) => (backgroundColor = handleHexInput(e.target.value))}
					class="rounded-lg"
				/>
			</div>
			<div class="space-y-2">
				<div class="flex items-center gap-4">
					<h2 class="min-w-fit text-xl font-semibold">Pixels Per Row:</h2>
					<input type="number" bind:value={numBoxesPerRow} class="w-20 rounded-lg" />
				</div>
				<div class="flex items-center gap-2">
					<span>1</span>
					<input
						type="range"
						min="1"
						max="50"
						step="1"
						bind:value={numBoxesPerRow}
						class="flex-1"
					/>
					<span>50</span>
				</div>
			</div>
			<div class="space-y-2">
				<div class="flex items-center gap-4">
					<h2 class="min-w-fit text-xl font-semibold">Speed:</h2>
					<input type="number" bind:value={speed} class="w-20 rounded-lg" />
				</div>
				<div class="flex items-center gap-2">
					<span>0</span>
					<input type="range" min="0" max="1" step="0.01" bind:value={speed} class="flex-1" />
					<span>1</span>
				</div>
			</div>
		</div>
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
