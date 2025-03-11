<script lang="ts">
	import { ContactCategory } from './contact.types';

	let { category }: { category: ContactCategory } = $props();

	const categoryColorMap = {
		[ContactCategory.Personal]:
			'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-100',
		[ContactCategory.Office]:
			'bg-amber-100 text-amber-800 dark:bg-amber-800/80 dark:text-amber-100',
		[ContactCategory.Other]:
			'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/80 dark:text-indigo-100'
	};

	const categoryColor = categoryColorMap[category] ?? categoryColorMap[ContactCategory.Other];
</script>

<span
	role="status"
	class={`${categoryColor} rounded-full px-2 py-1 text-xs font-medium transition-colors`}
	>{category}
</span>
