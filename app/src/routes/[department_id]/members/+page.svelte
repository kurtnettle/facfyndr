<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	import { page } from '$app/state';
	import { getProfileUrl } from '$lib/components/custom/faculty-member-card/faculty-member-utils';
	import { FacultyMemberTable } from '$lib/components/custom/faculty-member-table';
	import Spinner from '$lib/components/custom/layout/spinner.svelte';
	import type { FacultyMember } from '$lib/types/db';

	let elapsedTime = 0;
	let isLoading = $state(true);
	let data = $state({ department_id: page.params.department_id });

	onMount(async () => {
		const startTime = Date.now();

		try {
			const resp = await fetch(
				`/api/department/members?department_id=${page.params.department_id}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json'
					}
				}
			);

			if (resp.ok) {
				const json = await resp.json();
				json.members = json.members.map((member: FacultyMember) => ({
					...member,
					profile_url: getProfileUrl(member.department_id, member.profile_url)
				}));

				data = { ...data, ...json };
			} else {
				const msg = 'Failed to get faculty members.';
				toast.error(msg);
				console.error(`${msg}: ${resp.statusText}`);
			}
			elapsedTime = Date.now() - startTime;
		} catch (err) {
			toast.error('Failed to get faculty members.');
			console.error(err);
		} finally {
			// fix loader overlay flickering
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
