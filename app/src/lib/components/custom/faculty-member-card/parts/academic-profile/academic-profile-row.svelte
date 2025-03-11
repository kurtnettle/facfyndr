<script>
	import { AcademicProfileItem } from '$lib/components/custom/faculty-member-card/index';
	let { links = [] } = $props();
</script>

<div class="flex flex-nowrap gap-1 py-0.5 sm:gap-2">
	{#each links as link}
		<AcademicProfileItem profileUrl={link} />
	{/each}
</div>
