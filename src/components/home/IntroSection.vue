<script setup lang="ts">
import { vReveal } from "@/composables/reveal";

const facts = [
	{
		label: "Aujourd’hui",
		text: "Étudiant en informatique de gestion à la HEG, et développeur indépendant.",
	},
	{
		label: "Je cherche",
		text: "Un job étudiant en développement, de 40 à 80 %, idéalement avec du télétravail.",
	},
	{ label: "Basé à", text: "Genève, ouvert à toute la Suisse romande." },
	{ label: "Parcours", text: "CFC de développeur, ES en informatique de gestion, puis HEG." },
];

const environments = [
	"App mobile",
	"Site public",
	"Back-office",
	"Excel / VBA",
	"Conteneurs",
	"Réseau et régies",
];
</script>

<template>
	<section class="intro section container" aria-labelledby="intro-titre">
		<h2 id="intro-titre" class="visually-hidden">En bref</h2>
		<div class="intro__grid">
			<div class="intro__main">
				<p v-reveal class="t-mono t-signal">En bref</p>
				<p v-reveal:1 class="intro__statement">
					J’aime prendre un logiciel dans son ensemble&#8239;: comprendre le besoin, concevoir
					l’interface, écrire l’API, structurer les données, puis m’occuper de ce qui le fait
					tourner.
					<span class="intro__muted"
						>Des contextes très différents, avec à chaque fois un système complet à faire
						fonctionner.</span
					>
				</p>
				<div v-reveal:2 class="envs">
					<p class="t-mono">Environnements traversés</p>
					<ul class="envs__list">
						<li v-for="env in environments" :key="env">{{ env }}</li>
					</ul>
				</div>
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
	gap: var(--space-6);
}

.intro__statement {
	font-size: clamp(1.5rem, 1.1rem + 1.4vw, 2.375rem);
	line-height: 1.22;
	letter-spacing: -0.02em;
	font-weight: 500;
	max-width: 30ch;
}

.intro__muted {
	color: #858178;
}

.envs {
	display: flex;
	flex-direction: column;
	gap: var(--space-3);

	&__list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;

		li {
			padding: 6px 10px;
			border: 1px solid var(--line);
			border-radius: var(--radius);
			font-size: 0.875rem;
			background: var(--surface);
		}
	}
}

.intro__facts {
	display: grid;
	gap: var(--space-5);

	@include up(sm) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
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
