<script lang="ts">
	import {
		type ColumnDef,
		type ColumnFiltersState,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		type PaginationState
	} from '@tanstack/table-core';

	import FacultyMemberCard from '$lib/components/custom/faculty-member-card/faculty-member-card.svelte';
	import { createSvelteTable } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { type FacultyMember } from '$lib/types/db';

	import { DepartmentCard, PageSizeDropdown, TableFilterInput, TableFooter } from '.';
	import { fuzzyFilter } from './utils';

	const data = $props();

	const columns: ColumnDef<FacultyMember>[] = [
		{
			id: 'card',
			header: '',
			cell: ({ row }) => row.original,
			footer: (props) => props.column.id,
			filterFn: fuzzyFilter
		}
	];

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let columnFilters = $state<ColumnFiltersState>([]);

	/**
		Empty data causes infinite looping
		https://github.com/TanStack/table/issues/4566
	*/
	const emptyArray: FacultyMember[] = [];

	const table = createSvelteTable({
		get data() {
			return data.data.members ?? emptyArray;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get columnFilters() {
				return columnFilters;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			pagination = typeof updater === 'function' ? updater(pagination) : updater;
		},
		onColumnFiltersChange: (updater) => {
			columnFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
		}
	});
</script>

<div class="mb-8 p-2">
	<DepartmentCard data={data.data} />
</div>

<div class="flex flex-row justify-between p-2">
	<PageSizeDropdown setPageSize={table.setPageSize} />

	<TableFilterInput
		filterValue={table.getColumn('card')?.getFilterValue() as string}
		onFilter={(value: string) => table.getColumn('card')?.setFilterValue(value)}
	/>
</div>

<Table.Root>
	<Table.Body>
		{#each table.getRowModel().rows as row (row.id)}
			<Table.Row class="border-0 bg-transparent hover:bg-transparent">
				{#each row.getVisibleCells() as cell (cell.id)}
					<Table.Cell>
						<FacultyMemberCard member={row.original} />
					</Table.Cell>
				{/each}
			</Table.Row>
		{:else}
			<Table.Row>
				<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>

<TableFooter
	state={table.getState}
	rowCount={table.getPreFilteredRowModel().rows.length}
	pageCount={table.getPageCount()}
	filteredRowCount={table.getFilteredRowModel().rows.length}
	previousPage={table.previousPage}
	canPreviousPage={table.getCanPreviousPage}
	nextPage={table.nextPage}
	canNextPage={table.getCanNextPage}
/>
