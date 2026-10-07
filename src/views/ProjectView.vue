<script setup lang="ts">
import { computed, onMounted } from "vue";
import { projects } from "@/content/projects";
import { layerSpan } from "@/content/layers";
import type { Project } from "@/content/types";
import { stack } from "@/composables/stackState";
import { vReveal } from "@/composables/reveal";
import MediaFrame from "@/components/ui/MediaFrame.vue";
import LayerChips from "@/components/ui/LayerChips.vue";
import ArchitectureDiagram from "@/components/project/ArchitectureDiagram.vue";
import StackList from "@/components/project/StackList.vue";

const props = defineProps<{ slug: string }>();

const index = computed(() => projects.findIndex((p) => p.slug === props.slug));
const project = computed<Project>(() => projects[index.value]!);
const next = computed(() => projects[(index.value + 1) % projects.length]!);
const number = computed(() => `P.${String(index.value + 1).padStart(2, "0")}`);

// Médias : en tête, puis galerie
const heroMedia = computed(() =>
	project.value.homeVisual === "phones"
		? project.value.media.filter((m) => m.kind === "mobile")
		: project.value.media.slice(0, 1),
);
const gallery = computed(() => project.value.media.filter((m) => !heroMedia.value.includes(m)));
const galleryMobile = computed(() => gallery.value.filter((m) => m.kind === "mobile"));
const galleryWide = computed(() => gallery.value.filter((m) => m.kind !== "mobile"));
const fig = (i: number) => `FIG. ${String(i + 1).padStart(2, "0")}`;

stack.mode = "case";
stack.readingProject = project.value.code;

onMounted(() => (document.title = `${project.value.name} — Sébastien Voide`));
</script>

