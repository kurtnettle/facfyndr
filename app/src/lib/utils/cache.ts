import type { FacultyMember } from '$lib/types/db';

type CacheData = {
	content: FacultyMember[];
	modified_at: number;
};

export function saveCachedData(cacheKey: string, cacheData: CacheData): boolean {
	try {
		const serializedData = JSON.stringify(cacheData);
		// 5MB limit https://developer.mozilla.org/docs/Web/API/Window/localStorage
		if (serializedData.length > 1024 * 1024 * 5) {
			console.error('Cache data exceeds localStorage quota');
			return false;
		}

		localStorage.setItem(cacheKey, serializedData);
		return true;
	} catch (error) {
		console.error('Error saving data to localStorage:', error);
		return false;
	}
}

export function getCachedData(cacheKey: string, currentLastUpdateTime: number): CacheData | null {
	const cachedData = localStorage.getItem(cacheKey);
	if (!cachedData) return null;

	try {
		const data: CacheData = JSON.parse(cachedData);
		if (isCacheInvalid(data, currentLastUpdateTime)) {
			localStorage.removeItem(cacheKey);
			return null;
		}

		return data;
	} catch (error) {
		console.error('Error parsing cached data from localStorage:', error);
		localStorage.removeItem(cacheKey);
		return null;
	}
}

export function isCacheInvalid(cacheData: CacheData, currentLastUpdateTime: number): boolean {
	return cacheData.modified_at !== currentLastUpdateTime;
}

export const CacheUtils = {
	save: saveCachedData,
	get: getCachedData
};

export default CacheUtils;
