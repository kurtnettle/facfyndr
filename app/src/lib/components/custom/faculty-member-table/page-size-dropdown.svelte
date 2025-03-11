<script lang="ts">
	import { ChevronRightIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	let { setPageSize } = $props();

	const options = [5, 10, 20, 50];
	let selectedOption = $state(10);

	function handleSelect(value: number = 0): void {
		selectedOption = value;
		try {
			setPageSize(value);
		} catch (err) {
			toast.error('Failed to set page size.');
			console.error(err);
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={buttonVariants({ variant: 'outline' }) +
			' group bg-white/60 text-gray-700 hover:bg-white/80 dark:bg-zinc-800/60 dark:hover:bg-zinc-800/90'}
	>
		<div class="flex items-center gap-1.5">
			<span class="hidden font-medium text-gray-600 opacity-80 sm:inline dark:text-gray-300">
				Faculties
			</span>
			<span class="hidden text-gray-400 sm:inline dark:text-gray-500">/</span>
			<span class="font-semibold dark:text-gray-100">{selectedOption}</span>
			<ChevronRightIcon
				class="group-data-[state=open]:text-primary-600 group-data-[state=open]:dark:text-primary-400 ml-1 h-4 w-4 text-gray-600 transition-all duration-200 group-data-[state=open]:rotate-90 dark:text-gray-400"
			/>
		</div>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content
		class="mt-1 ml-1 w-48 rounded-md border border-gray-200 bg-gray-50/80 shadow-lg backdrop-blur-lg dark:border-zinc-700 dark:bg-zinc-900/75"
		sideOffset={5}
	>
		<DropdownMenu.Group>
			{#each options as option}
				<DropdownMenu.Item
					onSelect={() => {
						handleSelect(option);
					}}
					class="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
				>
					{option}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
