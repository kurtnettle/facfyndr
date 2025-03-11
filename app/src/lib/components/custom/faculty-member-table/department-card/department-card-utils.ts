import { DepartmentMeta } from '$lib/constants/academic';
import type { FacultyMember } from '$lib/types/db';
import { School } from 'lucide-svelte';
import type { DepartmentInfoMissingStats } from './department-card-interfaces';

export function getCappedProgress(value: number) {
	value = Number.isNaN(value) ? 0 : value;
	return Math.min(Math.max(value, 0), 100);
}

export function getProgressColor(value: number) {
	value = getCappedProgress(value);
	return `hsl(${(value / 100) * 120}, 60%, 50%)`;
}

export function getDepartmentMissingInfoStats(
	members: FacultyMember[]
): DepartmentInfoMissingStats {
	const missingCount = {
		telephone: 0,
		email: 0,
		room: 0,
		percentage: 0,
		totalMembers: members.length
	};

	const isStringMissing = (value?: string) => !value?.trim();

	members.forEach((member) => {
		if (typeof member.telephone === 'string' && isStringMissing(member.telephone)) {
			missingCount.telephone++;
		} else if (!member.telephone) {
			missingCount.telephone++;
		}

		if (typeof member.email === 'string' && isStringMissing(member.email)) {
			missingCount.email++;
		} else if (!member.email) {
			missingCount.email++;
		}

		if (isStringMissing(member.room) || isStringMissing(member.building)) {
			missingCount.room++;
		}
	});

	missingCount.percentage =
		(missingCount.email + missingCount.telephone + missingCount.room) / (members.length * 3);

	missingCount.percentage = getCappedProgress(Math.ceil(missingCount.percentage * 100));

	return missingCount;
}

export function getDepartmentMeta(deptId: number) {
	const meta = DepartmentMeta[deptId];
	if (!meta) return { link: '#', logo: School };

	return {
		link: `${meta.baseUrl}${meta.path}`,
		logo: meta.icon
	};
}

export function formatDate(date: string) {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZoneName: 'short'
	};

	return new Date(date).toLocaleDateString('en-US', options);
}
