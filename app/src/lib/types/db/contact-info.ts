export type ContactCategory = 'personal' | 'office' | 'other';

export interface ContactInfo {
	category: ContactCategory;
	value: string;
}
