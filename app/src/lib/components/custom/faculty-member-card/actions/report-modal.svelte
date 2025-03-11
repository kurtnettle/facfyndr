<script lang="ts">
	import { MemberReportForm } from '$lib/components/custom/member-report-form';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { FacultyMember } from '$lib/types/db';

	let { member = {}, openModal = $bindable() } = $props<{
		member: FacultyMember;
		openModal: boolean;
	}>();
</script>

<Dialog.Root bind:open={openModal}>
	<Dialog.Content>
		<MemberReportForm {member} bind:open={openModal} />
	</Dialog.Content>
</Dialog.Root>
