import { TURNSTILE_SECRET_KEY } from '$env/static/private';
import { MemberReportFormSchema } from '$lib/components/custom/member-report-form';
import { generateReport, getCurrentRecord, submitReport } from '$lib/server/utils.js';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types.js';
import { DepartmentMeta } from '$lib/constants/academic';
import { redirect } from '@sveltejs/kit';

interface TokenValidateResponse {
	'error-codes': string[];
	success: boolean;
	action: string;
	cdata: string;
}

export async function load({ params }) {
	const department_id = DepartmentMeta[params.department_id];

	if (!department_id) redirect(308, '/');
	return { department_id: department_id.id };
}

async function validateToken(token: string) {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			response: token,
			secret: TURNSTILE_SECRET_KEY
		})
	});

	const data: TokenValidateResponse = await response.json();

	return {
		success: data.success,
		error: data['error-codes']?.length ? data['error-codes'][0] : null
	};
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(MemberReportFormSchema));
		if (!form.valid) {
			return message(form, 'Invalid form', { status: 400 });
		}

		const { success } = await validateToken(form.data['cf-turnstile-response']);
		if (!success) {
			return setError(form, 'cf-turnstile-response', 'Invalid captcha, please try again');
		}

		const currData = await getCurrentRecord(form.data.department_id, form.data.fcode);
		if (!currData) {
			return message(
				form,
				'Member current data not found, Please report it on our Telegram Group.',
				{ status: 400 }
			);
		}

		const createdReport = generateReport(currData, form.data);
		if (!Object.keys(createdReport).length || !createdReport) {
			return message(form, 'Provided member data is identical with the current data', {
				status: 400
			});
		}

		const isReportSubmitted = await submitReport(
			currData.uid,
			currData.department_id,
			createdReport
		);
		if (!isReportSubmitted) {
			return message(form, 'Failed to submit report.', {
				status: 400
			});
		}

		return message(
			form,
			'Report was submitted successfully. Thank you for making it better for all.'
		);
	}
};
