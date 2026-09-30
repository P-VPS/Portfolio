<script setup lang="ts">
/**
 * Scène desktop : la coupe du hero, dessinée dans un calque fixe,
 * qui pivote de profil et se range dans la marge gauche pour devenir le rail.
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import { layers, layerIndex, layerSpan } from "@/content/layers";
import { projects } from "@/content/projects";
import type { LayerId, ProjectCode } from "@/content/types";
import { stack } from "@/composables/stackState";
import { prefersReducedMotion } from "@/composables/useMediaQuery";
import StackSvg, { type ActiveLine } from "./StackSvg.vue";
import { DESIGN, clamp01, coreX, dotY, easeInOut, lerp, plateY, type StackGeom } from "./geometry";

const router = useRouter();

const viewport = reactive({ w: 0, h: 0 });
const frame = ref(0);
let raf = 0;

const requestFrame = () => {
	if (raf) return;
	raf = requestAnimationFrame(() => {
		raf = 0;
		frame.value++;
	});
};
const onResize = () => {
	viewport.w = window.innerWidth;
	viewport.h = window.innerHeight;
	requestFrame();
};

onMounted(() => {
	onResize();
	window.addEventListener("resize", onResize);
	window.addEventListener("scroll", requestFrame, { passive: true });
});
onBeforeUnmount(() => {
	window.removeEventListener("resize", onResize);
	window.removeEventListener("scroll", requestFrame);
	cancelAnimationFrame(raf);
});

const RAIL = { x: 40, half: 11, gap: 30 };

// Deux temps : la pile pivote de profil sur place (forme), puis les traits glissent vers la marge (position).
// Ainsi la coupe ne traverse jamais le titre du hero.
const isHome = computed(() => stack.mode === "home" && !!stack.anchor);
const k = computed(() => (isHome.value ? easeInOut(clamp01(stack.progress / 0.6)) : 1));
const kMove = computed(() => (isHome.value ? easeInOut(clamp01((stack.progress - 0.55) / 0.45)) : 1));

const railGeom = computed<StackGeom>(() => ({
	cx: RAIL.x + RAIL.half,
	a: RAIL.half,
	b: 0,
	t: 0,
	y0: viewport.h / 2 - 2 * RAIL.gap,
	gap: RAIL.gap,
}));

const heroGeom = computed<StackGeom | null>(() => {
	void frame.value; // recalcul à chaque scroll / resize
	const el = stack.anchor;
	if (!el || stack.mode !== "home") return null;
	const r = el.getBoundingClientRect();
	const s = r.width / DESIGN.width;
	const gap = DESIGN.gap * stack.spread;
	return {
		cx: r.left + DESIGN.cx * s,
		a: DESIGN.a * s,
		b: DESIGN.b * s,
		t: DESIGN.t * s,
		y0: r.top + (DESIGN.centerY - 2 * gap - DESIGN.top) * s,
		gap: gap * s,
	};
});

const geom = computed<StackGeom>(() => {
	const h = heroGeom.value;
	const r = railGeom.value;
	if (!h) return r;
	const gap = lerp(h.gap, r.gap, k.value);
	// La pile reste dans l'écran pendant qu'elle pivote (centre ramené vers le milieu du viewport)
	const center = lerp(h.y0 + 2 * h.gap, r.y0 + 2 * r.gap, k.value);
	return {
		cx: lerp(h.cx, r.cx, kMove.value),
		a: lerp(h.a, r.a, k.value),
		b: lerp(h.b, r.b, k.value),
		t: lerp(h.t, r.t, k.value),
		gap,
		y0: center - 2 * gap,
	};
});
const labelFs = computed(() => (heroGeom.value ? 17 * (heroGeom.value.a / DESIGN.a) : 14));

const displayed = computed<ProjectCode | null>(() =>
	k.value < 0.5 ? stack.heroProject : stack.readingProject,
);
const displayedProject = computed(() => projects.find((p) => p.code === displayed.value) ?? null);

const on = computed<LayerId[]>(() => {
	if (stack.hoverLayer && k.value > 0.5) return [stack.hoverLayer];
	return displayedProject.value ? displayedProject.value.layers : layers.map((l) => l.id);
});

// Trait vermillon animé d'un projet à l'autre
const line = reactive<ActiveLine>({ code: "JAL", offset: 0, top: 0, bottom: 0, opacity: 0 });
const reduced = prefersReducedMotion();

watch(
	displayedProject,
	(p) => {
		if (!p) {
			gsap.to(line, { opacity: 0, duration: reduced ? 0 : 0.25, overwrite: true });
			return;
		}
		const target = {
			offset: p.coreOffset,
			top: layerIndex(p.layers[0]!),
			bottom: layerIndex(p.layers[p.layers.length - 1]!),
		};
		line.code = p.code;
		if (line.opacity < 0.05 || reduced) {
			Object.assign(line, target);
			gsap.to(line, { opacity: 1, duration: reduced ? 0 : 0.3, overwrite: true });
		} else {
			gsap.to(line, { ...target, opacity: 1, duration: 0.45, ease: "power3.out", overwrite: true });
		}
	},
	{ immediate: true },
);

const active = computed(() => (line.opacity > 0.01 ? { ...line } : null));

// Infobulle du projet (vue éclatée)
const tooltip = computed(() => {
	const p = displayedProject.value;
	if (!p || k.value > 0.2 || !heroGeom.value) return null;
	const g = geom.value;
	return {
		x: coreX(g, line.offset),
		y: dotY(g, line.top) - 26,
		name: p.name,
		span: layerSpan(p.layers),
		opacity: Math.max(0, 1 - k.value * 5) * line.opacity,
	};
});

// Étiquette de couche au survol du rail
const railLabel = computed(() => {
	if (kMove.value < 0.96 || !stack.hoverLayer) return null;
	const i = layerIndex(stack.hoverLayer);
	return { y: plateY(geom.value, i), layer: layers[i]! };
});

const onHoverProject = (code: ProjectCode | null) => {
	if (code) {
		stack.heroPinned = true;
		stack.heroProject = code;
	}
};
const onSelectProject = (code: ProjectCode) => {
	const p = projects.find((x) => x.code === code);
	if (p)
		document
			.getElementById(`projet-${p.slug}`)
			?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
};
const onSelectLayer = (id: LayerId) => {
	router.push({ path: "/", hash: `#couche-${id}` });
};

const visible = computed(() => stack.mode === "case" || !!stack.anchor);
</script>

<template>
	<div
		v-if="visible"
		class="stage"
		:style="{ opacity: stack.mode === 'home' ? stack.intro : 1 }"
		aria-hidden="true"
	>
		<svg
			class="stage__svg"
			:width="viewport.w"
			:height="viewport.h"
			:viewBox="`0 0 ${viewport.w} ${viewport.h}`"
		>
			<StackSvg
				:geom="geom"
				:on="on"
				:k="k"
				:active="active"
				:fs="labelFs"
				labels="full"
				interactive
				@hover-project="onHoverProject"
				@select-project="onSelectProject"
				@hover-layer="stack.hoverLayer = $event"
				@select-layer="onSelectLayer"
			/>
		</svg>

		<div
			v-if="tooltip"
			class="tooltip"
			:style="{ transform: `translate(${tooltip.x}px, ${tooltip.y}px)`, opacity: tooltip.opacity }"
		>
			<span class="tooltip__name">{{ tooltip.name }}</span>
			<span class="tooltip__span">{{ tooltip.span }}</span>
		</div>

		<div v-if="railLabel" class="rail-label" :style="{ transform: `translate(84px, ${railLabel.y}px)` }">
			<span class="rail-label__num">{{ railLabel.layer.id }}</span>
			{{ railLabel.layer.name }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.stage {
	position: fixed;
	inset: 0;
	z-index: 20;
	pointer-events: none;
}

.stage__svg {
	position: absolute;
	inset: 0;
	overflow: visible;
}

.tooltip {
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	gap: 2px;
	width: max-content;
	max-width: 240px;
	padding: 8px 12px;
	background: var(--ink);
	color: var(--surface);
	border-radius: var(--radius);
	line-height: 1.3;
	translate: -50% -100%;

	&__name {
		font-size: 0.9375rem;
		font-weight: 500;
	}

	&__span {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: #f08a6c;
	}
}

.rail-label {
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	gap: 8px;
	height: 28px;
	padding: 0 10px;
	translate: 0 -50%;
	background: var(--ink);
	color: var(--surface);
	border-radius: var(--radius);
	font-size: 0.8125rem;
	white-space: nowrap;

	&__num {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: #f08a6c;
	}
}
</style>
