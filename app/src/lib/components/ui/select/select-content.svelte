<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';

	import { cn } from '$lib/components/ui/utils.js';

	import * as Select from './index.js';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		portalProps,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: SelectPrimitive.PortalProps;
	} = $props();
</script>

<SelectPrimitive.Portal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		class={cn(
			'bg-popover text-popover-foreground relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md focus:outline-none',
			className
		)}
		{...restProps}
	>
		<Select.ScrollUpButton />
		<SelectPrimitive.Viewport
			class={cn(
				'h-[var(--bits-select-anchor-height)] w-full min-w-[var(--bits-select-anchor-width)] p-1'
			)}
		>
			{@render children?.()}
		</SelectPrimitive.Viewport>
		<Select.ScrollDownButton />
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
