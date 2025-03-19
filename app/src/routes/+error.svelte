<script lang="ts">
	import { RefreshCwOff } from 'lucide-svelte';

	import { page } from '$app/state';
	import { ErrorPage } from '$lib/components/custom/components';
	console.debug(page.error);
</script>

{#if page.status === 555}
	<ErrorPage
		title="No Internet"
		description="You are currently offline. Please check your connection and try again."
		tip="Next time you visit online, it will be cached for offline access."
		icon={RefreshCwOff}
	/>
{:else}
	<ErrorPage description={page.error?.message} />
{/if}
