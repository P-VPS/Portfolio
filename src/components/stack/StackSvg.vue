<script setup lang="ts">
import { computed } from "vue";
import { layers } from "@/content/layers";
import { projects } from "@/content/projects";
import type { LayerId, ProjectCode } from "@/content/types";
import { clamp01, coreX, dotY, lerp, platePolygons, plateY, type StackGeom } from "./geometry";

export interface ActiveLine {
	code: ProjectCode;
	offset: number;
	/** Index (flottant) de la plus haute / plus basse couche traversée. */
	top: number;
	bottom: number;
	opacity: number;
}

const props = withDefaults(
	defineProps<{
		geom: StackGeom;
		/** Couches allumées. */
		on: LayerId[];
		/** 0 = coupe éclatée, 1 = rail. */
		k?: number;
		active?: ActiveLine | null;
		labels?: "full" | "short" | "none";
		fs?: number;
		interactive?: boolean;
	}>(),
	{ k: 0, active: null, labels: "full", fs: 17, interactive: false },
);

const emit = defineEmits<{
	hoverProject: [code: ProjectCode | null];
	selectProject: [code: ProjectCode];
	hoverLayer: [id: LayerId | null];
	selectLayer: [id: LayerId];
}>();

const scale = computed(() => props.geom.a / 210 || 1);
const strokeWidth = computed(() => lerp(1, 2, props.k));

const plates = computed(() =>
	layers
		.map((layer, i) => ({
			layer,
			i,
			poly: platePolygons(props.geom, i),
			on: props.on.includes(layer.id),
		}))
		.reverse(),
);

const idx = (id: LayerId) => layers.findIndex((l) => l.id === id);

// Cœurs des projets non actifs (pointillés discrets dans la vue éclatée)
const cores = computed(() =>
	projects.map((p) => {
		const indices = p.layers.map(idx);
		const x = coreX(props.geom, p.coreOffset);
		const ys = indices.map((i) => dotY(props.geom, i));
		return { code: p.code, slug: p.slug, x, y1: Math.min(...ys), y2: Math.max(...ys), ys };
	}),
);

const coresOpacity = computed(() => clamp01(1 - props.k * 3));

const activeLine = computed(() => {
	const a = props.active;
	if (!a) return null;
	const heroX = coreX(props.geom, a.offset);
	// En rail, le trait se place juste à gauche des graduations
	const x = lerp(heroX, props.geom.cx - props.geom.a - 9, props.k);
	const extend = 5 * props.k;
	const y1 = dotY(props.geom, a.top) - extend;
	const y2 = dotY(props.geom, a.bottom) + extend;
	const project = projects.find((p) => p.code === a.code);
	const dots = project ? project.layers.map((l) => dotY(props.geom, idx(l))) : [];
	return { x, y1, y2, dots, r: 6 * scale.value * (1 - props.k), opacity: a.opacity };
});

const labelOpacity = computed(() => clamp01(1 - props.k * 2.6));
const railNumOpacity = computed(() => clamp01((props.k - 0.72) * 4));

const labelRows = computed(() => {
	const s = scale.value;
	const x0 = props.geom.cx + props.geom.a + 12 * s;
	return layers.map((layer, i) => {
		const y = plateY(props.geom, i);
		return { layer, y, on: props.on.includes(layer.id), x0, x1: x0 + 32 * s, xNum: x0 + 42 * s };
	});
});

const heroHits = computed(() => props.interactive && props.k < 0.05);
const railHits = computed(() => props.interactive && props.k > 0.96);
</script>

