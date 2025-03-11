<script>
	import Autoplay from 'embla-carousel-autoplay';
	import { Download } from 'lucide-svelte';
	import { mode } from 'mode-watcher';
	import { fade } from 'svelte/transition';

	import * as Carousel from '$lib/components/ui/carousel/index';

	const imgSizes = '(max-width: 640px) 100vw,(max-width: 1024px) 75vw,1280px';
</script>

<div
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 200 }}
	class="flex flex-col items-center justify-center space-y-4 dark:text-gray-100"
>
	<div class="mx-auto max-w-3xl space-y-8 px-6 text-center">
		<h1 class="text-5xl font-extrabold text-gray-900/95 md:text-6xl dark:text-gray-100/95">
			Meet<br />
			<span class="relative inline-block">
				Harukaze
				<div
					class="mx-auto my-2 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-800 sm:my-4"
				></div>
			</span>
		</h1>

		<div class="space-y-4">
			<p
				class="mx-auto text-lg leading-relaxed text-gray-600 md:max-w-2xl md:text-xl dark:text-gray-300/95"
			>
				You must be tired of long, unmemorable URLs of my websites.
			</p>

			<p class="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-200">
				I was too —
				<span class="font-semibold whitespace-nowrap text-indigo-600 dark:text-indigo-400">
					And I <em class="italic">kinda</em> fixed it.
				</span>
			</p>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center md:flex-row-reverse">
		<div class="space-y-0.5">
			<div>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/kurtnettle/harukaze-android/releases/latest"
				>
					<button
						class="flex items-center justify-center gap-2 rounded-xl border border-gray-300
				bg-indigo-600 px-6 py-2 text-lg font-bold text-white shadow-lg transition-all
				duration-200 hover:scale-105 hover:bg-indigo-700 active:scale-100 sm:px-8 sm:py-4 sm:text-xl
				dark:border-gray-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
						aria-label="Download for Android"
					>
						<Download class="size-5 sm:size-6" />
						<span>Download</span>
					</button>
				</a>
			</div>
			<div class="text-center">
				<span class="text-xs text-gray-500 italic dark:text-gray-400">
					Available for <span class="font-semibold text-gray-700 dark:text-gray-300"
						>Android only</span
					>.
				</span>
			</div>
		</div>

		<div class="max-w-[380px]">
			<Carousel.Root plugins={[Autoplay({ delay: 5000 })]}>
				<Carousel.Content>
					{#if $mode === 'dark'}
						<Carousel.Item>
							<enhanced:img
								src="/static/app/harukaze.app.dark.png"
								alt="App Preview"
								sizes={imgSizes}
							/>
						</Carousel.Item>
						<Carousel.Item>
							<enhanced:img
								src="/static/app/harukaze.facfyndr.dark.png"
								alt="App Content Preview"
								sizes={imgSizes}
							/>
						</Carousel.Item>
					{:else}
						<Carousel.Item>
							<enhanced:img
								src="/static/app/harukaze.app.light.png"
								alt="App Preview"
								sizes={imgSizes}
							/>
						</Carousel.Item>
						<Carousel.Item>
							<enhanced:img
								src="/static/app/harukaze.facfyndr.light.png"
								alt="App Preview"
								sizes={imgSizes}
							/>
						</Carousel.Item>
					{/if}
				</Carousel.Content>
			</Carousel.Root>
		</div>
	</div>
</div>
