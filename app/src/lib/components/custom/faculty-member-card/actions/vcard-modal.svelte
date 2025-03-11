<script lang="ts">
	import SvgQR from '@svelte-put/qr/svg/QR.svelte';
	import { Download } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { FacultyMember } from '$lib/types/db';

	import { createVCard } from './utils/vcard-utils';

	let { member, openModal = $bindable() } = $props<{
		member: FacultyMember;
		openModal: boolean;
	}>();

	let text = $state<string>('');

	function downloadVcard(): void {
		if (!text) {
			const msg = 'No vCard data available to download.';
			console.error(msg);
			toast.error(msg);
			return;
		}

		try {
			const fileName = `BUBT_${member.fcode}.vcard`;

			if (window.HarukazeAndroid) {
				window.HarukazeAndroid.downloadVCard(fileName, text);
				return;
			}

			const blob = new Blob([text], { type: 'text/vcard;charset=utf-8' });
			const url = window.URL.createObjectURL(blob);

			if (!window.URL || !window.URL.createObjectURL) {
				const msg = 'Your browser does not support downloading files.';
				console.error(msg);
				toast.error(msg);
				return;
			}

			const a = document.createElement('a');
			a.href = url;
			a.download = fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		} catch (err) {
			console.error('Failed to generate vCard.', err);
			toast.error('Failed to generate vCard.' + err);
			return;
		}
	}

	onMount(() => {
		setTimeout(() => {
			text = createVCard(member);
		}, 500); // while testing, I was facing lag
	});
</script>

<Dialog.Root bind:open={openModal}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header class="space-y-4 sm:mt-4">
			<Dialog.Title class="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
				Download or Scan Contact Information
			</Dialog.Title>
			<Dialog.Description class="text-center text-gray-600 dark:text-gray-400">
				Scan the QR code to save the contact details directly to your device, or click the button
				below to download the vCard file.
			</Dialog.Description>
		</Dialog.Header>
		<div class="my-2 flex flex-col items-center space-y-4 sm:my-6 sm:space-y-6">
			<SvgQR data={text} width="200" height="200" />
			<button
				onclick={() => downloadVcard()}
				class="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
				aria-label="Download vCard"
			>
				<Download class="mr-2 h-5 w-5" />
				Download vCard
			</button>
		</div>

		<Dialog.Footer class="p-2 text-center text-sm text-gray-500 dark:text-gray-400">
			<span
				>vCard is a standard file format for electronic business cards.
				<a
					target="_blank"
					rel="noopener noreferrer"
					title="Visit VCard Wiki"
					aria-label="Visit VCard Wiki"
					href="https://en.wikipedia.org/wiki/VCard"
					class="text-blue-500 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
				>
					Learn More
				</a>
			</span>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
