import { DepartmentMeta } from '$lib/constants/academic';
import type { FacultyMember } from '$lib/types/db';
import type { ContactInfo } from '$lib/types/db/contact-info';

function capitalize(text: string) {
	if (!text) return '';
	return String(text[0]).toUpperCase() + String(text).slice(1);
}

export function formatContactInfo(key: string, data: string | ContactInfo) {
	let text = `${key}: `;
	if (typeof data === 'object') {
		Object.entries(data).forEach(([category, values]) => {
			text += `\n  ${capitalize(category)}:`;
			const items = Array.isArray(values) ? values : [values];
			items.forEach((item) => (text += `\n    ${item.trim()}`));
		});
	} else if (typeof data === 'string') {
		return (text += data.trim());
	}

	return text;
}

export function formatAcademicProfiles(data: string | string[]): string {
	let text = '';
	const items = Array.isArray(data) ? data : [data];
	items.forEach((item, index) => {
		text += `  ${index + 1}. ${item.trim()}\n`;
	});
	return text;
}

export function getNonEmptyText(value: string): string {
	return value ?? '';
}

export function createFormattedText(data: FacultyMember): string {
	if (data === undefined) return '';
	let text = `
====================
Faculty Information 
====================
Name: ${data.name} (${getNonEmptyText(data.fcode)}) (${data.status})
Designation: ${getNonEmptyText(data.designation)}
Department: ${DepartmentMeta[data.department_id].name}`;
	if (data.room && data.building) text += `\nRoom: B${data.building}/${data.room}`;
	if (data.email) text += `\n${formatContactInfo('Email', data.email)}`;
	if (data.telephone) text += `\n${formatContactInfo('Telephone', data.telephone)}`;
	if (data.academic_profiles?.length)
		text += `\nAcademic Profiles: \n${formatAcademicProfiles(data.academic_profiles)}`;
	if (data.profile_url !== '-1') text += `\nProfile url: ${data.profile_url}`;

	return text.trim();
}
