<script lang="ts">
	import '../app.css';

	import { ModeWatcher, setMode } from 'mode-watcher';
	import { onMount } from 'svelte';

	import { UpdateSWPrompt } from '$lib/components/custom/components';
	import { Footer, Navbar } from '$lib/components/custom/layout';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();

	let cacheVersion = $state('none');
	let swInstance: ServiceWorker | undefined = $state();
	let showSWUpdatePrompt = $state(false);

	let isUserOnApp = $state(false);

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;

		if (!registration) {
			console.error('Service Worker registration is missing.');
			return;
		}

		if (registration.active) {
			registration.active.postMessage({ type: 'CACHE_VERSION_REQUEST' });
		}

		if (registration.waiting && navigator.serviceWorker.controller) {
			showSWUpdatePrompt = true;
			swInstance = registration.waiting;
		}

		registration.addEventListener('updatefound', () => {
			registration.installing && handleUpdate(registration.installing);
		});

		const handleMessage = (event: MessageEvent) => {
			if (!event.data) return;

			if ('CACHE_VERSION_RESPONSE' in event.data) {
				const epoch = parseInt(event.data.CACHE_VERSION_RESPONSE, 10);
				try {
					cacheVersion = new Date(epoch).toUTCString();
				} catch (err) {
					console.error('Failed to format cache version timestamp: ' + epoch);
				}
			} else {
				console.warn('Unexpected SW message format:', event.data);
			}
		};

		const handleUpdate = (newSW: ServiceWorker) => {
			const stateChangeHandler = () => {
				if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
					showSWUpdatePrompt = true;
					swInstance = newSW;
					newSW.removeEventListener('statechange', stateChangeHandler);
				}
			};

			newSW.addEventListener('statechange', stateChangeHandler);
		};

		navigator.serviceWorker.addEventListener('message', handleMessage);
	}

	onMount(async () => {
		await detectSWUpdate();

		if (!window.HarukazeAndroid) return;

		isUserOnApp = true;

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

{#if !isUserOnApp}
	<Navbar />
{/if}

<UpdateSWPrompt showAlert={showSWUpdatePrompt} {cacheVersion} {swInstance} />
<main class="min-h-screen">
	{@render children()}
</main>
<Footer {isUserOnApp} {cacheVersion} />
