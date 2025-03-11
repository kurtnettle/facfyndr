<script lang="ts">
	import { Spring } from 'svelte/motion';

	let { memberStats } = $props();

	const defaultVal = { total: 0, lecturers: 0, assistant_professors: 0, study_leave: 0 };
	let memberStatsSpring = new Spring(defaultVal, {
		damping: 0.9,
		stiffness: 0.07
	});

	$effect(() => {
		if (memberStats) memberStatsSpring.set(memberStats);
	});
</script>

<div class="py-24 sm:py-32">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="space-y-4 text-center">
				<h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl dark:text-white">
					Our Guiding Lights
				</h2>
			</div>
			<dl
				class="mt-12 grid grid-cols-1 gap-1.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4 dark:text-white"
			>
				{#each Object.entries(memberStatsSpring.current) as [key, value]}
					<div
						class="flex flex-col border border-zinc-100 bg-gray-200/40 p-6 sm:p-8 dark:border-0 dark:bg-zinc-800/20"
					>
						<dt class="text-sm leading-6 font-semibold dark:text-gray-300">
							{key.replace('_', ' ')}
						</dt>
						<dd class="order-first text-3xl font-semibold tracking-tight dark:text-white">
							{value.toFixed(0)}
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</div>
