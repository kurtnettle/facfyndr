import { DepartmentMeta } from '$lib/constants/academic';

export function getEnumKeyByValue<T extends Record<string, string>>(
	enumObj: T,
	value: string
): keyof T {
	return (
		(Object.keys(enumObj) as Array<keyof T>).find((key) => enumObj[key] === value) ?? enumObj.Other
	);
}

export function getProfileUrl(deptId: number, profileUrl: string): string {
	const departmentMeta = DepartmentMeta[deptId];
	if (!departmentMeta) {
		console.error(`Department with ID ${deptId} not found.`);
		return '#';
	}

	const { baseUrl, profilePathPrefix } = departmentMeta;
	if (!profilePathPrefix) {
		console.error(`Profile path prefix not defined for department ID ${deptId}.`);
		return '#';
	}

	return `${baseUrl}${profilePathPrefix}/${profileUrl}`;
}
