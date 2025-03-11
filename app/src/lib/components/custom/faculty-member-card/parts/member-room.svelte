<script lang="ts">
	import { CircleHelp, ExternalLink } from 'lucide-svelte';

	import * as HoverCard from '$lib/components/ui/hover-card/index.js';

	let { building, room } = $props();

	let isEnabled = $derived(['2', '3'].includes(building));

	const buildingNames: Record<string, string> = {
		'2': 'Sujan Mahmud Building (শহীদ সুজন মাহমুদ ভবন)',
		'3': 'Tahmid Abdullah Building (শহীদ তাহমিদ আব্দুল্লাহ ভবন)'
	};

	const buildingAcronym: Record<string, string> = {
		'2': 'MSM',
		'3': 'MTA'
	};

	let isOpen = $state(false);

	const bName = $state(buildingNames[building] || 'N/A');
	const bAcrym = $state(buildingAcronym[building] || undefined);
</script>

<!-- param:disabled not working, idk why. So have to use this stupid way if-else -->
{#if isEnabled}
	<div
		ontouchstart={() => (isOpen = !isOpen)}
		ontouchend={() => (isOpen = false)}
		ontouchmove={() => (isOpen = false)}
		ontouchcancel={() => (isOpen = false)}
	>
		<HoverCard.Root bind:open={isOpen}>
			<HoverCard.Trigger>
				<div
					class="flex cursor-help flex-wrap items-center justify-between space-x-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-700 active:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 dark:active:text-gray-200"
				>
					<span class="inline-flex items-baseline gap-0.5">
						Building
						{#if bAcrym}
							{bAcrym}
							<CircleHelp class="relative top-0.5 size-3.5" />
						{:else}
							{building || 'N/A'}
						{/if}
					</span>
					<span>
						• Room {room || 'N/A'}
					</span>
				</div>
			</HoverCard.Trigger>
			<HoverCard.Content
				class="mx-2 mt-1 w-full max-w-xs rounded-xl bg-white/40 p-5 shadow-xl ring-1 ring-gray-200/50 backdrop-blur-lg transition-opacity sm:mx-0 sm:mt-0 sm:max-w-sm dark:bg-zinc-900/85 dark:ring-gray-700/50"
			>
				<div class="flex flex-col space-y-3">
					<h3 class="text-lg font-bold text-gray-900 dark:text-gray-50">
						Renaming in Remembrance
						<div class="mt-2 h-1 w-8 rounded-full bg-blue-500/80 dark:bg-blue-600/90"></div>
					</h3>
					<p class="text-sm leading-6 font-normal text-gray-700 dark:text-gray-300">
						Building {building} is renamed as Martyred {bName} considering their valiant role and sacrifice
						of life during the quota movement of students for the Second Independence of Bangladesh.
					</p>
					<div class="pt-2">
						<a
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md dark:bg-blue-700 dark:hover:bg-blue-600"
							href="https://www.bubt.edu.bd/home/notice_details/1185"
						>
							View Official Notice
							<ExternalLink class="inline-block h-4 w-4 stroke-[2.5]" />
						</a>
					</div>
				</div>
			</HoverCard.Content>
		</HoverCard.Root>
	</div>
{:else}
	<span class="group text-sm font-medium transition-colors hover:text-gray-900">
		<span
			class="text-gray-600 transition-colors group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-200"
		>
			Building {building || 'N/A'} • Room {room || 'N/A'}
		</span>
	</span>
{/if}