<template>
	<article class="case" :aria-labelledby="`titre-${project.slug}`">
		<header class="case__head container">
			<RouterLink :to="{ path: '/', hash: `#projet-${project.slug}` }" class="case__back t-mono-plain">
				← Tous les projets
			</RouterLink>
			<p class="t-mono">
				<span class="t-signal">{{ number }} — {{ project.name }}</span>
				<span class="case__span"> · {{ layerSpan(project.layers) }}</span>
			</p>
			<h1
				:id="`titre-${project.slug}`"
				class="t-h2 case__title"
				:style="{ viewTransitionName: `titre-${project.slug}` }"
			>
				{{ project.title }}
			</h1>
			<div class="case__intro">
				<p v-reveal class="t-lead case__lead">{{ project.lead }}</p>
				<dl v-reveal:1 class="case__meta">
					<div>
						<dt class="t-mono">Rôle</dt>
						<dd>{{ project.role }}</dd>
					</div>
					<div>
						<dt class="t-mono">Période</dt>
						<dd>{{ project.period }}</dd>
					</div>
					<div>
						<dt class="t-mono">Contexte</dt>
						<dd>{{ project.context }}</dd>
					</div>
					<div v-if="project.status">
						<dt class="t-mono">Statut</dt>
						<dd>{{ project.status }}</dd>
					</div>
					<div v-if="project.url">
						<dt class="t-mono">En ligne</dt>
						<dd>
							<a
								:href="project.url.href"
								class="link"
								target="_blank"
								rel="noopener noreferrer"
							>
								{{ project.url.label }} ↗
							</a>
						</dd>
					</div>
					<div class="case__layers">
						<dt class="t-mono">Couches</dt>
						<dd><LayerChips :active="project.layers" show-all /></dd>
					</div>
				</dl>
			</div>
		</header>

		<div class="container">
			<div class="case__hero" :class="{ 'case__hero--phones': project.homeVisual === 'phones' }">
				<MediaFrame
					v-for="(m, i) in heroMedia"
					:key="m.file"
					v-reveal:[i]="'figure'"
					:media="m"
					:label="fig(i)"
					eager
				/>
			</div>

			<dl v-if="project.facts" class="facts">
				<div v-for="(fact, i) in project.facts" :key="fact.label" v-reveal:[i] class="facts__item">
					<dt class="facts__value">{{ fact.value }}</dt>
					<dd class="facts__label">{{ fact.label }}</dd>
				</div>
			</dl>
		</div>

		<section class="case__block container" aria-labelledby="points-forts">
			<h2 id="points-forts" v-reveal class="t-mono t-signal block-title">Points forts</h2>
			<ol class="highlights">
				<li v-for="(h, i) in project.highlights" :key="h.title" v-reveal:[i%2] class="highlight">
					<span class="highlight__num t-mono-plain">0{{ i + 1 }}</span>
					<h3 class="highlight__title">{{ h.title }}</h3>
					<p class="highlight__text">{{ h.text }}</p>
				</li>
			</ol>
		</section>

		<section v-if="project.diagram" class="case__block container" aria-labelledby="architecture">
			<h2 id="architecture" v-reveal class="t-mono t-signal block-title">Architecture, en simplifié</h2>
			<div class="panel">
				<ArchitectureDiagram :diagram="project.diagram" />
			</div>
		</section>

		<section v-if="project.story" class="case__block container story" aria-labelledby="recit">
			<div class="story__text">
				<p v-reveal class="t-mono t-signal">{{ project.story.kicker }}</p>
				<h2 id="recit" v-reveal:1 class="t-h3">{{ project.story.title }}</h2>
				<p v-for="(para, i) in project.story.paragraphs" :key="i" v-reveal:[i+2] class="story__para">
					{{ para }}
				</p>
			</div>
			<MediaFrame
				v-if="gallery[0]"
				v-reveal="'figure'"
				class="story__media"
				:media="gallery[0]"
				:label="fig(heroMedia.length)"
			/>
		</section>

		<section
			v-if="gallery.length > (project.story ? 1 : 0)"
			class="case__block container"
			aria-labelledby="galerie"
		>
			<h2 id="galerie" v-reveal class="t-mono t-signal block-title">En images</h2>
			<div v-if="galleryMobile.length" class="gallery gallery--mobile">
				<MediaFrame
					v-for="(m, i) in galleryMobile"
					:key="m.file"
					v-reveal:[i]="'figure'"
					:media="m"
					:label="fig(heroMedia.length + gallery.indexOf(m))"
				/>
			</div>
			<div class="gallery">
				<MediaFrame
					v-for="(m, i) in galleryWide.slice(project.story ? 1 : 0)"
					:key="m.file"
					v-reveal:[i%2]="'figure'"
					:media="m"
					:label="fig(heroMedia.length + gallery.indexOf(m))"
				/>
			</div>
		</section>

		<section class="case__block container case__outro" aria-labelledby="bilan">
			<div class="outro__stack">
				<h2 v-reveal class="t-mono t-signal block-title">Technologies et outils</h2>
				<StackList v-reveal :stack="project.stack" />
			</div>
			<div class="outro__proves">
				<h2 id="bilan" v-reveal class="t-mono t-signal block-title">Ce que ce projet montre</h2>
				<p v-reveal:1 class="outro__text">{{ project.proves }}</p>
			</div>
		</section>

		<nav class="case__next container" aria-label="Projet suivant">
			<RouterLink :to="{ name: 'project', params: { slug: next.slug } }" class="next">
				<span class="t-mono">Projet suivant · {{ next.name }}</span>
				<span class="next__title">{{ next.title }}</span>
				<span class="next__arrow" aria-hidden="true">→</span>
			</RouterLink>
		</nav>
	</article>
</template>

<style scoped lang="scss">
.case {
	padding-top: calc(var(--header-h) + var(--space-7));
}

.case__head {
	display: flex;
	flex-direction: column;
	gap: var(--space-4);
	margin-bottom: var(--space-8);
}

.case__back {
	align-self: flex-start;
	min-height: 44px;
	display: inline-flex;
	align-items: center;
	text-decoration: none;
	margin-bottom: var(--space-3);

	@include hover {
		&:hover {
			color: var(--ink);
		}
	}
}

.case__span {
	color: var(--graphite);
}

