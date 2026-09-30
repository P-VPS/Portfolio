<script setup lang="ts">
// Easter egg : la touche G affiche la grille de construction.
import { onBeforeUnmount, onMounted, ref } from "vue";

const visible = ref(false);
const columns = ref(12);

const isTyping = (target: EventTarget | null) =>
	target instanceof HTMLElement &&
	(target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

const onKey = (e: KeyboardEvent) => {
	if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
	if (e.key === "g" || e.key === "G") {
		columns.value =
			Number(getComputedStyle(document.documentElement).getPropertyValue("--columns")) || 12;
		visible.value = !visible.value;
	} else if (e.key === "Escape") {
		visible.value = false;
	}
};

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
	<Transition name="grid">
		<div v-if="visible" class="grid-overlay" aria-hidden="true">
			<div class="container grid grid-overlay__cols">
				<span v-for="i in columns" :key="i" />
			</div>
			<p class="grid-overlay__badge">Grille · {{ columns }} colonnes · <kbd>G</kbd> pour masquer</p>
		</div>
	</Transition>
</template>

<style scoped lang="scss">
.grid-overlay {
	position: fixed;
	inset: 0;
	z-index: 40;
	pointer-events: none;

	&__cols {
		height: 100%;

		span {
			background: rgba(224, 70, 30, 0.06);
			border-inline: 1px solid rgba(224, 70, 30, 0.22);
		}
	}

	&__badge {
		position: absolute;
		right: 16px;
		bottom: 16px;
		padding: 8px 12px;
		background: var(--ink);
		color: var(--surface);
		border-radius: var(--radius);
		font-family: var(--font-mono);
		font-size: 0.6875rem;

		kbd {
			font-family: inherit;
			color: #f08a6c;
		}
	}
}

.grid-enter-active,
.grid-leave-active {
	transition: opacity var(--dur-fast) var(--ease);
}

.grid-enter-from,
.grid-leave-to {
	opacity: 0;
}
</style>
