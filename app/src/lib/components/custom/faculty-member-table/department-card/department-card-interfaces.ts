import type { FacultyMember } from '$lib/types/db';

export interface DepartmentCardProps {
	department_id: string;
	modified_at: Date;
	members?: Array<FacultyMember>;
}

export interface DepartmentInfoMissingStats {
	telephone: number;
	email: number;
	room: number;
	percentage: number;
	totalMembers: number;
}
