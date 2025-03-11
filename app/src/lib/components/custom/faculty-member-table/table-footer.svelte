<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let {
		state,
		rowCount,
		pageCount,
		filteredRowCount,
		previousPage,
		canPreviousPage,
		nextPage,
		canNextPage
	} = $props();
</script>

<section>
	<div class="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
		<!-- Selected Rows Info -->
		<div class="text-sm text-gray-600 dark:text-gray-400">
			Showing
			<span class="font-semibold text-gray-800 dark:text-gray-200">{filteredRowCount}</span>
			of
			<span class="font-semibold text-gray-800 dark:text-gray-200">{rowCount}</span> faculty member(s).
		</div>

		<!-- Pagination Controls -->
		<div class="flex items-center gap-3">
			<!-- Previous Button -->
			<button
				class="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700/40"
				onclick={() => previousPage()}
				disabled={!canPreviousPage()}
				aria-label="Previous Page"
			>
				<ChevronLeft class="h-4 w-4" />
				<span>Previous</span>
			</button>

			<!-- Page Indicator -->
			<div class="text-sm text-gray-600 dark:text-gray-400">
				Page <span class="font-semibold text-gray-800 dark:text-gray-200"
					>{state().pagination.pageIndex + 1}</span
				>
				of
				<span class="font-semibold text-gray-800 dark:text-gray-200">{pageCount}</span>
			</div>

			<!-- Next Button -->
			<button
				class="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700/40"
				onclick={() => nextPage()}
				disabled={!canNextPage()}
				aria-label="Next Page"
			>
				<span>Next</span>
				<ChevronRight class="h-4 w-4" />
			</button>
		</div>
	</div>
</section>
