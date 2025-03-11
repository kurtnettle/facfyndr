import type { ContactInfo } from './contact-info';

export type FacultyMember = {
	department_id: number;
	fcode: string;
	name: string;
	designation: string;
	telephone: ContactInfo;
	email: ContactInfo;
	building: string;
	room: string;
	status: string;
	academic_profiles: string[];
	profile_url: string;
};
