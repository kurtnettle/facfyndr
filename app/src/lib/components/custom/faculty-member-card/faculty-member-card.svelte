<script lang="ts">
	import { MapPinHouse } from 'lucide-svelte';

	import type { FacultyMember } from '$lib/types/db';

	import { AcademicProfileRow, CardAction, ContactColumn, MemberStatusPill } from '.';
	import { ContactMethod } from './parts//contact/contact.types';
	import MemberRoom from './parts/member-room.svelte';

	let { member } = $props<{ member: FacultyMember }>();
</script>

<div
	class="group isolate rounded-xl border bg-white/40 p-4 shadow-md transition-all hover:border-gray-200/80 hover:shadow-lg hover:ring hover:ring-gray-200/80 active:shadow-lg md:min-h-68 md:p-6 dark:border-0 dark:bg-zinc-800/40 hover:dark:ring-gray-700/70"
>
	<div class="mb-4 flex w-full items-center justify-end space-x-2">
		<MemberStatusPill memberStatus={member.status} />
		<CardAction {member} />
	</div>

	<div class="flex flex-col gap-6 md:flex-row">
		<!-- Left Column -->
		<div class="flex-1">
			<div class="space-y-1 md:space-y-2">
				<div class="mt-3 flex flex-row items-center justify-between md:my-3.5 md:mt-0">
					<!-- Faculty Code -->
					<div class="text-xs font-medium text-gray-700 sm:text-sm md:text-base dark:text-gray-300">
						<span class="rounded bg-gray-200/85 px-1 py-0.5 text-gray-800 md:px-2 md:py-1">
							{member.fcode}
						</span>
					</div>

					<!-- Academic Profile Row -->
					<div
						class="cool-scrollbar h-full w-fit max-w-[120px] overflow-x-auto px-0.5 md:max-w-[136px]"
					>
						<AcademicProfileRow links={member.academic_profiles} />
					</div>
				</div>

				<!-- Member Name and Desgn -->
				<div class="flex flex-col">
					<div>
						<span
							class="text-xl font-bold tracking-tight text-gray-900 md:mb-1 md:text-2xl dark:text-gray-100"
						>
							<a
								target="_blank"
								rel="noopener noreferrer"
								class="hover:underline active:underline"
								title="Visit Faculty Member Profile"
								href={member.profile_url}
							>
								{member.name}</a
							>
						</span>
					</div>
					<div>
						<span
							class="font-medium text-gray-600 md:text-base dark:border-gray-700 dark:text-gray-400"
						>
							{member.designation}
						</span>
					</div>
				</div>

				<div class="mt-2 flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
					<MapPinHouse class="size-4 md:size-5" />
					<MemberRoom building={member.building} room={member.room} />
				</div>
			</div>
		</div>

		<!-- Right Column -->
		<div class="cool-scrollbar min-w-0 flex-1 overflow-x-auto md:max-h-60">
			<div
				class="space-y-2 overflow-hidden border-t border-blue-100
			pt-4 md:space-y-5 md:border-t-0 md:border-l md:border-l-purple-100 md:pt-0
			md:pl-6 dark:border-gray-700"
			>
				<ContactColumn
					title="Telephones"
					contacts={member.telephone}
					contactMethod={ContactMethod.Telephone}
				/>
				<ContactColumn title="Emails" contacts={member.email} contactMethod={ContactMethod.Email} />
			</div>
		</div>
	</div>
</div>
