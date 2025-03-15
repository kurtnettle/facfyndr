<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	import { page } from '$app/state';
	import { FacultyMemberTable } from '$lib/components/custom/faculty-member-table';
	import Spinner from '$lib/components/custom/layout/spinner.svelte';
	import { DeptUtils } from '$lib/utils';

	let isLoading = $state(true);
	const department_id = page.params.department_id;
	let data = $state({ department_id: department_id, members: [], modified_at: -1 });

	onMount(async () => {
		const startTime = Date.now();

		try {
			const { members, modified_at } = await DeptUtils.fetchAndCacheDeptData(department_id);
			data = { department_id, members, modified_at };
		} catch (err) {
			toast.error('Failed to get faculty members.');
			console.error(err);
		} finally {
			// fix loader overlay flickering
			const elapsedTime = Date.now() - startTime;
			setTimeout(
				() => {
					isLoading = false;
				},
				Math.max(0, 250 - elapsedTime)
			);
		}
	});
</script>

{#if isLoading}
	<Spinner />
{/if}
<div class="mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
	<FacultyMemberTable {data} />
</div>
