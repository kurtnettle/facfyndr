<script lang="ts">
	import { CircleMinus, CirclePlus, EllipsisVerticalIcon, Plus } from 'lucide-svelte';
	import { type Writable, writable } from 'svelte/store';

	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { ContactInfo } from '$lib/types/db/contact-info';

	import { contactType } from '../report-form-schema';
	import {
		addContactItem,
		deleteContactItem,
		unwrapContacts,
		updateContactType,
		updateContactValue,
		wrapContacts
	} from '../utils';

	let { data = $bindable(), isEmail = true } = $props<{ data: ContactInfo; isEmail: boolean }>();

	const transformedData: Writable<{ type: string; value: string }[]> = writable([]);
	transformedData.set(unwrapContacts(data));
	transformedData.subscribe((newTransformedData) => {
		data = wrapContacts(newTransformedData);
	});

	function handleInputChange(index: number, value: string) {
		if (!value) return;

		updateContactValue(transformedData, index, value);
	}

	function handleAddItem() {
		addContactItem(transformedData);
	}

	function handleDeleteItem(index: number) {
		deleteContactItem(transformedData, index);
	}
</script>

{#if $transformedData.length}
	{#each $transformedData as item, index}
		<div class="flex gap-1 py-0.5 sm:flex-row">
			<Input
				type={isEmail ? 'email' : 'text'}
				placeholder={`Enter the ${isEmail ? 'email' : 'number'}`}
				value={item.value}
				oninput={(e) => handleInputChange(index, e.currentTarget.value)}
			/>
			<div class="flex flex-row gap-0.5">
				<Select.Root
					type="single"
					onValueChange={(e) => updateContactType(transformedData, index, e)}
				>
					<Select.Trigger class="min-w-26">{item.type}</Select.Trigger>
					<Select.Content>
						{#each Object.values(contactType) as item}
							<Select.Item
								class="hover:bg-gray-200 dark:hover:bg-zinc-800"
								value={item}
								label={item}
							/>
						{/each}
					</Select.Content>
				</Select.Root>

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
				<span class="text-sm font-medium">Add {isEmail ? 'Email' : 'Number'}</span>
			</span>
		</Button>
	</div>
{/if}
