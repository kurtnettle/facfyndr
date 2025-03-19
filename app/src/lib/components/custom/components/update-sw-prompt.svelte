<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	let { cacheVersion, showAlert = $bindable(), swInstance } = $props<number, boolean>();

	function applySWUpdate(sw: ServiceWorker) {
		if (sw) sw.postMessage({ type: 'APPLY_UPDATE' });
		window.location.reload();
	}
</script>

<AlertDialog.Root bind:open={showAlert}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>New Update Available</AlertDialog.Title>
			<AlertDialog.Description>
				A new version of the FacFyndr is available. Reload to apply the update?
				<div class="my-0.5">
					Current built time:
					<span class="mx-0.5 rounded-2xl bg-zinc-200 px-2 font-mono dark:bg-zinc-800"
						>{cacheVersion}</span
					>
				</div>
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel onclick={() => (showAlert = false)}>Later</AlertDialog.Cancel>
			<AlertDialog.Action onclick={() => applySWUpdate(swInstance)}>Sure</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
