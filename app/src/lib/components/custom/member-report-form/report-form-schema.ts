import { z } from 'zod';

export const contactType = ['personal', 'office', 'other'] as const;

function createContactObjectSchema<T extends z.ZodTypeAny>(valueSchema: T) {
	const schemaEntries = Object.fromEntries(
		contactType.map((type) => [type, z.array(valueSchema).optional()])
	);
	return z.object(schemaEntries);
}

const emailSchema = z.union([
	createContactObjectSchema(z.string().email().trim().max(60)),
	z.string()
]);

const telephoneSchema = z.union([createContactObjectSchema(z.string().trim().max(16)), z.string()]);

export const formSchema = z.object({
	department_id: z.number(),
	name: z.string().trim().min(5).max(100),
	fcode: z.string().trim().min(2).max(8),
	designation: z.string().trim().min(8).max(100),
	room: z.string().trim().max(3).optional(),
	building: z.string().trim().max(3).optional(),
	telephone: telephoneSchema.default(''),
	email: emailSchema.default(''),
	status: z.string().trim().max(50).min(4),
	profile_url: z.string().trim().url().default(''),
	academic_profiles: z.array(z.string().trim().url().optional()).default([]),
	'cf-turnstile-response': z.string().nonempty('Please complete turnstile')
});

export type FormSchema = typeof formSchema;
export type FormSchemaType = z.infer<typeof formSchema>;
