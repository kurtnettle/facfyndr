<script lang="ts">
	import { CircleX, UserRoundSearch } from 'lucide-svelte';

	import { Input } from '$lib/components/ui/input/index.js';

	let { filterValue, onFilter } = $props();
</script>

<div class="group relative">
	<div class="relative ml-auto sm:max-w-xs">
		<!-- Search Icon -->
		<UserRoundSearch
			class="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-gray-500 dark:text-gray-500 dark:group-focus-within:text-gray-400"
		/>

		<!-- Input Field -->
		<Input
			type="text"
			placeholder="Filter members..."
			aria-label="Filter faculty member"
			bind:value={filterValue}
			oninput={(e) => onFilter(e.currentTarget.value)}
			class="rounded-lg border border-gray-200 bg-white/65 py-2.5 pr-4 pl-10 text-sm shadow-sm transition-colors placeholder:text-gray-400
			 hover:border-gray-300 focus:border-blue-500  focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-700 
			 dark:bg-zinc-800/60 dark:placeholder:text-gray-500 dark:hover:border-gray-600 dark:focus:border-blue-600 dark:focus:ring-blue-600"
		/>

		<!-- Clear Button -->
		{#if filterValue}
			<button
				onclick={() => onFilter('')}
				class="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700/50 dark:hover:text-gray-400"
				aria-label="Clear filter input"
			>
				<CircleX class="size-4.5 text-current" />
			</button>
		{/if}
	</div>
</div>
