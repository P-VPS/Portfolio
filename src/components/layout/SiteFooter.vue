<script setup lang="ts">
import { site } from "@/content/site";

const year = new Date().getFullYear();
</script>

<template>
	<footer class="footer container">
		<p>© {{ year }} {{ site.name }}</p>
		<p class="footer__made">Conçu et développé par moi · Vue 3, SCSS, SVG et GSAP</p>
		<p class="footer__hint">
			<kbd>G</kbd>
			<span>affiche la grille</span>
		</p>
	</footer>
</template>

<style scoped lang="scss">
.footer {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: var(--space-3) var(--space-6);
	padding-block: var(--space-6) var(--space-7);
	border-top: 1px solid var(--line);
	font-family: var(--font-mono);
	font-size: 0.6875rem;
	color: var(--graphite);
}

.footer__hint {
	display: none;
	align-items: center;
	gap: 8px;

	@include up(lg) {
		display: flex;
	}
}

kbd {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border: 1px solid var(--graphite);
	border-bottom-width: 2px;
	border-radius: 3px;
	font-family: var(--font-mono);
	font-size: 0.625rem;
	color: var(--ink);
}
</style>
