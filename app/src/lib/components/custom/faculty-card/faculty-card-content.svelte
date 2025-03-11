<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';

	import { goto } from '$app/navigation';

	let { facultyName, departments } = $props();
	const navigateToTable = (department_id: string) => {
		goto(`${department_id}/members`);
	};
</script>

<div class="mb-6 space-y-3 text-center">
	<h3 class="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
		{`Faculty of ${facultyName}`}
	</h3>
	<div
		class="h-[2px] w-full bg-gradient-to-r from-transparent via-gray-200/80 to-transparent dark:via-gray-700/50"
	></div>
</div>

<div class="pl-2">
	<ul class="space-y-1 sm:space-y-4">
		{#each departments as department}
			<li>
				<div
					tabindex="0"
					role="button"
					onkeypress={() => navigateToTable(department.id)}
					onclick={() => navigateToTable(department.id)}
					class="relative flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-300 hover:bg-gray-200/40 hover:pl-6 focus:ring-2 focus:ring-gray-300/30 focus:outline-none active:bg-gray-100/50 active:pl-6 sm:duration-200 dark:hover:bg-gray-800/30 dark:focus:ring-gray-600/30 dark:active:bg-gray-800/30"
				>
					<div class="absolute left-2 h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>

					<span class="pl-2 text-gray-700 transition-colors dark:text-gray-300">
						{department.name}
					</span>
					<ArrowRight
						class="h-4 w-4 -translate-x-2 text-gray-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-active:translate-x-0 group-active:opacity-100 dark:text-gray-500"
					/>
				</div>
			</li>
		{/each}
	</ul>
</div>
