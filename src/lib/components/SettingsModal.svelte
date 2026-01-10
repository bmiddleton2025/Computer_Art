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

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (openModal) dialog.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (openModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
	class="mx-auto my-auto w-2/3 rounded-lg border-2 border-black bg-gray-400 p-2"
>
	<div class="space-y-2">
		<div class="flex justify-between">
			<h1 class="text-2xl font-semibold">Settings</h1>
			<button onclick={() => dialog.close()}
				><Icon icon="material-symbols:close-rounded" width="30" /></button
			>
		</div>
		<hr />
		<div class="flex">
			<div>
				<h2 class="text-xl font-semibold">Dot</h2>
				<div class="mx-auto flex items-center">
					<div class="justify-between space-y-2">
						<div class="flex justify-between">
							<h3>Select Icon:</h3>
							<input type="text" id="icon" bind:value={dotOptions.icon} class="w-2/3 rounded-lg" />
						</div>
						<div class="flex justify-between">
							<h3>Select Tune:</h3>
							<input type="text" id="tune" bind:value={dotOptions.tune} class="w-2/3 rounded-lg" />
						</div>
						<div class="flex space-x-2">
							<h3>Select Color:</h3>
							<input
								type="color"
								id="colorPicker"
								value={`#${dotOptions.color}`}
								onchange={(e) => (dotOptions.color = e.target.value.slice(1))}
								class="rounded-lg"
							/>
						</div>
					</div>
					<div class="w-1/4">
						<Icon
							icon={dotOptions.icon}
							style="color: #{dotOptions.color}"
							width="fit"
							class="mx-auto"
						/>
					</div>
				</div>
			</div>
			<div>
				<h2 class="text-xl font-semibold">Dash</h2>
				<div class="mx-auto flex items-center">
					<div class="justify-between space-y-2">
						<div class="flex justify-between">
							<h3>Select Icon:</h3>
							<input type="text" id="icon" bind:value={dashOptions.icon} class="w-2/3 rounded-lg" />
						</div>
						<div class="flex justify-between">
							<h3>Select Tune:</h3>
							<input type="text" id="tune" bind:value={dashOptions.tune} class="w-2/3 rounded-lg" />
						</div>
						<div class="flex space-x-2">
							<h3>Select Color:</h3>
							<input
								type="color"
								id="colorPicker"
								value={`#${dashOptions.color}`}
								onchange={(e) => (dashOptions.color = e.target.value.slice(1))}
								class="rounded-lg"
							/>
						</div>
					</div>
					<div class="w-1/4">
						<Icon
							icon={dashOptions.icon}
							style="color: #{dashOptions.color}"
							width="fit"
							class="mx-auto"
						/>
					</div>
				</div>
			</div>
			<div>
				<h2 class="text-xl font-semibold">Space</h2>
				<div class="mx-auto flex items-center">
					<div class="justify-between space-y-2">
						<div class="flex justify-between">
							<h3>Select Icon:</h3>
							<input
								type="text"
								id="icon"
								bind:value={spaceOptions.icon}
								class="w-2/3 rounded-lg"
							/>
						</div>
						<div class="flex space-x-2">
							<h3>Select Color:</h3>
							<input
								type="color"
								id="colorPicker"
								value={`#${spaceOptions.color}`}
								onchange={(e) => (spaceOptions.color = e.target.value.slice(1))}
								class="rounded-lg"
							/>
						</div>
					</div>
					<div class="w-1/4">
						<Icon
							icon={spaceOptions.icon}
							style="color: #{spaceOptions.color}"
							width="fit"
							class="mx-auto"
						/>
					</div>
				</div>
			</div>
		</div>
		<hr />
		<div class="flex items-center space-x-2">
			<h2 class="text-xl font-semibold">Background Color:</h2>
			<input
				type="color"
				id="colorPicker"
				value={`#${backgroundColor}`}
				onchange={(e) => (backgroundColor = e.target.value.slice(1))}
				class="rounded-lg"
			/>
		</div>
		<div class="flex items-center space-x-2">
			<h2 class="text-xl font-semibold">Speed:</h2>
			<p>0</p>
			<input type="range" min="0" max="1" step="0.1" bind:value={speed} />
			<p>1</p>
		</div>
		<div class="flex items-center space-x-2">
			<h2 class="text-xl font-semibold">Pixels Per Row:</h2>
			<p>1</p>
			<input type="range" min="1" max="50" value={numBoxesPerRow} />
			<p>50</p>
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
