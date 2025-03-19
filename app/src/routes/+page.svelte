<script lang="ts">
	import { onMount } from 'svelte';

	import { MemberStatistics } from '$lib/components/custom/components';
	import {
		BrowseAllCard,
		FacultyCard,
		FacultyCardContainer
	} from '$lib/components/custom/faculty-card';
	import FacultyDepartments from '$lib/constants/academic';

	let memberStats = $state();
	onMount(async () => {
		const resp = await fetch('/api/department/members');
		if (resp.ok) {
			const json = await resp.json();
			memberStats = json;
		}
	});
</script>

<svelte:head>
	<title>FacFyndr</title>
</svelte:head>

<main class="min-h-[80vh]">
	<div class="mb-8 space-y-4 text-center">
		<h2
			class="mt-20 px-2 text-center text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl dark:text-gray-100"
		>
			Explore Faculty Members Effortlessly
			<img
				class="inline size-6 align-middle sm:size-10"
				src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp"
				alt="🚀"
				loading="lazy"
			/>
		</h2>
		<p class="px-4 text-center text-base leading-8 text-gray-600 sm:text-lg dark:text-gray-300">
			A community-driven faculty directory of BUBT
		</p>
	</div>
	<div class="flex items-center justify-center">
		<div class="m-4 grid grid-cols-1 gap-6 transition-all sm:grid-cols-2">
			{#each Object.entries(FacultyDepartments) as [faculty, departments]}
				<FacultyCard facultyName={faculty} {departments} />
			{/each}

			<FacultyCardContainer>
				<BrowseAllCard />
			</FacultyCardContainer>
		</div>
	</div>

	<MemberStatistics {memberStats} />
</main>
