import type { FacultyMember } from '$lib/types/db';
import { toast } from 'svelte-sonner';

const API_URL_PREFIX = '/api/department';

async function fetchApi<T>(url: string, errorMsg?: string): Promise<T> {
	const resp = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		}
	});

	if (resp.ok) {
		return await resp.json();
	} else {
		const msg = errorMsg || `Failed to fetch data from ${url}.`;
		toast.error(msg);
		console.error(`${msg}: ${resp.statusText}`);
		throw new Error(msg);
	}
}

export async function fetchDeptLastUpdateTime(
	departmentId: string
): Promise<Record<string, number>> {
	const url = `${API_URL_PREFIX}/stats?department_id=${departmentId}`;
	return await fetchApi(url, 'Failed to get department last updated time.');
}

export async function fetchDeptMembers(departmentId: string) {
	const url = `${API_URL_PREFIX}/members?department_id=${departmentId}`;
	return await fetchApi<{ members: FacultyMember[] }>(url);
}

export const ApiUtils = {
	fetchDeptLastUpdateTime: fetchDeptLastUpdateTime,
	fetchDeptMembers: fetchDeptMembers
};

export default ApiUtils;
