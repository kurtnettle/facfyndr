import { getPlatformFromHostname } from '$lib/components/custom/faculty-member-card/parts/academic-profile/academic-profile-utils';
import { DepartmentMeta } from '$lib/constants/academic';
import type { FacultyMember } from '$lib/types/db';
import type { ContactInfo } from '$lib/types/db/contact-info';
import VCard from 'vcard-creator';

const mapContactType: Record<string, string> = {
	personal: 'HOME',
	office: 'WORK'
};

const mapBuilding: Record<string, string> = {
	'2': 'MSM',
	'3': 'MTA'
};

function normalizeToArray<T>(input: T | T[]): T[] {
	return Array.isArray(input) ? input : [input];
}

function addContactInfo(
	card: VCard,
	data: string | ContactInfo | ContactInfo[],
	isEmail: boolean
): VCard {
	if (typeof data === 'object') {
		Object.entries(data).forEach(([category, values]) => {
			const _category = mapContactType[category] || category;

			const items = normalizeToArray(values);
			items.forEach((item) => {
				if (isEmail) card.addEmail(item, _category);
				else card.addPhoneNumber(item, _category);
			});
		});
	} else if (typeof data === 'string') {
		if (isEmail) card.addEmail(data, 'OTHER');
		else card.addPhoneNumber(data, 'OTHER');
	}

	return card;
}

function addAcademicProfiles(card: VCard, urls: string | string[]): VCard {
	const items = normalizeToArray(urls);
	items.forEach((url) => {
		try {
			const hostname = new URL(url).hostname;
			const profileType = getPlatformFromHostname(hostname) || 'Other';
			card.addSocial(url, profileType);
		} catch (error) {
			console.error(`Invalid URL: ${url}`, error);
		}
	});
	return card;
}

export function createVCard(data: FacultyMember) {
	let myVCard = new VCard();

	myVCard.addName(undefined, data.name);
	myVCard.addNickname(data.fcode);

	// if (data.status === 'left') return myVCard.buildVCard();

	myVCard.addCompany(
		'Bangladesh University of Business and Technology (BUBT)',
		DepartmentMeta[data.department_id].name || 'Unknown Department'
	);

	if (data.room && data.building) {
		myVCard.addNote(`Room: ${mapBuilding[data.building] || 'B' + data.building}/${data.room}`);
	}

	if (data.designation) {
		myVCard.addJobtitle(data.designation);
	}

	if (data.email) {
		myVCard = addContactInfo(myVCard, data.email, true);
	}

	if (data.telephone) {
		myVCard = addContactInfo(myVCard, data.telephone, false);
	}

	if (data.academic_profiles?.length) {
		myVCard = addAcademicProfiles(myVCard, data.academic_profiles);
	}

	if (data.profile_url !== '-1') {
		myVCard.addURL(data.profile_url, 'WORK');
	}

	return myVCard.buildVCard();
}
