<script lang="ts">
	import { CircleMinus, CirclePlus, EllipsisVerticalIcon, Plus } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	let { data = $bindable() } = $props();

	let localData = writable<string[]>(data);
	localData.subscribe((newData) => {
		data = newData;
	});

	function handleInputChange(index: number, value: string) {
		if (!value) return;

		localData.update((currentData) => {
			const newData = [...currentData];
			newData[index] = value;
			return newData;
		});
	}

	function handleAddItem() {
		localData.update((i) => {
			if (i.length === 0 || i[i.length - 1].trim() !== '') {
				return [...i, ''];
			}
			return i;
		});
	}

	function handleDeleteItem(index: number) {
		localData.update((currentData) => {
			const newData = [...currentData];
			newData.splice(index, 1);
			return newData;
		});
	}
</script>

{#if $localData.length}
	{#each $localData as item, index}
		<div class="flex gap-1 py-0.5 sm:flex-row sm:py-1">
			<Input
				type="url"
				placeholder="Enter profile URL"
				value={item}
				oninput={(e) => handleInputChange(index, e.currentTarget.value)}
			/>
			<div class="flex flex-row gap-0.5">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<EllipsisVerticalIcon class="size-5" aria-label="More options" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item onclick={handleAddItem}>
								<CirclePlus /> Add
							</DropdownMenu.Item>
							<DropdownMenu.Item onclick={() => handleDeleteItem(index)}>
								<CircleMinus /> Remove
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	{/each}
{:else}
	<div
		class="flex justify-center rounded-lg border-2 border-dashed border-gray-200 py-2.5 transition-colors hover:border-gray-300"
	>
		<Button
			class="w-full sm:w-auto"
			variant="ghost"
			onclick={handleAddItem}
			aria-label="Add Contact"
		>
			<span class="flex items-center gap-2 text-gray-700 transition dark:text-gray-200">
				<Plus class="size-4 shrink-0 text-gray-400 transition-colors dark:text-gray-500" />
				<span class="text-sm font-medium">Add Profile</span>
			</span>
		</Button>
	</div>
{/if}
