<script>
	import { fade } from 'svelte/transition';
</script>

<div
	transition:fade={{ duration: 200 }}
	class="fixed inset-0 z-999 flex items-center justify-center bg-gray-300/80 backdrop-blur-sm dark:bg-zinc-900/80"
	role="status"
	aria-label="Loading..."
>
	<div
		role="status"
		class="border-opacity-20 h-12 w-12 animate-spin rounded-full border-3 border-t-blue-600 [animation-duration:0.7s] dark:border-t-blue-500"
	></div>
</div>
