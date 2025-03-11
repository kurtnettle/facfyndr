<script lang="ts">
	import { Spring } from 'svelte/motion';

	import type { DepartmentInfoMissingStats } from './department-card-interfaces';
	import { getCappedProgress, getProgressColor } from './department-card-utils';
	import ProgressTextHoverCard from './progressbar-text.svelte';

	const { missingStats = { telephone: 0, email: 0, room: 0, percentage: 0, totalMembers: 0 } } =
		$props<{
			missingStats: DepartmentInfoMissingStats;
		}>();

	let progressSpring = new Spring(0, { damping: 0.7, stiffness: 0.07 });
	let cappedProgress = $derived(getCappedProgress(missingStats?.percentage));
	let progressColor = $derived(getProgressColor(cappedProgress));

	$effect(() => {
		progressSpring.set(cappedProgress);
	});
</script>

<div class="flex flex-col">
	<div class="flex items-center justify-between gap-2">
		<div
			class="h-1 max-w-full flex-1 rounded-full bg-gray-200"
			role="progressbar"
			aria-valuenow={cappedProgress}
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<div
				class="h-full rounded-full"
				style={`width: ${progressSpring.current}%; background-color: ${progressColor};`}
			></div>
		</div>

		<ProgressTextHoverCard {missingStats} />
	</div>
</div>
