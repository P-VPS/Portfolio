<script setup lang="ts">
import { vReveal } from "@/composables/reveal";

const facts = [
	{ label: "Aujourd’hui", text: "Étudiant à la HEG · développeur indépendant" },
	{ label: "Je cherche", text: "Job étudiant en développement, 40–80 %, idéalement avec du télétravail" },
	{ label: "Basé à", text: "Genève · ouvert à toute la Suisse romande" },
];
</script>

<template>
	<section class="intro section container" aria-labelledby="intro-titre">
		<h2 id="intro-titre" class="visually-hidden">En bref</h2>
		<div class="intro__grid">
			<div class="intro__main">
				<p v-reveal class="t-mono t-signal">En bref</p>
				<p v-reveal:1 class="intro__statement">
					J’aime prendre un logiciel dans son ensemble,
					<span class="intro__muted">du besoin jusqu’à ce qui le fait tourner.</span>
				</p>
			</div>

			<dl class="intro__facts">
				<div v-for="(fact, i) in facts" :key="fact.label" v-reveal:[i] class="fact">
					<dt class="t-mono">{{ fact.label }}</dt>
					<dd>{{ fact.text }}</dd>
				</div>
			</dl>
		</div>
	</section>
</template>

<style scoped lang="scss">
.intro__grid {
	display: grid;
	gap: var(--space-8);

	@include up(md) {
		grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
		column-gap: var(--space-8);
		align-items: start;
	}
}

.intro__main {
	display: flex;
	flex-direction: column;
	gap: var(--space-5);
}

.intro__statement {
	font-size: clamp(1.5rem, 1.1rem + 1.4vw, 2.375rem);
	line-height: 1.22;
	letter-spacing: -0.02em;
	font-weight: 500;
	max-width: 24ch;
}

.intro__muted {
	color: #858178;
}

.intro__facts {
	display: grid;
	gap: var(--space-5);

	@include up(sm) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@include up(md) {
		grid-template-columns: minmax(0, 1fr);
	}
}

.fact {
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding-top: var(--space-3);
	border-top: 1px solid var(--line);

	dd {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.5;
	}
}
</style>
