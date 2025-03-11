import {
	BrickWall,
	Briefcase,
	ChartBar,
	ChartPie,
	CircuitBoard,
	Gavel,
	Icon,
	Laptop,
	Megaphone,
	PenLine,
	Pi,
	ReceiptText,
	Shirt
} from 'lucide-svelte';

type Department = {
	id: number;
	name: string;
	icon: typeof Icon;
	path: string;
	baseUrl?: string;
	profilePathPrefix?: string;
};

const FacultyDepartments: Record<string, Array<Department>> = {
	'Engineering & Applied Sciences': [
		{
			id: 1,
			name: 'Computer Science and Engineering',
			icon: Laptop,
			baseUrl: 'https://cse.bubt.edu.bd',
			path: '/faculty',
			profilePathPrefix: '/facultydetails'
		},
		{
			id: 2,
			name: 'Electrical and Electronic Engineering',
			icon: CircuitBoard,
			baseUrl: 'https://eee.bubt.edu.bd',
			path: '/faculty-members',
			profilePathPrefix: '/faculty-members'
		},
		{
			id: 3,
			name: 'Mathematics & Statistics',
			icon: Pi,
			path: '/mathematics-statistics'
		},
		{
			id: 4,
			name: 'Textile Engineering',
			icon: Shirt,
			path: '/textile'
		},
		{
			id: 5,
			name: 'Civil Engineering',
			icon: BrickWall,
			path: '/civil-engineering'
		}
	],
	Business: [
		{
			id: 6,
			name: 'Accounting',
			icon: ReceiptText,
			path: '/accounting'
		},
		{
			id: 7,
			name: 'Finance',
			icon: ChartPie,
			path: '/Finance'
		},
		{
			id: 8,
			name: 'Marketing',
			icon: Megaphone,
			path: '/Marketing'
		},
		{
			id: 9,
			name: 'Management',
			icon: Briefcase,
			path: '/Management'
		}
	],
	'Arts & Humanities': [
		{
			id: 11,
			name: 'English',
			icon: PenLine,
			path: '/English'
		}
	],
	'Social Sciences': [
		{
			id: 12,
			name: 'Economics',
			icon: ChartBar,
			path: '/Economics'
		}
	],
	Law: [
		{
			id: 10,
			name: 'Law & Justice',
			icon: Gavel,
			path: '/law-justic'
		}
	]
};

export default FacultyDepartments;

export const DepartmentMeta = Object.fromEntries(
	Object.values(FacultyDepartments).flatMap((departments) =>
		departments.map((department) => {
			if (!department.profilePathPrefix) {
				department.profilePathPrefix = '/department/member_details';
			}

			if (!department.baseUrl) {
				department.baseUrl = 'https://www.bubt.edu.bd';
				department.path = `/home/faculty_member${department.path}`;
			}

			return [department.id, department];
		})
	)
);
