<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';
	import { ChevronRight } from 'lucide-svelte';

	import { cn } from '$lib/components/ui/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	class={cn(
		'border-input ring-offset-background data-[placeholder]:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
		'group min-h-fit',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronRight
		class="group-data-[state=open]:text-primary-600 group-data-[state=open]:dark:text-primary-400 ml-1 h-4 w-4 text-gray-600 transition-all duration-200 group-data-[state=open]:rotate-90 dark:text-gray-400"
	/>
</SelectPrimitive.Trigger>
