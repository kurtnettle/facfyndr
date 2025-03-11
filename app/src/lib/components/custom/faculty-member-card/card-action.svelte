<script lang="ts">
	import { CircleAlert, EllipsisVertical, IdCard, QrCode } from 'lucide-svelte';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { FacultyMember } from '$lib/types/db';

	import QrCodeModal from './actions/qrcode-modal.svelte';
	import ReportModal from './actions/report-modal.svelte';
	import VCardModal from './actions/vcard-modal.svelte';

	let { member } = $props<{ member: FacultyMember }>();

	let openQrModal = $state(false);
	let openVcardModal = $state(false);
	let openReportModal = $state(false);

	function handleReport() {
		openReportModal = !openReportModal;
	}
	function handleQrCode() {
		openQrModal = !openQrModal;
	}
	function handleVcard() {
		openVcardModal = !openVcardModal;
	}

	const options = [
		{ title: 'QR Code', icon: QrCode, onSelect: handleQrCode },
		{ title: 'vCard', icon: IdCard, onSelect: handleVcard },
		{ title: 'Report', icon: CircleAlert, onSelect: handleReport }
	];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<button
			class="rounded-full p-2 transition-colors duration-200 hover:bg-zinc-200
			focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none
			dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900 dark:active:bg-zinc-700 dark:active:ring-offset-zinc-900"
			aria-label="Open menu"
		>
			<EllipsisVertical class="size-4" />
		</button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		side="right"
		class="rounded-md border border-zinc-200 bg-white shadow-lg backdrop-blur-lg dark:border-zinc-700 dark:bg-zinc-800/40"
	>
		{#each options as option}
			<DropdownMenu.Item
				class="flex cursor-pointer items-center px-4 py-2 text-sm text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 active:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700/40 dark:active:bg-zinc-400"
				onSelect={() => option.onSelect()}
			>
				<option.icon class="mr-2 size-4" />
				<span>{option.title}</span>
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>

<QrCodeModal bind:openModal={openQrModal} {member} />
<VCardModal bind:openModal={openVcardModal} {member} />
<ReportModal bind:openModal={openReportModal} {member} />