.case__title {
	max-width: 20ch;
}

.case__intro {
	display: grid;
	gap: var(--space-6);
	margin-top: var(--space-4);

	@include up(md) {
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		column-gap: var(--space-8);
		align-items: start;
	}
}

.case__lead {
	max-width: 34em;
}

.case__meta {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: var(--space-4) var(--gutter);

	> div {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-top: 10px;
		border-top: 1px solid var(--line);
	}

	dt {
		font-size: 0.625rem;
	}

	dd {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.45;
	}
}

.case__layers {
	grid-column: 1 / -1;

	dd {
		margin-top: 4px;
	}
}

.case__hero {
	display: grid;
	gap: var(--space-5);

	&--phones {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(12px, 3vw, 40px);
		max-width: 880px;
		margin-inline: auto;

		@include down(sm) {
			display: flex;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			scrollbar-width: none;
			margin-right: calc(-1 * var(--margin));
			padding: 6px var(--margin) 6px 6px;

			> * {
				flex: 0 0 64%;
				scroll-snap-align: start;
			}
		}
	}
}

.facts {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: var(--space-5) var(--gutter);
	margin-top: var(--space-7);

	@include up(sm) {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}

	&__item {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-top: 12px;
		border-top: 1px solid var(--ink);
	}

	&__value {
		font-size: clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		line-height: 1.05;
	}

	&__label {
		margin: 0;
		font-size: 0.875rem;
		color: var(--graphite);
	}
}

.case__block {
	margin-top: var(--section-gap);
}

.block-title {
	margin-bottom: var(--space-5);
}

.highlights {
	display: grid;
	gap: var(--space-5) var(--space-7);

	@include up(md) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}

.highlight {
	display: grid;
	grid-template-columns: auto minmax(0, 1fr);
	gap: 6px 14px;
	padding-top: var(--space-4);
	border-top: 1px solid var(--ink);

	&__num {
		grid-row: span 2;
		color: var(--signal-text);
		padding-top: 5px;
	}

	&__title {
		font-size: 1.3125rem;
		letter-spacing: -0.015em;
	}

	&__text {
		color: var(--graphite);
		max-width: 40ch;
	}
}

.panel {
	padding: clamp(16px, 3vw, 40px);
	border: 1px solid var(--line);
	border-radius: var(--radius);
	background: var(--surface);
}

.story {
	display: grid;
	gap: var(--space-7);

	@include up(md) {
		grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
		column-gap: var(--space-8);
		align-items: center;
	}

	&__text {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	&__para {
		color: var(--graphite);
		max-width: 46ch;

		&:last-child {
			color: var(--ink);
		}
	}
}

.gallery {
	display: grid;
	gap: var(--space-6) var(--space-5);

	@include up(md) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	&--mobile {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		max-width: 720px;
		margin-bottom: var(--space-7);

		@include up(md) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
}

.case__outro {
	display: grid;
	gap: var(--space-8);

	@include up(md) {
		grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
		column-gap: var(--space-8);
	}
}

.outro__text {
	font-size: clamp(1.25rem, 1.05rem + 0.7vw, 1.75rem);
	line-height: 1.3;
	letter-spacing: -0.015em;
	font-weight: 500;
	max-width: 30ch;
}

.case__next {
	margin-top: var(--section-gap);
	margin-bottom: var(--space-8);
}

.next {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: var(--space-3);
	padding: var(--space-6) 60px var(--space-6) 0;
	border-top: 1px solid var(--ink);
	border-bottom: 1px solid var(--line);
	text-decoration: none;

	&__title {
		font-size: var(--fs-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
		line-height: 1.15;
		max-width: 26ch;
	}

	&__arrow {
		position: absolute;
		right: 0;
		top: 50%;
		translate: 0 -50%;
		font-family: var(--font-mono);
		font-size: 1.5rem;
		transition: transform var(--dur-fast) var(--ease);
	}

	@include hover {
		&:hover .next__arrow {
			transform: translateX(6px);
			color: var(--signal);
		}
	}
}
</style>
