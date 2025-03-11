export enum ContactCategory {
	Office = 'office',
	Personal = 'personal',
	Other = 'other'
}

export enum ContactMethod {
	Telephone = 'telephone',
	Email = 'email',
	Other = 'other'
}

export interface Contact {
	method: ContactMethod;
	value: string;
	category: ContactCategory;
}
