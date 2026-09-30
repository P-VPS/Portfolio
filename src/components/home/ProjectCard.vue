<script setup lang="ts">
import { computed } from "vue";
import type { Project } from "@/content/types";
import { layerSpan } from "@/content/layers";
import { vReveal } from "@/composables/reveal";
import MediaFrame from "@/components/ui/MediaFrame.vue";
import LayerChips from "@/components/ui/LayerChips.vue";
import ArchitectureDiagram from "@/components/project/ArchitectureDiagram.vue";
import StackList from "@/components/project/StackList.vue";

const props = defineProps<{ project: Project; index: number }>();

const number = computed(() => `P.${String(props.index + 1).padStart(2, "0")}`);
const caseLink = computed(() => ({ name: "project", params: { slug: props.project.slug } }));
const flipped = computed(() => props.index % 2 === 1);
</script>

<template>
	<article
		:id="`projet-${project.slug}`"
		class="project"
		:class="[`project--${project.homeVisual}`, { 'is-flipped': flipped }]"
		:data-code="project.code"
		:aria-labelledby="`titre-${project.slug}`"
	>
		<header v-reveal class="project__top">
			<p class="t-mono">
				<span class="t-signal">{{ number }} — {{ project.name }}</span>
				<span class="project__context"> · {{ project.context }}</span>
			</p>
			<p class="t-mono-plain project__span">{{ layerSpan(project.layers) }}</p>
		</header>

		<div class="project__main">
			<div class="project__text">
				<h3
					:id="`titre-${project.slug}`"
					v-reveal
					class="t-h3 project__title"
					:style="{ viewTransitionName: `titre-${project.slug}` }"
				>
					<RouterLink :to="caseLink" class="project__title-link">{{ project.title }}</RouterLink>
				</h3>
				<p v-reveal:1 class="project__summary">{{ project.summary }}</p>

				<dl v-reveal:2 class="meta">
					<div>
						<dt class="t-mono">Rôle</dt>
						<dd>{{ project.role }}</dd>
					</div>
					<div>
						<dt class="t-mono">Période</dt>
						<dd>{{ project.period }}</dd>
					</div>
					<div v-if="project.status">
						<dt class="t-mono">Statut</dt>
						<dd>{{ project.status }}</dd>
					</div>
				</dl>

				<LayerChips v-reveal:3 :active="project.layers" />
			</div>

			<div class="project__visual">
				<div v-if="project.homeVisual === 'phones'" class="phones">
					<MediaFrame
						v-for="(m, i) in project.media.slice(0, 3)"
						:key="m.file"
						v-reveal:[i]="'figure'"
						:media="m"
						:label="`FIG. 0${i + 1}`"
						compact
					/>
				</div>

				<MediaFrame
					v-else-if="project.homeVisual === 'screen' || project.homeVisual === 'photo'"
					v-reveal="'figure'"
					:media="project.media[0]!"
					label="FIG. 01"
				/>

				<div v-else-if="project.homeVisual === 'diagram' && project.diagram" class="panel">
					<ArchitectureDiagram :diagram="project.diagram" compact />
				</div>

				<dl v-if="project.facts" v-reveal class="facts">
					<div v-for="fact in project.facts" :key="fact.label" class="facts__item">
						<dt class="facts__value">{{ fact.value }}</dt>
						<dd class="facts__label">{{ fact.label }}</dd>
					</div>
				</dl>
			</div>
		</div>

		<ol class="highlights">
			<li
				v-for="(h, i) in project.highlights.slice(0, 3)"
				:key="h.title"
				v-reveal:[i]
				class="highlight"
			>
				<span class="highlight__num t-mono-plain">0{{ i + 1 }}</span>
				<h4 class="highlight__title">{{ h.title }}</h4>
				<p class="highlight__text">{{ h.text }}</p>
			</li>
		</ol>

		<footer v-reveal class="project__foot">
			<StackList :stack="project.stack" inline />
			<div class="project__links">
				<a
					v-if="project.url"
					:href="project.url.href"
					class="link"
					target="_blank"
					rel="noopener noreferrer"
				>
					{{ project.url.label }} ↗
				</a>
				<RouterLink :to="caseLink" class="link project__cta">Lire l’étude de cas →</RouterLink>
			</div>
		</footer>
	</article>
</template>

<style scoped lang="scss">
.project {
	display: flex;
	flex-direction: column;
	gap: var(--space-7);
	padding-top: var(--space-5);
	border-top: 1px solid var(--ink);
}

.project__top {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: var(--space-4);
}

.project__context {
	@include down(md) {
		display: none;
	}
}

.project__span {
	white-space: nowrap;
}

.project__main {
	display: grid;
	gap: var(--space-7);

	@include up(md) {
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		column-gap: var(--space-8);
		align-items: start;

		.is-flipped & {
			grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);

			.project__visual {
				order: -1;
			}
		}
	}
}

.project__text {
	display: flex;
	flex-direction: column;
	gap: var(--space-5);
}

.project__title {
	max-width: 22ch;
}

.project__title-link {
	text-decoration: none;

	@include hover {
		&:hover {
			text-decoration: underline;
			text-decoration-color: var(--signal);
			text-decoration-thickness: 2px;
			text-underline-offset: 0.18em;
		}
	}
}

.project__summary {
	color: var(--graphite);
	max-width: 46ch;
}

.meta {
	display: grid;
	gap: var(--space-4);
	padding-top: var(--space-4);
	border-top: 1px solid var(--line);

	@include up(sm) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	> div {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	dt {
		font-size: 0.625rem;
	}

	dd {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.45;
	}
}

.project__visual {
	display: flex;
	flex-direction: column;
	gap: var(--space-6);
	min-width: 0;
}

// Écrans mobiles : bande horizontale, défilement natif sur petits écrans
.phones {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: clamp(12px, 2vw, 24px);
	padding: 6px;

	@include down(sm) {
		display: flex;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		margin-right: calc(-1 * var(--margin));
		padding-right: var(--margin);

		&::-webkit-scrollbar {
			display: none;
		}

		> * {
			flex: 0 0 62%;
			scroll-snap-align: start;
		}
	}
}

.panel {
	padding: clamp(16px, 2.5vw, 28px);
	border: 1px solid var(--line);
	border-radius: var(--radius);
	background: var(--surface);
}

.facts {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: var(--space-4) var(--gutter);

	@include up(sm) {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}

	&__item {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-top: 10px;
		border-top: 1px solid var(--line);
	}

	&__value {
		font-size: 1.75rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	&__label {
		margin: 0;
		font-size: 0.8125rem;
		line-height: 1.35;
		color: var(--graphite);
	}
}

.highlights {
	display: grid;
	gap: var(--space-5);

	@include up(md) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		column-gap: var(--space-6);
	}
}

.highlight {
	display: grid;
	grid-template-columns: auto minmax(0, 1fr);
	gap: 4px 12px;
	padding-top: var(--space-4);
	border-top: 1px solid var(--line);

	&__num {
		grid-row: span 2;
		color: var(--signal-text);
		padding-top: 3px;
	}

	&__title {
		font-size: 1.0625rem;
		font-weight: 500;
		letter-spacing: -0.01em;
	}

	&__text {
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--graphite);
	}
}

.project__foot {
	display: flex;
	flex-direction: column;
	gap: var(--space-5);

	@include up(md) {
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}
}

.project__links {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-5);
	font-size: 1rem;
	white-space: nowrap;
}
</style>
