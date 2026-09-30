<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import { layerIndex, layerSpan, layers } from "@/content/layers";
import { site } from "@/content/site";
import type { ProjectCode } from "@/content/types";
import { stack } from "@/composables/stackState";
import { DESKTOP_QUERY, prefersReducedMotion, useMediaQuery } from "@/composables/useMediaQuery";
import StackSvg, { type ActiveLine } from "@/components/stack/StackSvg.vue";
import { DESIGN, designGeom } from "@/components/stack/geometry";
import ButtonLink from "@/components/ui/ButtonLink.vue";

gsap.registerPlugin(ScrollTrigger);

const hero = ref<HTMLElement>();
const anchor = ref<HTMLElement>();
const isDesktop = useMediaQuery(DESKTOP_QUERY);
const reduced = prefersReducedMotion();

const current = computed(() => projects.find((p) => p.code === stack.heroProject) ?? null);

// --- Version inline (mobile / tablette) ---------------------------------
const inlineGeom = designGeom(1);
const inlineLine = computed<ActiveLine | null>(() => {
	const p = current.value;
	if (!p) return null;
	return {
		code: p.code,
		offset: p.coreOffset,
		top: layerIndex(p.layers[0]!),
		bottom: layerIndex(p.layers[p.layers.length - 1]!),
		opacity: 1,
	};
});
const inlineOn = computed(() => current.value?.layers ?? layers.map((l) => l.id));

// La légende et l'indice de scroll s'effacent pendant que la coupe devient le rail
const fadeOut = computed(() => (isDesktop.value ? { opacity: Math.max(0, 1 - stack.progress * 4) } : {}));

// --- Défilement automatique des projets tant que le visiteur n'a rien survolé
let timer: number | undefined;
const startCycle = () => {
	stopCycle();
	if (reduced) return;
	timer = window.setInterval(() => {
		if (stack.heroPinned || stack.progress > 0.05) return;
		const i = projects.findIndex((p) => p.code === stack.heroProject);
		stack.heroProject = projects[(i + 1) % projects.length]!.code;
	}, 2800);
};
const stopCycle = () => window.clearInterval(timer);

const pick = (code: ProjectCode) => {
	stack.heroPinned = true;
	stack.heroProject = code;
};

// --- Scroll : la coupe devient le rail (desktop) --------------------------
let trigger: ScrollTrigger | undefined;
let pastTrigger: ScrollTrigger | undefined;

const setupScroll = () => {
	trigger?.kill();
	if (!hero.value) return;
	trigger = ScrollTrigger.create({
		trigger: hero.value,
		start: "top top",
		end: "bottom top",
		scrub: reduced ? false : 0.6,
		onUpdate: (self) => {
			stack.progress = reduced ? (self.progress > 0.4 ? 1 : 0) : self.progress;
		},
	});
};

const onPointerMove = (e: PointerEvent) => {
	if (!isDesktop.value || reduced || stack.progress > 0.05 || !hero.value) return;
	const r = hero.value.getBoundingClientRect();
	const nx = (e.clientX - r.left) / r.width; // 0 → 1
	gsap.to(stack, { spread: 0.94 + nx * 0.12, duration: 0.9, ease: "power3.out", overwrite: "auto" });
};

watch(isDesktop, async (desktop) => {
	await nextTick();
	stack.anchor = desktop ? (anchor.value ?? null) : null;
	ScrollTrigger.refresh();
});

onMounted(async () => {
	stack.heroProject = stack.heroProject ?? "JAL";
	await nextTick();
	stack.anchor = isDesktop.value ? (anchor.value ?? null) : null;

	// Entrée : les plaques se déplient
	if (!reduced) {
		stack.spread = 0.3;
		stack.intro = 0;
		gsap.to(stack, { spread: 1, intro: 1, duration: 1.1, ease: "power3.out", delay: 0.15 });
	}

	setupScroll();
	pastTrigger = ScrollTrigger.create({
		trigger: hero.value,
		start: "bottom 20%",
		onToggle: (self) => (stack.pastHero = self.isActive),
	});
	startCycle();
});

onBeforeUnmount(() => {
	stopCycle();
	trigger?.kill();
	pastTrigger?.kill();
	stack.anchor = null;
	stack.pastHero = false;
	gsap.killTweensOf(stack);
	stack.spread = 1;
	stack.intro = 1;
});
</script>

