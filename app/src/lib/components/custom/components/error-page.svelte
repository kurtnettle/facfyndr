<script lang="ts">
	import { CircleOff, Lightbulb } from 'lucide-svelte';

	let {
		title = 'Error Occurred',
		description = 'An Unknown Error Occurred',
		tip = '',
		icon = CircleOff
	} = $props();

	const ErrorIcon = $derived(icon);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section
	class="mx-4 flex min-h-[75vh] flex-col items-center justify-center dark:text-zinc-300"
	aria-labelledby="error-title"
	aria-describedby="error-description"
>
	<ErrorIcon class="size-18 sm:size-22" />

	<div class="rounded-lg p-8 text-center">
		<h1 class="mb-4 text-3xl font-bold sm:text-4xl">{title}</h1>
		<p class="leading-relaxed text-gray-600 dark:text-gray-400">
			{description}
		</p>
	</div>
	{#if tip.length}
		<div
			class="mt-4 rounded-lg border border-zinc-300 bg-transparent p-4 backdrop-blur-lg sm:mt-8 dark:border-zinc-700 dark:bg-zinc-800/20"
		>
			<div class="flex items-center space-x-2">
				<span class="inline-flex">
					<Lightbulb
						class="h-6 w-6 animate-pulse text-yellow-500 duration-2500 dark:text-yellow-600"
					/>
				</span>
				<span class="text-sm font-medium text-gray-700 dark:text-gray-300">
					{tip}
				</span>
			</div>
		</div>
	{/if}
</section>
