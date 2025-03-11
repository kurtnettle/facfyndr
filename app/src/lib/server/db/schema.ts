import {
	integer,
	jsonb,
	pgEnum,
	pgMaterializedView,
	pgTable,
	smallint,
	text,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

export const faculties = pgTable('faculties', {
	uid: integer().primaryKey().generatedAlwaysAsIdentity(),
	department_id: smallint('department_id').notNull(),
	name: varchar('member_name', { length: 100 }).notNull(),
	fcode: varchar('member_code', { length: 8 }).notNull(),
	designation: text('designation'),
	building: varchar('building', { length: 4 }),
	room: varchar('room', { length: 6 }),
	telephone: jsonb('telephone'),
	email: jsonb('email'),
	academic_profiles: text('academic_profiles').array().default([]),
	status: text('status').notNull().default('active'),
	profile_url: text('profile_url')
});

export const faculty_stats = pgMaterializedView('faculty_stats', {
	total: integer('total'),
	assistant_professors: integer('assistant_professors'),
	lecturers: integer('lecturers'),
	study_leave: integer('study_leave')
}).existing();

export const department_stats = pgTable('department_stats', {
	department_id: smallint('department_id').primaryKey(),
	modified_at: timestamp('modified_at', { withTimezone: true }).notNull().defaultNow()
});

export const statusEnum = pgEnum('status', ['pending', 'processing', 'completed', 'rejected']);

export const faculty_reports = pgTable('faculty_reports', {
	rid: uuid('rid').primaryKey().defaultRandom(),
	uid: integer('uid'),
	department_id: smallint('department_id'),
	changed_fields: jsonb('changed_fields').notNull(),
	old_values: jsonb('old_values'),
	new_values: jsonb('new_values'),
	created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
	modified_at: timestamp('modified_at', { withTimezone: true }).defaultNow(),
	status: statusEnum('status').default('pending').notNull()
});
