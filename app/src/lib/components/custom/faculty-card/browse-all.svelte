<script>
	import { ChevronRight } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
</script>

<div class="group flex items-start gap-4">
	<!-- Content -->
	<div>
		<div class="mb-2 flex items-center gap-3">
			<h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Browse All Faculty</h3>
		</div>

		<p class="text-sm text-gray-600 dark:text-gray-400">
			Explore faculty members across all departments
		</p>

		<!-- CTA -->
		<div class="mt-6 flex items-center justify-between">
			<div
				class="flex items-center gap-2 text-blue-600 transition-all group-hover:gap-3 group-active:gap-3 dark:text-blue-400"
			>
				<button
					onclick={() => {
						toast.info('Work in Progress. :)');
					}}
				>
					<span class="text-sm font-medium">Explore Now</span>
				</button>
				<ChevronRight
					class="h-4 w-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1"
				/>
			</div>
		</div>
	</div>
</div>
