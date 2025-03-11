<script lang="ts">
	import { CalendarClock, Github, Moon, Smartphone, Sun } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';
	import { writable } from 'svelte/store';

	import { goto } from '$app/navigation';
	import { Separator } from '$lib/components/ui/separator';

	const buttons = [
		{ icon: CalendarClock, url: 'https://bubt-routine-hive.pages.dev' },
		{ icon: Smartphone, url: '/harukaze-app', internalUrl: true },
		{ icon: Github, url: 'http://github.com/kurtnettle/facfyndr' }
	];

	let isDark = writable(true);

	function toggle() {
		toggleMode();
		isDark.set(!$isDark);
	}
</script>

<div
	class="mx-auto mb-6 p-3 shadow-md transition-all sm:mt-10 sm:mb-12 sm:max-w-xl sm:rounded-xl sm:border sm:p-4
	md:max-w-2xl dark:border-b dark:bg-zinc-900/50 dark:shadow-none"
>
	<div class="flex items-center justify-between dark:text-gray-100">
		<a href="/" class="group inline-block">
			<span
				class="bg-gradient-to-r from-blue-800 to-fuchsia-800 bg-clip-text text-2xl font-bold text-transparent transition-all
					 sm:text-3xl dark:bg-gradient-to-l dark:from-blue-500 dark:to-fuchsia-400"
			>
				FacFyndr
			</span>
		</a>
		<div class="flex items-center gap-1.5 sm:gap-2">
			{#each buttons as { icon, url, internalUrl }}
				<button onclick={() => (internalUrl ? goto(url) : window.open(url))}>
					<svelte:component
						this={icon}
						class="size-5 transition-all hover:text-gray-600 sm:size-6 hover:dark:text-gray-300"
					/>
				</button>
				<Separator class="py-3" orientation="vertical" />
			{/each}

			<button onclick={toggle}>
				<span class:hidden={$isDark}>
					<Sun
						class="size-5 transition-all hover:text-gray-600 sm:size-6 hover:dark:text-gray-300"
					/>
				</span>
				<span class:hidden={!$isDark}>
					<Moon
						class="size-5 transition-all hover:text-gray-600 sm:size-6 hover:dark:text-gray-300"
					/>
				</span>
			</button>
		</div>
	</div>
</div>
