import type { MemberReportFormSchemaType } from '$lib/components/custom/member-report-form';
import { createDbClient } from '$lib/server/db/index.js';
import { faculties, faculty_reports } from '$lib/server/db/schema';
import type { FacultyMember } from '$lib/types/db';
import { and, eq } from 'drizzle-orm';

function compProfileUrl(currentUrl: string, newUrl: string): boolean {
	if (typeof currentUrl !== 'string' || typeof newUrl !== 'string') {
		return false;
	}
	const currLastPart = currentUrl.split('/').filter(Boolean).pop();
	const newLastPart = newUrl.split('/').filter(Boolean).pop();
	return currLastPart === newLastPart;
}

function isValueEmpty(value: string | object): boolean {
	if (typeof value === 'string' && value.trim() === '') {
		return true;
	}
	if (Array.isArray(value) && value.length === 0) {
		return true;
	}
	if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
		return true;
	}
	return false;
}

function isObjectsSame(obj1: object, obj2: object) {
	const stringifySorted = (obj: object) => {
		return JSON.stringify(
			Object.keys(obj)
				.sort()
				.reduce((sortedObj, key) => {
					sortedObj[key] = obj[key];
					return sortedObj;
				}, {})
		);
	};

	return stringifySorted(obj1) === stringifySorted(obj2);
}

export async function getCurrentRecord(department_id: number, fcode: string) {
	try {
		const db = createDbClient();
		const record = await db.query.faculties.findFirst({
			where: and(eq(faculties.department_id, department_id), eq(faculties.fcode, fcode))
		});
		return record || null;
	} catch (error) {
		console.error('Error fetching current record:', error);
		throw error;
	}
}

export async function submitReport(
	uid: number,
	department_id: number,
	report: {
		changed_fields: string[];
		old_values: Record<string, { old: any; new: any }>;
		new_values: Record<string, { old: any; new: any }>;
	}
): Promise<boolean> {
	if (typeof uid !== 'number' || typeof department_id !== 'number') {
		throw new Error('Invalid input: uid and department_id must be numbers');
	}

	const data = {
		uid,
		department_id,
		...report
	};

	try {
		const db = createDbClient();
		await db.insert(faculty_reports).values(data);
		return true;
	} catch (error) {
		console.error('Error submitting report:', error);
		return false;
	}
}

export function generateReport(currentData: FacultyMember, newData: MemberReportFormSchemaType) {
	const ignoredFields = ['uid', 'cf-turnstile-response', 'fcode', 'department_id'];
	const totalFields = [...new Set([...Object.keys(currentData), ...Object.keys(newData)])];

	const oldValues: Record<string, { old: any; new: any }> = {};
	const newValues: Record<string, { old: any; new: any }> = {};

	totalFields.forEach((key) => {
		if (ignoredFields.includes(key)) return;

		const newValue = newData[key];
		const currentValue = currentData[key];

		if (isValueEmpty(newValue) && isValueEmpty(currentValue)) return;

		if (key === 'profile_url') {
			if (!compProfileUrl(currentValue, newValue)) {
				oldValues[key] = currentValue;
				newValues[key] = newValue;
			}
		} else if (key === 'email' || key === 'telephone') {
			if (!isObjectsSame(newValue, currentValue)) {
				oldValues[key] = currentValue;
				newValues[key] = newValue;
			}
		} else if (!(JSON.stringify(currentValue) === JSON.stringify(newValue))) {
			oldValues[key] = currentValue;
			newValues[key] = newValue;
		}
	});

	const changed_fields = [...new Set([...Object.keys(newValues), ...Object.keys(oldValues)])];
	if (!changed_fields.length) return false;

	return {
		changed_fields: changed_fields,
		old_values: oldValues,
		new_values: newValues
	};
}
