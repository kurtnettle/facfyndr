import { env } from '$env/dynamic/private';
import * as schema from '$lib/server/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export function createDbClient() {
	const dbClient = postgres(env.DATABASE_URL, { prepare: false });
	return drizzle(dbClient, { schema });
}
