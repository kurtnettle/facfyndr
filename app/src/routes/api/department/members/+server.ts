import { createDbClient } from '$lib/server/db';
import { department_stats, faculties, faculty_stats } from '$lib/server/db/schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

function handleError(err: unknown): Response {
	let errorMessage: string;

	if (err instanceof Error) {
		errorMessage = err.message || 'An unexpected error occurred';
	} else if (typeof err === 'string') {
		errorMessage = err;
	} else {
		errorMessage = 'An unexpected error occurred';
	}

	return json(
		{
			error: true,
			message: errorMessage
		},
		{
			status: 500
		}
	);
}

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

		const [members, stats] = await Promise.all([
			db.query.faculties.findMany({
				where: eq(faculties.department_id, department_id)
			}),
			db.query.department_stats.findFirst({
				where: eq(department_stats.department_id, department_id)
			})
		]);

		return json(
			{ members: members, ...stats },
			{
				headers: {
					'Cache-Control':
						'public, max-age=3600, s-maxage=3600, stale-while-revalidate=60, stale-if-error=86400, no-transform'
				}
			}
		);
	} catch (err) {
		return handleError(err);
	}
};
