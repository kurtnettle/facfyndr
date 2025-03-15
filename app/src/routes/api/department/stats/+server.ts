import { createDbClient } from '$lib/server/db';
import { department_stats } from '$lib/server/db/schema';
import { handleError } from '$lib/server/utils';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
	const department_id = url.searchParams.get('department_id');
	if (department_id) {
		return await handleDepartmentStats(parseInt(department_id, 10));
	}

	return json({});
};

const handleDepartmentStats = async (department_id: number) => {
	try {
		const db = createDbClient();
		const deptStats = await db.query.department_stats.findFirst({
			where: eq(department_stats.department_id, department_id)
		});

		return json(
			{ modified_at: deptStats?.modified_at },
			{
				headers: {
					'Cache-Control':
						'public, max-age=21600, s-maxage=21600, stale-while-revalidate=60, stale-if-error=86400, no-transform'
				}
			}
		);
	} catch (err) {
		return handleError(err);
	}
};
