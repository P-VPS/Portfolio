<script setup lang="ts">
import type { Diagram } from "@/content/types";
import { vReveal } from "@/composables/reveal";

defineProps<{ diagram: Diagram; compact?: boolean }>();
</script>

<template>
	<figure class="diagram" :class="{ 'diagram--compact': compact }">
		<div class="diagram__flow">
			<template v-for="(col, ci) in diagram.columns" :key="ci">
				<div
					v-reveal
					class="col"
					:class="{ 'col--group': col.group }"
					:style="{ '--reveal-i': ci * 2 }"
				>
					<span v-if="col.group" class="col__group">{{ col.group }}</span>
					<div v-for="node in col.nodes" :key="node.title" class="node">
						<span class="node__title">{{ node.title }}</span>
						<span v-if="node.sub" class="node__sub">{{ node.sub }}</span>
					</div>
				</div>
				<div
					v-if="col.link && ci < diagram.columns.length - 1"
					v-reveal
					class="flow-link"
					:class="`flow-link--${col.link.direction}`"
					:style="{ '--reveal-i': ci * 2 + 1 }"
				>
					<span v-if="col.link.label" class="flow-link__label">{{ col.link.label }}</span>
					<span class="flow-link__track">
						<span v-if="col.link.direction !== 'none'" class="flow-link__dot" />
					</span>
				</div>
			</template>
		</div>
		<figcaption class="diagram__caption">{{ diagram.caption }}</figcaption>
	</figure>
</template>

<style scoped lang="scss">
.diagram {
	display: flex;
	flex-direction: column;
	gap: var(--space-4);
}

.diagram__flow {
	display: flex;
	flex-direction: column;
	align-items: stretch;

	@include up(md) {
		flex-direction: row;
		align-items: center;
	}

	.diagram--compact & {
		@include up(md) {
			flex-direction: column;
			align-items: stretch;
		}

		@include up(xl) {
			flex-direction: row;
			align-items: center;
		}
	}
}

.col {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex: 1 1 0;
	min-width: 0;

	&--group {
		padding: 10px 12px 12px;
		border: 1px dashed var(--graphite);
		border-radius: var(--radius);
	}

	&__group {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		line-height: 1.4;
		color: var(--graphite);
	}
}

.node {
	display: flex;
	flex-direction: column;
	gap: 2px;
	padding: 11px 13px;
	border: 1px solid var(--ink);
	border-radius: var(--radius);
	background: var(--surface);

	&__title {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.3;
	}

	&__sub {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		line-height: 1.4;
		color: var(--graphite);
	}
}

// Liaisons : un trait, une étiquette, un point qui circule lentement
.flow-link {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 auto;
	height: 56px;
	padding-left: 28px;

	@include up(md) {
		flex-direction: column;
		height: auto;
		width: clamp(72px, 7vw, 110px);
		padding-left: 0;
		gap: 6px;
	}

	.diagram--compact & {
		@include up(md) {
			flex-direction: row;
			height: 56px;
			width: auto;
			padding-left: 28px;
		}

		@include up(xl) {
			flex-direction: column;
			height: auto;
			width: 92px;
			padding-left: 0;
		}
	}

	&__label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		line-height: 1.3;
		color: var(--signal-text);
		text-align: center;
		max-width: 100%;
		order: 2;

		@include up(md) {
			order: 0;
		}
	}

	&__track {
		position: absolute;
		left: 16px;
		top: 6px;
		bottom: 6px;
		width: 1px;
		background: var(--ink);

		@include up(md) {
			position: relative;
			left: auto;
			top: auto;
			bottom: auto;
			width: 100%;
			height: 1px;
		}
	}
}

.diagram--compact .flow-link__track {
	@include up(md) {
		position: absolute;
		left: 16px;
		top: 6px;
		bottom: 6px;
		width: 1px;
		height: auto;
	}

	@include up(xl) {
		position: relative;
		left: auto;
		top: auto;
		bottom: auto;
		width: 100%;
		height: 1px;
	}
}

.flow-link__dot {
	position: absolute;
	width: 5px;
	height: 5px;
	margin: -2px 0 0 -2px;
	border-radius: 50%;
	background: var(--signal);
	left: 0;
	top: 0;
	animation: flow-v 2.6s var(--ease) infinite;

	@include up(md) {
		animation-name: flow-h;
	}

	.diagram--compact & {
		@include up(md) {
			animation-name: flow-v;
		}
		@include up(xl) {
			animation-name: flow-h;
		}
	}

	.flow-link--left & {
		animation-direction: reverse;
	}

	.flow-link--both & {
		animation-direction: alternate;
		animation-duration: 3.2s;
	}

	@include reduced-motion {
		display: none;
	}
}

@keyframes flow-h {
	0% {
		left: 0;
		opacity: 0;
	}
	15%,
	85% {
		opacity: 1;
	}
	100% {
		left: 100%;
		opacity: 0;
	}
}

@keyframes flow-v {
	0% {
		top: 0;
		opacity: 0;
	}
	15%,
	85% {
		opacity: 1;
	}
	100% {
		top: 100%;
		opacity: 0;
	}
}

.diagram__caption {
	font-family: var(--font-mono);
	font-size: 0.6875rem;
	line-height: 1.5;
	color: var(--graphite);
}
</style>
