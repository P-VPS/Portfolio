<script setup lang="ts">
import { computed } from "vue";
import { layers } from "@/content/layers";
import type { LayerId } from "@/content/types";

const props = withDefaults(defineProps<{ active: LayerId[]; showAll?: boolean }>(), { showAll: false });

const items = computed(() =>
	layers
		.filter((l) => props.showAll || props.active.includes(l.id))
		.map((l) => ({ ...l, on: props.active.includes(l.id) })),
);
</script>

<template>
	<ul class="chips" aria-label="Couches traversées">
		<li v-for="item in items" :key="item.id" class="chip" :class="{ 'is-off': !item.on }">
			<span class="chip__num">{{ item.id }}</span
			>{{ item.name }}
		</li>
	</ul>
</template>

<style scoped lang="scss">
.chips {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}

.chip {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	height: 28px;
	padding: 0 10px;
	border: 1px solid var(--ink);
	border-radius: var(--radius);
	background: var(--surface);
	font-size: 0.8125rem;
	white-space: nowrap;

	&.is-off {
		border-color: var(--line);
		background: transparent;
		color: var(--faint);

		.chip__num {
			color: var(--faint);
		}
	}
}

.chip__num {
	font-family: var(--font-mono);
	font-size: 0.6875rem;
	color: var(--signal-text);
}
</style>
