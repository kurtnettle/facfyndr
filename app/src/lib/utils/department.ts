import type { FacultyMember } from '$lib/types/db';
import { ApiUtils, CacheUtils } from './';

type DepartmentData = {
	members: FacultyMember[];
	modified_at: number;
};

export async function fetchAndCacheDeptData(departmentId: string): Promise<DepartmentData> {
	const departmentStats = await ApiUtils.fetchDeptLastUpdateTime(departmentId);
	if (!departmentStats) {
		throw new Error(`Department stats not found for ID: ${departmentId}`);
	}

	const cacheKey = `deptId_${departmentId}`;
	const modifiedAt = departmentStats.modified_at;

	const cachedData = CacheUtils.get(cacheKey, modifiedAt);
	if (cachedData) {
		return { members: cachedData.content, modified_at: modifiedAt };
	}

	const data = await ApiUtils.fetchDeptMembers(departmentId);
	if (!data) {
		throw new Error(`Failed to fetch members for department ID: ${departmentId}`);
	}

	const cache = { content: data.members, modified_at: modifiedAt };
	CacheUtils.save(cacheKey, cache);

	return { members: data.members, modified_at: modifiedAt };
}

export const DeptUtils = {
	fetchAndCacheDeptData: fetchAndCacheDeptData
};

export default DeptUtils;
