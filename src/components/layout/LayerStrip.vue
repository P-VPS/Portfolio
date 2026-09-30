<script setup lang="ts">
// Version mobile / tablette du rail : cinq segments sous le header.
import { computed } from "vue";
import { layers } from "@/content/layers";
import { projects } from "@/content/projects";
import { stack } from "@/composables/stackState";

const on = computed(() => {
	if (stack.hoverLayer) return [stack.hoverLayer];
	const p = projects.find((x) => x.code === stack.readingProject);
	return p ? p.layers : [];
});
</script>

<template>
	<div class="strip" aria-hidden="true">
		<div
			v-for="layer in layers"
			:key="layer.id"
			class="strip__seg"
			:class="{ 'is-on': on.includes(layer.id) }"
		>
			<span class="strip__bar" />
			<span class="strip__num">{{ layer.id }}</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.strip {
	display: flex;
	gap: 4px;
}

.strip__seg {
	flex: 1 1 0;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.strip__bar {
	height: 3px;
	border-radius: 2px;
	background: var(--line);
	transition: background-color 450ms var(--ease);

	.is-on & {
		background: var(--signal);
	}
}

.strip__num {
	font-family: var(--font-mono);
	font-size: 0.5625rem;
	line-height: 1;
	color: var(--faint);
	transition: color 450ms var(--ease);

	.is-on & {
		color: var(--signal-text);
	}
}
</style>
