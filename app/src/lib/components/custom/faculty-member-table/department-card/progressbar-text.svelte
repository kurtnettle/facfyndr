<script lang="ts">
	import { Spring } from 'svelte/motion';

	import * as HoverCard from '$lib/components/ui/hover-card/index.js';

	import type { DepartmentInfoMissingStats } from './department-card-interfaces';
	import { getCappedProgress, getProgressColor } from './department-card-utils';

	const props = $props<{ missingStats: DepartmentInfoMissingStats }>();
	let isOpen = $state(false);

	let percentageSpring = new Spring(0, { damping: 0.7, stiffness: 0.07 });
	$effect(() => {
		percentageSpring.set(props.missingStats.percentage);
	});
</script>

<div
	ontouchstart={() => (isOpen = !isOpen)}
	ontouchend={() => (isOpen = false)}
	ontouchmove={() => (isOpen = false)}
	ontouchcancel={() => (isOpen = false)}
>
	<HoverCard.Root bind:open={isOpen}>
		<HoverCard.Trigger>
			<div
				class="cursor-help rounded-full border bg-transparent px-1 py-0.5 text-xs font-medium select-none sm:rounded-xl sm:px-2 sm:py-1 sm:text-sm dark:border-zinc-700 dark:text-white"
			>
				{percentageSpring.current.toFixed(0) ?? 0}%
			</div>
		</HoverCard.Trigger>
		<HoverCard.Content
			collisionPadding={4}
			class="max-w-ws w-full rounded-xl bg-white/40 p-4 shadow-xl ring-1 ring-gray-200/50 backdrop-blur-lg transition-opacity sm:max-w-sm dark:bg-zinc-900/85 dark:ring-gray-700/50"
		>
			<div class="flex flex-col space-y-3">
				<h3 class="text-lg font-bold text-gray-900 dark:text-gray-50">
					Info Completion Status
					<div class="mt-1 h-1 w-12 rounded-lg bg-blue-500/80 dark:bg-blue-600/90"></div>
				</h3>
				<div
					class="flex flex-col space-y-1.5 text-sm text-gray-800 sm:space-y-2 dark:text-gray-300"
				>
					{#each Object.entries(props.missingStats) as Array<[keyof DepartmentInfoMissingStats, number]> as [key, val]}
						{@const percentage = Math.ceil(
							((props.missingStats.totalMembers - val) / props.missingStats.totalMembers) * 100
						)}

						{#if !['totalMembers', 'percentage'].includes(key)}
							<div class="flex flex-col space-y-0.5 sm:space-y-1">
								<div class="flex flex-row items-center justify-between">
									<span class="pr-2 text-gray-600 dark:text-gray-400">
										{key}
									</span>
									<span class="font-semibold text-gray-900 dark:text-gray-50">
										{props.missingStats.totalMembers - val} / {props.missingStats.totalMembers}
										<span class="font-normal text-gray-500 dark:text-gray-400">
											({getCappedProgress(percentage)}%)
										</span>
									</span>
								</div>

								<div class="h-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
									<div
										class="h-full rounded-lg"
										style={`width: ${getCappedProgress(percentage)}%; background-color: ${getProgressColor(percentage)};`}
									></div>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</HoverCard.Content>
	</HoverCard.Root>
</div>
