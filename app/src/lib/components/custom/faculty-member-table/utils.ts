import type { FacultyMember } from '$lib/types/db';
import type { FilterFn } from '@tanstack/table-core';

export const fuzzyFilter: FilterFn<FacultyMember> = (row, columnId, value, addMeta) => {
	if (!value) return true;

	const searchTerms: string[] = value.toLowerCase().split(' ').filter(Boolean);
	if (searchTerms.length === 0) return true;

	const faculty = row.original;
	const searchableFields = [
		faculty.name,
		faculty.fcode,
		typeof faculty.email === 'object' ? Object.values(faculty.email) : faculty.email,
		faculty.designation,
		Object.values(faculty.telephone),
		faculty.building,
		faculty.room
	]
		.join(' ')
		.toLowerCase();

	return searchTerms.every((term) => searchableFields.includes(term));
};
