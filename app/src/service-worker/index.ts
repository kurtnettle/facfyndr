/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

import { build, files, version, prerendered } from '$service-worker';
import { SwMessageType } from './message-types';
import { cacheResponse, safeFetch, serveFromCache, workerPostMessage } from './utils';

declare let self: ServiceWorkerGlobalScope;

const STATIC_CACHE = `static-${version}`;
const DYNAMIC_CACHE = `dynamic-${version}`;

const ASSETS = new Set([...build, ...prerendered, ...files]);

const ALLOWED_ORIGINS = new Set([self.location.origin, 'https://fonts.gstatic.com']);

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		try {
			const cache = await caches.open(STATIC_CACHE);
			await cache.addAll([...ASSETS]);
			console.debug(`Cached ${ASSETS.size} static assets.`);
		} catch (error) {
			console.error('Failed to cache static assets:', error);
		}
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	async function validateCache() {
		const keys = await caches.keys();
		await Promise.all(
			keys
				.filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
				.map((key) => caches.delete(key))
		);
	}

	console.debug('current cache version: ', STATIC_CACHE);
	event.waitUntil(
		validateCache().then(() => {
			self.clients.claim();
		})
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);
	if (!(url.protocol === 'http:' || url.protocol === 'https:')) return;

	async function respond() {
		const response = await handleStaticAsset(event.request);
		if (response) return response;

		if (ALLOWED_ORIGINS.has(url.origin)) {
			const response = await handleDynamicRequest(event.request);
			if (response) return response;
		} else {
			console.error('Disallowed Origin: ', url.origin);
			return safeFetch(event.request);
		}

		return new Response(JSON.stringify({ message: 'offline' }), { status: 555 });
	}

	event.respondWith(respond());
});

self.addEventListener('message', (event) => {
	if (!event.source || !event.data?.type) {
		console.error('Invalid message event: missing source or type.');
		return;
	}

	switch (event.data.type) {
		case SwMessageType.CacheVersionRequest: {
			workerPostMessage(event.source, SwMessageType.CacheVersionResponse, version);
			break;
		}

		case SwMessageType.ApplyUpdate: {
			self.skipWaiting();
			break;
		}

		default: {
			console.warn(`Unknown message type: ${event.data.type}`);
			break;
		}
	}
});

export async function handleStaticAsset(request: Request): Promise<Response | undefined> {
	const pathname = new URL(request.url).pathname;

	if (ASSETS.has(pathname)) {
		return await serveFromCache(STATIC_CACHE, pathname);
	}

	return undefined;
}

export async function handleDynamicRequest(request: Request): Promise<Response | undefined> {
	try {
		const response = await safeFetch(request);
		await cacheResponse(DYNAMIC_CACHE, request, response.clone());
		return response;
	} catch (err) {
		console.error('Network fetch failed:', err);
		return await serveFromCache(DYNAMIC_CACHE, request);
	}
}
