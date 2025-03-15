import { createDbClient } from '$lib/server/db';
import { faculties, faculty_stats } from '$lib/server/db/schema';
import { handleError } from '$lib/server/utils';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
	const department_id = url.searchParams.get('department_id');
	if (department_id) {
		return await handleMembers(parseInt(department_id, 10));
	}

	try {
		const db = createDbClient();

		const [data] = await db.select().from(faculty_stats).limit(1);
		return json(data, {
			headers: {
				'Cache-Control': 'public, max-age=86400'
			}
		});
	} catch (err) {
		return handleError(err);
	}
};

const handleMembers = async (department_id: number) => {
	try {
		const db = createDbClient();

		const members = await db.query.faculties.findMany({
			where: eq(faculties.department_id, department_id),
			orderBy: [
				sql`CASE
					WHEN faculties.status = 'left' THEN 2
    				ELSE 1
    				END`,
				sql`CASE 
					WHEN designation ILIKE '%dean%' THEN 1
					WHEN designation ILIKE '%chairman%' THEN 2
					WHEN designation ILIKE '%professor%' THEN 3
					WHEN designation ILIKE '%lecturer%' THEN 4
					ELSE 5
				  END`,
				faculties.name
			]
		});

		return json({
			members: members,
			headers: {
				'Cache-Control': 'public, max-age=3600, stale-if-error=86400'
			}
		});
	} catch (err) {
		return handleError(err);
	}
};
