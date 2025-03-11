<script lang="ts">
	import '../app.css';

	import { ModeWatcher, setMode } from 'mode-watcher';
	import { onMount } from 'svelte';

	import { Footer, Navbar } from '$lib/components/custom/layout';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();

	onMount(() => {
		if (!window.HarukazeAndroid) return;

		try {
			const isDarkMode = window.HarukazeAndroid.isAppDarkMode();
			setMode(isDarkMode ? 'dark' : 'light');
		} catch (e) {
			console.error('Error checking dark mode:', e);
		}
	});
</script>

<ModeWatcher />
<Toaster richColors />
<Navbar />

<main class="min-h-screen">
	{@render children()}
</main>
<Footer />
