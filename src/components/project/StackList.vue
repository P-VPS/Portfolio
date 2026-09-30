<script setup lang="ts">
import { computed } from "vue";
import { layers } from "@/content/layers";
import type { Project } from "@/content/types";

const props = defineProps<{ stack: Project["stack"]; inline?: boolean }>();

const rows = computed(() =>
	layers.filter((l) => props.stack[l.id]?.length).map((l) => ({ layer: l, items: props.stack[l.id]! })),
);
</script>

<template>
	<dl class="stack-list" :class="{ 'stack-list--inline': inline }">
		<div v-for="row in rows" :key="row.layer.id" class="stack-list__row">
			<dt>
				<span class="stack-list__num">{{ row.layer.id }}</span>
				<span class="stack-list__name">{{ row.layer.name }}</span>
			</dt>
			<dd>{{ row.items.join(" · ") }}</dd>
		</div>
	</dl>
</template>

<style scoped lang="scss">
.stack-list {
	display: grid;
	gap: 6px;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	line-height: 1.55;

	&__row {
		display: grid;
		grid-template-columns: 2.2em minmax(0, 1fr);
		gap: 0 8px;

		@include up(sm) {
			grid-template-columns: 11em minmax(0, 1fr);
		}
	}

	dt {
		display: flex;
		gap: 8px;
	}

	dd {
		margin: 0;
		color: var(--ink);
	}

	&__num {
		color: var(--signal-text);
	}

	&__name {
		color: var(--graphite);

		@include down(sm) {
			display: none;
		}
	}

	&--inline {
		.stack-list__name {
			display: none;
		}

		.stack-list__row {
			grid-template-columns: 2.2em minmax(0, 1fr);
		}
	}
}
</style>
