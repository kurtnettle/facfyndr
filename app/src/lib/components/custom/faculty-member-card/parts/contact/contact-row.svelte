<script lang="ts">
	import { CircleHelp, Mail, Phone } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	import { ContactCategoryPill } from '../..';
	import { type Contact, ContactMethod } from './contact.types';

	let copiedItem = $state<string | null>(null);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success('Copied to clipboard');
			copiedItem = text;
			setTimeout(() => (copiedItem = null), 4000);
		} catch (err) {
			toast.error('Failed to copy to clipboard');
			console.error(err);
		}
	};

	let { method, category, value }: Contact = $props();
</script>

<div
	role="button"
	tabindex="0"
	onclick={() => copyToClipboard(value)}
	onkeydown={(e) => ['Enter', 'Space'].includes(e.key) && copyToClipboard(value)}
	aria-label={`Copy ${value} to clipboard`}
	class="group relative flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-all
	hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:gap-3 sm:p-3
	dark:hover:bg-gray-800/30 dark:focus:border-blue-600 dark:focus:ring-blue-600"
>
	<!-- bg overlay -->
	<div
		class="absolute inset-0 rounded-lg bg-blue-300/5 opacity-0 transition-opacity group-hover:opacity-100"
	></div>

	<!-- ic container -->
	<div class="rounded-md bg-blue-50 p-2 dark:bg-zinc-800/25">
		{#if method === ContactMethod.Email}
			<Mail class="h-4 w-4 text-blue-600/90 sm:h-5 sm:w-5 dark:text-blue-400" />
		{:else if method === ContactMethod.Telephone}
			<Phone class="h-4 w-4 text-blue-600/90 sm:h-5 sm:w-5 dark:text-blue-400" />
		{:else}
			<CircleHelp class="h-4 w-4 text-blue-600/90 sm:h-5 sm:w-5 dark:text-blue-400" />
		{/if}
	</div>

	<div class="z-10">
		<div class="flex flex-wrap gap-1">
			<a
				data-sveltekit-reload
				onclick={(e) => e.stopPropagation()}
				class:text-green-700={value === copiedItem}
				class:dark:text-green-300={value === copiedItem}
				href={`${method === ContactMethod.Email ? 'mailto' : 'tel'}:${value}`}
				class="font-medium break-all
				 text-gray-800 transition-colors hover:text-blue-600 active:text-blue-600 md:items-center md:break-normal dark:text-gray-200 dark:hover:text-blue-400 dark:active:text-blue-400"
			>
				{value}
			</a>

			<span class="flex-shrink-0">
				<ContactCategoryPill {category} />
			</span>
		</div>

		<p class="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
			<span>Tap to copy</span>
		</p>
	</div>
</div>
