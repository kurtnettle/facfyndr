<script lang="ts">
	import { CircleHelp } from 'lucide-svelte';

	import type { LogoConfig, SocialPlatform } from './academic-profile-types';
	import { getPlatformFromHostname, logos } from './academic-profile-utils';

	let { profileUrl } = $props();

	let logo = $state<LogoConfig | null>(null);
	let isValidUrl = $state<boolean>(false);

	$effect(() => {
		try {
			isValidUrl = true;

			const url = new URL(profileUrl);
			const host = url.hostname;
			const platform: SocialPlatform | null = getPlatformFromHostname(host);

			if (platform) {
				logo = logos[platform];
			} else {
				console.warn(`Unsupported platform: ${host}`);
				logo = null;
			}
		} catch (error) {
			console.error('Invalid profile URL:', error);
			isValidUrl = false;
			logo = null;
		}
	});
</script>

{#if isValidUrl}
	<!-- Many Many Thanks to this Man <3 -->
	<!-- https://www.reddit.com/r/tailwindcss/comments/1b7a16g/comment/kth6h27/ -->
	<!-- https://play.tailwindcss.com/P0M7uIEXpm -->
	<div
		class="size-7 shrink-0 snap-start rounded transition-all duration-200 ease-in-out hover:scale-110 hover:brightness-110 focus:rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95 active:brightness-110 dark:ring-offset-gray-900 dark:hover:brightness-125 dark:active:brightness-125"
	>
		{#if logo?.color && logo?.logo}
			<a
				href={profileUrl}
				target="_blank"
				rel="noopener noreferrer"
				style="color: {logo.color};"
				title="Visit {logo.ariaLabel} profile"
				aria-label="Visit {logo.ariaLabel} profile"
			>
				<logo.logo />
			</a>
		{:else}
			<a
				href={profileUrl}
				target="_blank"
				rel="noopener noreferrer"
				title="Visit academic profile"
				aria-label="Visit academic profile"
			>
				<CircleHelp class="size-7" />
			</a>
		{/if}
	</div>
{/if}
