<script lang="ts">
	import SvgQR from '@svelte-put/qr/svg/QR.svelte';
	import { Eye, QrCode } from 'lucide-svelte';
	import { onMount } from 'svelte';

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import type { FacultyMember } from '$lib/types/db';

	import { createFormattedText } from './utils/qrcode-utils';

	let { member, openModal = $bindable() } = $props<{
		member: FacultyMember;
		openModal: boolean;
	}>();

	let text = $state<string>('');

	let showPreview = $state(false);
	function togglePreview() {
		showPreview = !showPreview;
	}

	onMount(() => {
		text = createFormattedText(member);
	});
</script>

<Dialog.Root bind:open={openModal}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header class="space-y-4 sm:mt-4">
			<Dialog.Title class="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
				Scan the code to view the formatted information of faculty member
			</Dialog.Title>
		</Dialog.Header>
		<div class="my-6 flex flex-col items-center space-y-6" aria-live="polite">
			{#if !showPreview}
				<SvgQR data={text} width="clamp(200px, 80%, 250px)" />
			{:else}
				<Textarea readonly={true} value={text} class="max-h-72 min-h-52 font-mono transition" />
			{/if}

			<button
				onclick={togglePreview}
				class="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
				aria-label={showPreview ? 'View QR Code' : 'View Text Preview'}
			>
				{#if showPreview}
					<QrCode class="mr-2 h-5 w-5" />QR Code
				{:else}
					<Eye class="mr-2 h-5 w-5" />Preview
				{/if}
			</button>
		</div>
	</Dialog.Content>
</Dialog.Root>
