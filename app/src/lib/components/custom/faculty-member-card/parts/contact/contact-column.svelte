<script lang="ts">
	import { ContactRow } from '../..';
	import { type Contact, ContactCategory, ContactMethod } from './contact.types';
	let { title, contacts, contactMethod } = $props<{
		title: string;
		contacts: Contact | Contact[];
		contactMethod: ContactMethod;
	}>();

	function getContactCategory(value: string): ContactCategory {
		const lowerValue = value.toLowerCase();
		switch (true) {
			case lowerValue.includes('office'):
				return ContactCategory.Office;
			case lowerValue.includes('personal'):
				return ContactCategory.Personal;
			default:
				return ContactCategory.Other;
		}
	}
</script>

<div class="space-y-1 sm:space-y-2">
	<h2
		class="text-xs font-semibold tracking-wider text-slate-700 uppercase transition-colors dark:text-slate-300"
	>
		{title}
	</h2>
	<div class="flex flex-col p-0.5 sm:gap-y-1">
		{#if typeof contacts === 'object' && Object.keys(contacts).length}
			{#each Object.entries(contacts) as [category, items]}
				{@const _items = Array.isArray(items) ? items : [items]}
				{#each _items as contact}
					<ContactRow
						method={contactMethod}
						value={contact}
						category={getContactCategory(category)}
					/>
				{/each}
			{/each}
		{:else if contacts}
			<ContactRow method={contactMethod} value={contacts} category={ContactCategory.Other} />
		{:else}
			<p class="text-center text-xs text-gray-400 italic">Such Emptiness</p>
		{/if}
	</div>
</div>
