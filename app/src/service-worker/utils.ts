import { SwMessageType } from './message-types';

export function workerPostMessage(worker: ServiceWorker, type: SwMessageType, data?: string): void {
	if (!worker) {
		console.error('Worker is not defined.');
		return;
	}

	try {
		if (data) worker.postMessage({ [type]: data });
		else worker.postMessage({ type: type });
	} catch (error) {
		console.error('Failed to post message to worker:', error);
	}
}

export async function serveFromCache(cacheName, request): Promise<Response | undefined> {
	const cache = await caches.open(cacheName);
	return await cache.match(request);
}

export async function cacheResponse(
	cacheName: string,
	request: Request,
	response: Response
): Promise<void> {
	if (!(response instanceof Response)) {
		throw new Error('Invalid response object');
	}

	if (response.ok) {
		const cache = await caches.open(cacheName);
		await cache.put(request, response);
	}
}

export async function safeFetch(request: Request, timeout = 10 * 1000) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(request, { signal: controller.signal });

		if (!(response instanceof Response)) {
			throw new Error('invalid response object');
		}

		return response;
	} catch (err) {
		console.error('Fetch error:', err);
		throw err;
	} finally {
		clearTimeout(timeoutId);
	}
}
