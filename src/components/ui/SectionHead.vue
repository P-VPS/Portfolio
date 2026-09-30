<script setup lang="ts">
import { vReveal } from "@/composables/reveal";

defineProps<{ kicker: string; title: string; id?: string }>();
</script>

<template>
	<header class="section-head">
		<p v-reveal class="t-mono t-signal">{{ kicker }}</p>
		<h2 :id="id" v-reveal:1 class="t-h2 section-head__title">{{ title }}</h2>
		<div v-if="$slots.default" v-reveal:2 class="section-head__aside t-lead">
			<slot />
		</div>
	</header>
</template>

<style scoped lang="scss">
.section-head {
	display: grid;
	gap: var(--space-4);
	margin-bottom: var(--space-8);

	@include up(md) {
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		column-gap: var(--gutter);
		align-items: end;

		> p {
			grid-column: 1 / -1;
		}
	}
}

.section-head__title {
	max-width: 16ch;
}

.section-head__aside {
	max-width: 44ch;

	@include up(md) {
		justify-self: end;
	}
}
</style>
