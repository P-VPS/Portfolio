<script setup lang="ts">
import { layers } from "@/content/layers";
import { languages, skills } from "@/content/skills";
import { projects } from "@/content/projects";
import type { LayerId } from "@/content/types";
import { stack } from "@/composables/stackState";
import { vReveal } from "@/composables/reveal";
import SectionHead from "@/components/ui/SectionHead.vue";

const refName = (code: string) =>
	code === "EXP" ? "Expériences" : (projects.find((p) => p.code === code)?.name ?? code);

const enter = (id: LayerId) => (stack.hoverLayer = id);
const leave = () => (stack.hoverLayer = null);
</script>

<template>
	<section id="competences" class="section container" aria-labelledby="competences-titre">
		<SectionHead
			id="competences-titre"
			kicker="Compétences"
			title="Couche par couche, avec le projet qui le prouve."
		>
			Pas de pourcentages&#8239;: chaque technologie renvoie aux projets où je l’ai réellement utilisée.
		</SectionHead>

		<div class="layers">
			<section
				v-for="layer in layers"
				:id="`couche-${layer.id}`"
				:key="layer.id"
				v-reveal
				class="layer"
				:class="{ 'is-hover': stack.hoverLayer === layer.id }"
				:aria-labelledby="`couche-${layer.id}-titre`"
				@pointerenter="enter(layer.id)"
				@pointerleave="leave"
			>
				<header class="layer__head">
					<span class="layer__num">{{ layer.id }}</span>
					<h3 :id="`couche-${layer.id}-titre`" class="layer__name">{{ layer.name }}</h3>
					<p class="layer__scope t-mono-plain">{{ layer.scope }}</p>
				</header>
				<ul class="layer__items">
					<li v-for="item in skills[layer.id]" :key="item.name" class="skill">
						<span class="skill__name">{{ item.name }}</span>
						<span class="skill__refs">
							<abbr v-for="code in item.in" :key="code" :title="refName(code)">{{ code }}</abbr>
						</span>
					</li>
				</ul>
			</section>
		</div>

		<p v-reveal class="langs t-mono-plain">
			<span class="t-mono">Langages</span>
			{{ languages.join(" · ") }}
		</p>
	</section>
</template>

<style scoped lang="scss">
.layers {
	display: flex;
	flex-direction: column;
}

.layer {
	display: grid;
	gap: var(--space-4) var(--gutter);
	padding-block: var(--space-5);
	border-top: 1px solid var(--line);
	scroll-margin-top: calc(var(--header-h) + 40px);
	transition: border-color var(--dur-fast) var(--ease);

	&:last-child {
		border-bottom: 1px solid var(--line);
	}

	@include up(md) {
		grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
	}

	&.is-hover {
		border-top-color: var(--ink);
	}

	&__head {
		display: grid;
		grid-template-columns: 2.5em minmax(0, 1fr);
		align-items: baseline;
		gap: 2px 0;
	}

	&__num {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--signal-text);
	}

	&__name {
		font-size: 1.375rem;
		letter-spacing: -0.02em;
	}

	&__scope {
		grid-column: 2;
	}

	&__items {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-content: flex-start;
	}
}

.skill {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	min-height: 36px;
	padding: 4px 6px 4px 12px;
	border: 1px solid var(--line);
	border-radius: var(--radius);
	background: var(--surface);
	font-size: 0.9375rem;
	transition: border-color var(--dur-fast) var(--ease);

	.layer.is-hover & {
		border-color: #bdb8ac;
	}

	&__refs {
		display: inline-flex;
		gap: 3px;
	}

	abbr {
		padding: 2px 5px;
		border-radius: 2px;
		background: var(--paper);
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.04em;
		color: var(--graphite);
		text-decoration: none;
		cursor: help;
	}
}

.langs {
	display: flex;
	flex-wrap: wrap;
	gap: 6px 16px;
	margin-top: var(--space-6);
	color: var(--ink);
}
</style>
