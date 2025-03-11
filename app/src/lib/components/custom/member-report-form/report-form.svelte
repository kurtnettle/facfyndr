<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Turnstile } from 'svelte-turnstile';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { FacultyMember } from '$lib/types/db';

	import AcademicProfilesSection from './parts/academic-profiles-section.svelte';
	import ContactSection from './parts/contact-section.svelte';
	import { formSchema } from './report-form-schema';

	let { member, open = $bindable() }: { member: FacultyMember; open: boolean } = $props();

	let localMember = JSON.parse(JSON.stringify(member));

	let resetTurnstile = $state<() => void>();

	const form = superForm(localMember, {
		validators: zodClient(formSchema),
		dataType: 'json',
		multipleSubmits: 'prevent',
		onUpdated() {
			resetTurnstile?.();
		},
		onResult({ result }) {
			if (result.type == 'success') {
				open = false;
				toast.success(result.data?.form.message);
			} else {
				toast.error(result.data.form.message ?? 'Failed to submit the report.', {
					description: JSON.stringify(result.data.form.errors) ?? ''
				});
			}
		}
	});

	const { form: formData, errors, message, constraints, enhance, delayed, submitting } = form;
</script>

<div class="cool-scrollbar mt-4 max-h-[70vh] overflow-y-auto sm:px-6">
	<form method="POST" use:enhance class="transition-all">
		<div class="mb-8 space-y-1 text-center md:space-y-3">
			<h1 class="text-lg font-bold text-gray-900 md:text-2xl dark:text-white">
				Improve Member Information
			</h1>
			<span class="text-sm text-gray-600 md:text-base dark:text-gray-300">
				Help keeping records up-to-date.
			</span>
		</div>
		<div class="flex flex-col gap-2.5 p-0.5 transition-all">
			<div class="flex flex-row gap-2">
				<Form.Field {form} name="name" class="flex-grow">
					<Form.Control>
						<Form.Label>Full Name</Form.Label>
						<Input bind:value={$formData.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="fcode" class="max-w-22 md:max-w-28">
					<Form.Control>
						<Form.Label>Faculty Code</Form.Label>
						<Input disabled bind:value={$formData.fcode} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<Form.Field {form} name="designation">
				<Form.Control>
					<Form.Label>Designation</Form.Label>
					<Input bind:value={$formData.designation} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex flex-row gap-2">
				<Form.Field {form} name="status" class="flex-grow">
					<Form.Control>
						<Form.Label>Member Status</Form.Label>
						<Input bind:value={$formData.status} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="building" class="max-w-18 sm:max-w-20">
					<Form.Control>
						<Form.Label>Building</Form.Label>
						<Input bind:value={$formData.building} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="room" class="max-w-18 sm:max-w-20">
					<Form.Control>
						<Form.Label>Room</Form.Label>
						<Input bind:value={$formData.room} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<Form.Field {form} name="profile_url">
				<Form.Control>
					<Form.Label>Profile URL</Form.Label>
					<Input type="url" bind:value={$formData.profile_url} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control>
					<Form.Label>Email address</Form.Label>
					<div class="mt-1.5">
						<ContactSection bind:data={$formData.email} isEmail={true} />
					</div>
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="telephone">
				<Form.Control>
					<Form.Label class="flex items-center">Telephone</Form.Label>
					<div class="mt-1.5">
						<ContactSection bind:data={$formData.telephone} isEmail={false} />
					</div>
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="academic_profiles">
				<Form.Control>
					<Form.Label class="flex items-center">Academic Profiles</Form.Label>
					<div class="mt-1.5">
						<AcademicProfilesSection bind:data={$formData.academic_profiles} />
					</div>
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="cf-turnstile">
				<Form.Control>
					<Turnstile
						siteKey={PUBLIC_TURNSTILE_SITE_KEY}
						bind:reset={resetTurnstile}
						on:callback={(data) => {
							formData.update((currentValue) => {
								return {
									...currentValue,
									'cf-turnstile-response': data.detail.token
								};
							});
						}}
					/>
				</Form.Control>
			</Form.Field>

			<div class="mx-auto mt-6">
				<Form.Button variant="outline" disabled={$submitting}>
					Report
					<div
						class:hidden={!$delayed}
						class="border-opacity-20 size-5 animate-spin rounded-full border-3 border-t-zinc-600 [animation-duration:0.7s] dark:border-t-zinc-500"
					></div>
				</Form.Button>
			</div>
		</div>
	</form>
</div>
