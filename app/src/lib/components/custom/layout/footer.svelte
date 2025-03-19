<script lang="ts">
	import { Github, Send, Smartphone } from 'lucide-svelte';

	let { isUserOnApp, cacheVersion } = $props();
</script>

<footer class="mt-6 border-t border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-zinc-800/15">
	<div class="mx-auto max-w-5xl px-4 py-6">
		<div
			class="flex flex-col items-center justify-center gap-3 text-center text-sm text-gray-600 dark:text-gray-300"
		>
			<span>
				Developed by
				<a
					href="https://github.com/kurtnettle"
					target="_blank"
					rel="noopener noreferrer"
					title="Visit Developer's GitHub Profile"
					aria-label="Visit Developer's GitHub Profile"
					class="footer-link"
				>
					a student
				</a>
				for
				<a
					href="https://bubt.edu.bd/"
					target="_blank"
					rel="noopener noreferrer"
					title="Visit BUBT Website"
					aria-label="Visit BUBT Website"
					class="footer-link"
				>
					the students
				</a>.
			</span>

			<span class="flex items-center justify-center gap-2">
				Part of
				<a
					href="https://harukaze.pages.dev"
					target="_blank"
					rel="noopener noreferrer"
					title="Visit Project Harukaze Homepage"
					aria-label="Visit Project Harukaze Homepage"
					class="footer-link"
				>
					Project Harukaze
				</a>
				<img
					src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f343/512.webp"
					alt="🍃"
					width="18"
					height="18"
					class="inline-block"
					loading="lazy"
					aria-hidden="true"
				/>
			</span>

			{#if !isUserOnApp}
				<div class="my-2 h-px w-12 bg-gray-300 dark:bg-gray-600"></div>

				<!-- Support Section -->
				<div
					class="flex max-w-52 flex-wrap items-center justify-center gap-2 sm:max-w-fit sm:gap-4"
				>
					<a
						href="https://github.com/kurtnettle/facfyndr"
						target="_blank"
						rel="noopener noreferrer"
						title="View Source Code"
						aria-label="View Source Code"
						class="footer-support-link group hover:bg-gray-200 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-700"
					>
						<Github
							class="h-4 w-4 text-gray-700 group-hover:text-gray-900 group-active:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100 dark:group-active:text-gray-100"
						/>
						<span
							class="font-medium text-gray-700 group-hover:text-gray-900 group-active:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100 dark:group-active:text-gray-100"
						>
							GitHub
						</span>
					</a>

					<a
						href="/harukaze-app"
						title="Download Harukaze Android App"
						aria-label="Download Harukaze Android App"
						class="footer-support-link group hover:bg-green-100 active:bg-green-100 dark:hover:bg-green-900/30 dark:active:bg-green-900/30"
					>
						<Smartphone
							class="h-4 w-4 text-green-600 group-hover:text-green-700 group-active:text-green-700 dark:text-green-400 dark:group-hover:text-green-300 dark:group-active:text-green-300"
						/>
						<span
							class="font-medium text-green-600 group-hover:text-green-700 group-active:text-green-700 dark:text-green-400 dark:group-hover:text-green-300 dark:group-active:text-green-300"
						>
							Android
						</span>
					</a>

					<a
						href="https://t.me/harukaze_bubt"
						target="_blank"
						rel="noopener noreferrer"
						title="Join Telegram Support Group"
						aria-label="Join Telegram Support Group"
						class="footer-support-link group hover:bg-blue-100 active:bg-blue-100 dark:hover:bg-blue-900/30 dark:active:bg-blue-900/30"
					>
						<Send
							class="h-4 w-4 text-blue-500 group-hover:text-blue-600 group-active:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 dark:group-active:text-blue-300"
						/>
						<span
							class="font-medium text-blue-500 group-hover:text-blue-600 group-active:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 dark:group-active:text-blue-300"
						>
							Support
						</span>
					</a>
				</div>
			{/if}

			<div class="my-0.5 text-xs">
				Current built time:
				<span class="mx-0.5 rounded-sm bg-zinc-200 px-1.5 font-mono dark:bg-zinc-800"
					>{cacheVersion}</span
				>
			</div>
		</div>
	</div>
</footer>