<template>
	<section ref="hero" class="hero" aria-labelledby="hero-title" @pointermove="onPointerMove">
		<div class="hero__inner container">
			<div class="hero__text">
				<p class="t-mono hero__kicker">
					<span>{{ site.name }} — {{ site.role }}</span>
					<span class="hero__loc">{{ site.location }}</span>
				</p>
				<h1 id="hero-title" class="t-display hero__title">
					Je construis des logiciels en entier&#8239;: l’écran, le serveur, et ce qui les fait
					tourner.
				</h1>
				<p class="t-lead hero__lead">
					Applications web et mobiles, API, bases de données, conteneurs et déploiement. Et quand il
					le faut, le matériel et le réseau autour.
				</p>
				<div class="hero__actions">
					<ButtonLink :to="{ path: '/', hash: '#projets' }">
						Voir les projets <span class="btn__icon" aria-hidden="true">↓</span>
					</ButtonLink>
					<p class="status">
						<span class="status__dot" aria-hidden="true" />{{ site.availability }}
					</p>
				</div>
			</div>

			<div class="hero__visual">
				<!-- Desktop : la coupe est dessinée dans le calque fixe (StackStage), ici on réserve sa place -->
				<div v-if="isDesktop" ref="anchor" class="hero__anchor" aria-hidden="true" />
				<svg
					v-else
					class="hero__svg"
					:viewBox="`20 -10 ${DESIGN.width + 60} 620`"
					role="img"
					:aria-label="
						current
							? `Coupe en cinq couches : ${current.name} traverse les couches ${layerSpan(current.layers)}`
							: 'Coupe en cinq couches'
					"
				>
					<StackSvg
						:geom="inlineGeom"
						:on="inlineOn"
						:active="inlineLine"
						labels="short"
						:fs="30"
					/>
				</svg>

				<div class="legend" :style="fadeOut">
					<p class="t-mono-plain legend__hint">
						<template v-if="current">
							<span class="t-signal">{{ current.name }}</span> ·
							{{ layerSpan(current.layers) }} · {{ current.layers.length }} couche{{
								current.layers.length > 1 ? "s" : ""
							}}
						</template>
						<template v-else>Chaque projet traverse la pile à sa façon</template>
					</p>
					<ul class="legend__list" aria-label="Projets sur la coupe">
						<li v-for="p in projects" :key="p.code">
							<button
								type="button"
								class="legend__item"
								:class="{ 'is-active': p.code === stack.heroProject }"
								:aria-pressed="p.code === stack.heroProject"
								@pointerenter="isDesktop && pick(p.code)"
								@focus="pick(p.code)"
								@click="pick(p.code)"
							>
								<span class="legend__code">{{ p.code }}</span
								>{{ p.name }}
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<p class="hero__scroll t-mono-plain" aria-hidden="true" :style="fadeOut">
			<span class="hero__scroll-line" />Défiler
		</p>
	</section>
</template>

<style scoped lang="scss">
.hero {
	position: relative;
	padding-top: calc(var(--header-h) + var(--space-6));
	padding-bottom: var(--space-8);

	@include up(lg) {
		min-height: max(720px, 100svh);
		display: flex;
		align-items: center;
		padding-bottom: var(--space-7);
	}
}

.hero__inner {
	display: grid;
	gap: var(--space-7);

	@include up(md) {
		grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
		column-gap: var(--gutter);
		align-items: center;
	}

	@include up(lg) {
		grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
	}
}

.hero__text {
	display: flex;
	flex-direction: column;
	gap: var(--space-5);

	@include up(lg) {
		gap: var(--space-6);
	}
}

.hero__kicker {
	display: flex;
	flex-wrap: wrap;
	column-gap: 1.2em;

	.hero__loc {
		color: var(--faint);
	}
}

.hero__title {
	max-width: 18ch;
}

.hero__lead {
	max-width: 36em;
}

.hero__actions {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: var(--space-3) var(--space-4);
	margin-top: var(--space-2);
}

.status {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	min-height: 34px;
	padding: 0 12px;
	border: 1px solid var(--line);
	border-radius: var(--radius);
	background: var(--surface);
	font-size: 0.8125rem;

	&__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--signal);
		box-shadow: 0 0 0 0 rgba(224, 70, 30, 0.5);
		animation: pulse 2.4s var(--ease) infinite;
	}
}

@keyframes pulse {
	0% {
		box-shadow: 0 0 0 0 rgba(224, 70, 30, 0.45);
	}
	70%,
	100% {
		box-shadow: 0 0 0 8px rgba(224, 70, 30, 0);
	}
}

.hero__visual {
	display: flex;
	flex-direction: column;
	gap: var(--space-5);
	min-width: 0;
}

.hero__anchor {
	width: 100%;
	max-width: 680px;
	aspect-ratio: 740 / 700;
}

.hero__svg {
	width: 100%;
	max-width: 520px;
	height: auto;
	overflow: visible;
	margin-inline: auto;
}

.legend {
	display: flex;
	flex-direction: column;
	gap: var(--space-3);

	&__hint {
		min-height: 1.6em;
	}

	&__list {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;

		@include down(sm) {
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
			margin-right: calc(-1 * var(--margin));
			padding-right: var(--margin);

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}

	&__item {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		min-height: 36px;
		padding: 0 11px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		font-size: 0.8125rem;
		white-space: nowrap;
		transition:
			background-color var(--dur-fast) var(--ease),
			color var(--dur-fast) var(--ease),
			border-color var(--dur-fast) var(--ease);

		@include hover {
			&:hover {
				border-color: var(--ink);
			}
		}

		&.is-active {
			background: var(--ink);
			border-color: var(--ink);
			color: var(--surface);

			.legend__code {
				color: #f08a6c;
			}
		}
	}

	&__code {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--graphite);
		transition: color var(--dur-fast) var(--ease);
	}
}

.hero__scroll {
	display: none;

	@include up(lg) {
		position: absolute;
		left: 40px;
		bottom: 28px;
		display: flex;
		align-items: center;
		gap: 10px;
	}
}

.hero__scroll-line {
	display: block;
	width: 1px;
	height: 22px;
	background: var(--ink);
	transform-origin: top;
	animation: scroll-hint 2.2s var(--ease) infinite;

	@include reduced-motion {
		animation: none;
	}
}

@keyframes scroll-hint {
	0% {
		transform: scaleY(0);
	}
	50% {
		transform: scaleY(1);
		transform-origin: top;
	}
	51% {
		transform-origin: bottom;
	}
	100% {
		transform: scaleY(0);
		transform-origin: bottom;
	}
}
</style>