<template>
	<g class="stack" :style="{ '--sw': `${strokeWidth}px` }">
		<!-- Plaques, de la plus basse à la plus haute -->
		<g v-for="plate in plates" :key="plate.layer.id" class="plate" :class="{ 'is-on': plate.on }">
			<polygon v-if="k < 0.98" class="plate__side" :points="plate.poly.left" />
			<polygon v-if="k < 0.98" class="plate__side" :points="plate.poly.right" />
			<polygon class="plate__top" :points="plate.poly.top" />
		</g>

		<!-- Cœurs des autres projets -->
		<g v-if="coresOpacity > 0" class="cores" :style="{ opacity: coresOpacity }">
			<g v-for="core in cores" :key="core.code" :class="{ 'is-hidden': active?.code === core.code }">
				<line class="core__line" :x1="core.x" :x2="core.x" :y1="core.y1" :y2="core.y2" />
				<circle
					v-for="(y, i) in core.ys"
					:key="i"
					class="core__dot"
					:cx="core.x"
					:cy="y"
					:r="3.5 * scale"
				/>
			</g>
		</g>

		<!-- Projet actif : le trait vermillon traverse ses couches -->
		<g v-if="activeLine" class="active" :style="{ opacity: activeLine.opacity }">
			<line
				class="active__line"
				:x1="activeLine.x"
				:x2="activeLine.x"
				:y1="activeLine.y1"
				:y2="activeLine.y2"
			/>
			<template v-if="activeLine.r > 0.5">
				<circle
					v-for="(y, i) in activeLine.dots"
					:key="i"
					class="active__dot"
					:cx="activeLine.x"
					:cy="y"
					:r="activeLine.r"
				/>
			</template>
		</g>

		<!-- Étiquettes des couches (vue éclatée) -->
		<g v-if="labels !== 'none' && labelOpacity > 0" class="labels" :style="{ opacity: labelOpacity }">
			<g v-for="row in labelRows" :key="row.layer.id" :class="{ 'is-on': row.on }">
				<line class="label__leader" :x1="row.x0" :x2="row.x1" :y1="row.y" :y2="row.y" />
				<text class="label__num" :x="row.xNum" :y="row.y + fs * 0.35" :font-size="fs * 0.78">
					{{ row.layer.id }}
				</text>
				<text class="label__name" :x="row.xNum + fs * 2.05" :y="row.y + fs * 0.35" :font-size="fs">
					{{ row.layer.name }}
				</text>
				<text
					v-if="labels === 'full'"
					class="label__scope"
					:x="row.xNum + fs * 2.05"
					:y="row.y + fs * 1.55"
					:font-size="fs * 0.7"
				>
					{{ row.layer.scope }}
				</text>
			</g>
		</g>

		<!-- Numéros du rail -->
		<g v-if="railNumOpacity > 0" class="rail-nums" :style="{ opacity: railNumOpacity }">
			<text
				v-for="row in labelRows"
				:key="row.layer.id"
				class="rail-num"
				:class="{ 'is-on': row.on }"
				:x="geom.cx + geom.a + 9"
				:y="row.y + 3.6"
			>
				{{ row.layer.id }}
			</text>
		</g>

		<!-- Zones interactives -->
		<g v-if="heroHits" class="hits">
			<line
				v-for="core in cores"
				:key="core.code"
				class="hit hit--core"
				:x1="core.x"
				:x2="core.x"
				:y1="core.y1 - 10"
				:y2="core.y2 + 10"
				:stroke-width="26 * scale"
				@pointerenter="emit('hoverProject', core.code)"
				@pointerleave="emit('hoverProject', null)"
				@click="emit('selectProject', core.code)"
			/>
		</g>
		<g v-if="railHits" class="hits">
			<rect
				v-for="row in labelRows"
				:key="row.layer.id"
				class="hit hit--layer"
				:x="geom.cx - geom.a - 16"
				:y="row.y - geom.gap / 2"
				:width="geom.a * 2 + 48"
				:height="geom.gap"
				@pointerenter="emit('hoverLayer', row.layer.id)"
				@pointerleave="emit('hoverLayer', null)"
				@click="emit('selectLayer', row.layer.id)"
			/>
		</g>
	</g>
</template>

<style scoped lang="scss">
.plate {
	polygon {
		stroke-width: var(--sw, 1px);
		stroke-linejoin: round;
		transition:
			fill var(--dur-fast) var(--ease),
			stroke var(--dur-fast) var(--ease);
	}

	&__top {
		fill: var(--plate-off-top);
		stroke: var(--plate-off-stroke);
	}

	&__side {
		fill: var(--plate-off-side);
		stroke: var(--plate-off-stroke);
	}

	&.is-on {
		.plate__top {
			fill: var(--plate-top);
			stroke: var(--ink);
		}

		.plate__side {
			fill: var(--plate-side);
			stroke: var(--ink);
		}
	}
}

.core__line {
	stroke: var(--faint);
	stroke-width: 1px;
	stroke-dasharray: 2 4;
}

.core__dot {
	fill: var(--graphite);
}

.is-hidden {
	display: none;
}

.active__line {
	stroke: var(--signal);
	stroke-width: 2.5px;
	stroke-linecap: round;
}

.active__dot {
	fill: var(--signal);
	stroke: var(--surface);
	stroke-width: 2px;
}

.labels {
	font-family: var(--font-sans);

	.label__leader {
		stroke: var(--plate-off-stroke);
		stroke-width: 1px;
		transition: stroke var(--dur-fast) var(--ease);
	}

	.label__num {
		font-family: var(--font-mono);
		fill: var(--faint);
	}

	.label__name {
		font-weight: 500;
		fill: var(--faint);
	}

	.label__scope {
		font-family: var(--font-mono);
		fill: var(--faint);
	}

	text {
		transition: fill var(--dur-fast) var(--ease);
	}

	.is-on {
		.label__leader {
			stroke: var(--ink);
		}

		.label__num {
			fill: var(--signal-text);
		}

		.label__name {
			fill: var(--ink);
		}

		.label__scope {
			fill: var(--graphite);
		}
	}
}

.rail-num {
	font-family: var(--font-mono);
	font-size: 10.5px;
	fill: var(--faint);
	transition: fill var(--dur-fast) var(--ease);

	&.is-on {
		fill: var(--signal-text);
	}
}

.hit {
	fill: transparent;
	stroke: transparent;
	cursor: pointer;

	&--core {
		pointer-events: stroke;
	}

	&--layer {
		pointer-events: all;
	}
}
</style>
