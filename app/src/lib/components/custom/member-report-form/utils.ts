import type { Writable } from 'svelte/store';

export function unwrapContacts(data: Record<string, string[]>): { type: string; value: string }[] {
	if (!data || typeof data !== 'object') {
		console.error('Invalid data format');
		return [];
	}

	return Object.entries(data).flatMap(([type, values]) => {
		return values.map((value) => ({ type: type, value: value }));
	});
}

export function wrapContacts(
	transformed: { type: string; value: string }[]
): Record<string, string[]> {
	const result: Record<string, string[]> = {};
	transformed.forEach(({ type, value }) => {
		if (!result[type]) {
			result[type] = [];
		}
		result[type].push(value);
	});
	return result;
}

export function updateContactValue(
	data: Writable<{ type: string; value: string }[]>,
	index: number,
	newValue: string
) {
	data.update((data) => data.map((item, i) => (i === index ? { ...item, value: newValue } : item)));
}

export function updateContactType(
	data: Writable<{ type: string; value: string }[]>,
	index: number,
	newValue: string
) {
	data.update((_data) =>
		_data.map((item, i) => (i === index ? { ...item, type: newValue } : item))
	);
}

export function addContactItem(data: Writable<{ type: string; value: string }[]>) {
	data.update((currentArray) => {
		const newItem = { type: 'other', value: '' };
		return [...currentArray, newItem];
	});
}

export function deleteContactItem(
	data: Writable<{ type: string; value: string }[]>,
	index: number
) {
	data.update((items) => {
		return items.filter((_, i) => i !== index);
	});
}
