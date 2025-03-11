<script lang="ts">
	import { DepartmentMeta } from '$lib/constants/academic';

	import { DepartmentCardProgressBar } from '..';
	import type { DepartmentCardProps } from './department-card-interfaces';
	import {
		formatDate,
		getDepartmentMeta,
		getDepartmentMissingInfoStats
	} from './department-card-utils';

	const { data } = $props<{ data: DepartmentCardProps }>();

	let departmentName = $derived(DepartmentMeta[data.department_id].name || 'Unknown');
	let lastUpdatedTime = $derived(formatDate(data.modified_at));
	let facultyCount = $derived(data.members?.length ?? 0);
	let missingStats = $derived(getDepartmentMissingInfoStats(data?.members ?? []));
	let deptMeta = $derived(getDepartmentMeta(data?.department_id));
</script>

<section
	class="group relative w-full rounded-xl border bg-white/40 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl active:scale-[0.98] sm:rounded-2xl dark:bg-zinc-800/40 dark:hover:border-blue-800/50 dark:active:border-blue-800/50"
>
	<div class="p-5 sm:p-6 lg:p-7">
		<div class="space-y-4">
			<div class="flex items-center gap-4 sm:gap-5 lg:gap-6">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-200/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:ring-2 group-hover:ring-blue-100 group-active:-translate-y-1 group-active:shadow-md group-active:ring-2 group-active:ring-blue-100 sm:h-16 sm:w-16 sm:rounded-2xl dark:bg-zinc-900/60 dark:ring-blue-800/60 dark:group-hover:ring-blue-800/75 dark:group-active:ring-blue-800/75"
				>
					<deptMeta.logo
						size="32"
						class="h-6 w-6 text-blue-600 sm:h-7 sm:w-7 dark:text-blue-300/90"
						aria-hidden="true"
					/>
				</div>

				<!-- Content -->
				<div class="flex flex-1 flex-col gap-2.5">
					<div class="space-y-2">
						<h1
							class="text-2xl font-bold tracking-tight text-gray-800 transition-colors sm:text-3xl lg:text-[32px] dark:text-gray-50/95 hover:dark:text-blue-300"
						>
							<a
								href={deptMeta.link}
								target="_blank"
								rel="noopener noreferrer"
								title="Visit Department Members"
								aria-label="Visit Department Members">{departmentName}</a
							>
						</h1>
						<div class="flex items-center gap-2">
							<span
								class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-900 sm:text-base dark:bg-blue-900/30 dark:text-blue-300"
							>
								<span class="mr-2 text-blue-600 dark:text-blue-300">•</span>
								{facultyCount} Faculty Members
							</span>
						</div>
					</div>
				</div>
			</div>

			<div>
				<DepartmentCardProgressBar {missingStats} />
			</div>

			<div class="flex items-center gap-1.5">
				<span class="text-sm font-medium text-gray-500/90 dark:text-gray-400/90">
					Last updated:
				</span>
				<span class="text-sm text-gray-600/90 dark:text-gray-300/90">
					{lastUpdatedTime}
				</span>
			</div>
		</div>
	</div>
</section>
