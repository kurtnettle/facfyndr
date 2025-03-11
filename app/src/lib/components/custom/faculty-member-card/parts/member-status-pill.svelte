<script lang="ts">
	interface Status {
		text: string;
		color: string;
	}

	const STATUS = {
		AVAILABLE: { text: 'Available', color: 'bg-emerald-500' },
		STUDY_LEAVE: { text: 'Study Leave', color: 'bg-amber-500' },
		LEFT: { text: 'Left', color: 'bg-indigo-600' },
		UNKNOWN: { text: 'Unknown', color: 'bg-gray-500' },
		CUSTOM: (text: string) => ({ text, color: 'bg-gray-500' })
	} as const;

	let { memberStatus = '' } = $props();

	let currentStatus = $state<Status>();
	const normalizedStatus = memberStatus.trim().toLowerCase();

	if (normalizedStatus.includes('study')) {
		currentStatus = STATUS.STUDY_LEAVE;
	} else if (normalizedStatus.includes('left')) {
		currentStatus = STATUS.LEFT;
	} else if (normalizedStatus.includes('active')) {
		currentStatus = STATUS.AVAILABLE;
	} else {
		currentStatus =
			normalizedStatus.length > 0 ? STATUS.CUSTOM(memberStatus.trim()) : STATUS.UNKNOWN;
	}
</script>

<div
	class="flex max-w-fit items-center gap-1 rounded-full bg-white/80 px-1.5 py-1 text-xs shadow-xs ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-200 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm dark:bg-zinc-900 dark:ring-gray-700"
>
	<span class="h-2.5 w-2.5 rounded-full {currentStatus.color}" aria-hidden="true"></span>
	<span class="font-medium text-gray-700 dark:text-gray-200">
		<span class="sr-only">Member status: </span>
		{currentStatus.text}
	</span>
</div>
