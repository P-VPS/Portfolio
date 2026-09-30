<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";

const props = withDefaults(
	defineProps<{
		to?: RouteLocationRaw;
		href?: string;
		variant?: "solid" | "outline";
		external?: boolean;
	}>(),
	{ variant: "solid", external: false, to: undefined, href: undefined },
);

const attrs = computed(() => (props.external ? { target: "_blank", rel: "noopener noreferrer" } : {}));
</script>

<template>
	<RouterLink v-if="to" :to="to" class="btn" :class="`btn--${variant}`">
		<slot />
	</RouterLink>
	<a v-else :href="href" class="btn" :class="`btn--${variant}`" v-bind="attrs">
		<slot />
	</a>
</template>

<style scoped lang="scss">
.btn {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	min-height: 48px;
	padding: 0 20px;
	border-radius: var(--radius);
	font-size: 0.9375rem;
	font-weight: 500;
	text-decoration: none;
	white-space: nowrap;
	transition:
		background-color var(--dur-fast) var(--ease),
		color var(--dur-fast) var(--ease),
		border-color var(--dur-fast) var(--ease);

	:deep(.btn__icon) {
		font-family: var(--font-mono);
		transition: transform var(--dur-fast) var(--ease);
	}

	@include hover {
		&:hover :deep(.btn__icon) {
			transform: translate(2px, 0);
		}
	}

	&--solid {
		background: var(--ink);
		color: var(--surface);
		border: 1px solid var(--ink);

		@include hover {
			&:hover {
				background: #2a2d31;
			}
		}
	}

	&--outline {
		border: 1px solid var(--ink);
		color: var(--ink);

		@include hover {
			&:hover {
				background: var(--ink);
				color: var(--surface);
			}
		}
	}
}
</style>
