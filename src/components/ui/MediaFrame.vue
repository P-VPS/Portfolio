<script setup lang="ts">
import { computed } from "vue";
import type { MediaSpec } from "@/content/types";
import { resolveMedia } from "@/composables/media";
import { prefersReducedMotion } from "@/composables/useMediaQuery";

const props = withDefaults(
	defineProps<{
		media: MediaSpec;
		/** Préfixe de légende, ex. « FIG. 01 ». */
		label?: string;
		caption?: boolean;
		/** Placeholder condensé (petites vignettes). */
		compact?: boolean;
		eager?: boolean;
	}>(),
	{ label: "", caption: true, compact: false, eager: false },
);

const resolved = computed(() => resolveMedia(props.media));
const kindLabel = computed(
	() =>
		({
			mobile: "Capture mobile",
			desktop: "Capture desktop",
			photo: "Photo",
			video: "Vidéo",
		})[props.media.kind],
);
// Captures d'interface : on montre tout l'écran. Photos et vidéos : on remplit le cadre.
const fit = computed(
	() => props.media.fit ?? (props.media.kind === "photo" || props.media.kind === "video" ? "cover" : "contain"),
);
const autoplay = !prefersReducedMotion();
</script>

<template>
	<figure class="media" :class="[`media--${media.kind}`, { 'media--compact': compact }]">
		<div
			class="media__frame"
			:class="resolved && `media__frame--${fit}`"
			:style="{ aspectRatio: media.ratio }"
			:data-media-file="media.file"
		>
			<template v-if="resolved">
				<video
					v-if="resolved.isVideo"
					class="media__asset"
					:style="media.position && { objectPosition: media.position }"
					:src="resolved.url"
					:autoplay="autoplay"
					:controls="!autoplay"
					muted
					loop
					playsinline
					preload="metadata"
					:aria-label="media.alt"
				/>
				<img
					v-else
					class="media__asset"
					:style="media.position && { objectPosition: media.position }"
					:src="resolved.url"
					:alt="media.alt"
					:loading="eager ? 'eager' : 'lazy'"
					decoding="async"
				/>
			</template>

			<!-- Placeholder : à remplacer en déposant le fichier (voir MEDIAS.md) -->
			<div v-else class="placeholder" role="img" :aria-label="`Emplacement réservé : ${media.alt}`">
				<div class="placeholder__card">
					<span class="placeholder__tag">À fournir</span>
					<span class="placeholder__brief">{{ media.brief }}</span>
					<span v-if="!compact" class="placeholder__spec"
						>{{ kindLabel }} · {{ media.ratio.replace(" / ", ":") }}</span
					>
					<span v-if="!compact" class="placeholder__spec">{{ media.size }}</span>
					<span class="placeholder__file">{{ media.file }}</span>
				</div>
			</div>

			<span class="tick tick--tl" /><span class="tick tick--tr" /><span class="tick tick--bl" /><span
				class="tick tick--br"
			/>
		</div>
		<figcaption v-if="caption" class="media__caption">
			<span v-if="label" class="media__label">{{ label }}</span>
			{{ media.caption }}
		</figcaption>
	</figure>
</template>

<style scoped lang="scss">
.media {
	display: flex;
	flex-direction: column;
	gap: 14px;
	min-width: 0;
}

.media__frame {
	position: relative;
	width: 100%;
	border-radius: var(--radius);
	background: var(--surface);

	.media--mobile & {
		border-radius: 18px;
	}
}

.media__asset {
	// En absolu : le cadre garde toujours son ratio, quelle que soit la taille du fichier
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: inherit;
	box-shadow: 0 0 0 1px rgba(22, 24, 27, 0.08);
}

// Capture entière posée sur une surface neutre (passe-partout), sans recadrage
.media__frame--contain {
	--mat: clamp(6px, 2.5cqw, 20px);
	container-type: inline-size;
	border: 1px solid var(--line-soft);

	.media--mobile & {
		--mat: clamp(6px, 5cqw, 16px);
	}

	.media__asset {
		inset: var(--mat);
		width: calc(100% - 2 * var(--mat));
		height: calc(100% - 2 * var(--mat));
		object-fit: contain;
		border-radius: 0;
		box-shadow: none;
		// Liseré et ombre qui suivent l'image réelle, pas la boîte
		filter: drop-shadow(0 0 0.5px rgba(22, 24, 27, 0.35)) drop-shadow(0 6px 14px rgba(22, 24, 27, 0.07));
	}
}

.media__caption {
	font-family: var(--font-mono);
	font-size: 0.6875rem;
	letter-spacing: 0.04em;
	color: var(--graphite);
	line-height: 1.5;
}

.media__label {
	color: var(--ink);
	margin-right: 0.5em;
}

// Repères d'angle : discrets, uniquement sur les figures
.tick {
	position: absolute;
	width: 9px;
	height: 9px;
	border: 0 solid var(--ink);
	pointer-events: none;
	opacity: 0.8;

	&--tl {
		left: -6px;
		top: -6px;
		border-left-width: 1px;
		border-top-width: 1px;
	}
	&--tr {
		right: -6px;
		top: -6px;
		border-right-width: 1px;
		border-top-width: 1px;
	}
	&--bl {
		left: -6px;
		bottom: -6px;
		border-left-width: 1px;
		border-bottom-width: 1px;
	}
	&--br {
		right: -6px;
		bottom: -6px;
		border-right-width: 1px;
		border-bottom-width: 1px;
	}
}

.placeholder {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px;
	border: 1px solid var(--line);
	border-radius: inherit;
	overflow: hidden;
	background-color: #f6f4ef;
	background-image: repeating-linear-gradient(135deg, transparent 0 9px, #dfdbd1 9px 10px);
}

.placeholder__card {
	display: flex;
	flex-direction: column;
	gap: 3px;
	max-width: min(92%, 340px);
	padding: 12px 14px;
	background: var(--surface);
	border: 1px solid var(--line);
	border-radius: var(--radius);
	font-family: var(--font-mono);
	font-size: 0.6875rem;
	line-height: 1.5;
	color: var(--graphite);

	.media--compact & {
		padding: 8px 10px;
		font-size: 0.625rem;
	}
}

.placeholder__tag {
	color: var(--signal-text);
	letter-spacing: 0.08em;
	text-transform: uppercase;
}

.placeholder__brief {
	color: var(--ink);
	font-family: var(--font-sans);
	font-size: 0.8125rem;
	line-height: 1.4;
	margin-bottom: 4px;

	.media--compact & {
		font-size: 0.75rem;
	}
}

.placeholder__file {
	margin-top: 4px;
	color: var(--faint);
	word-break: break-all;
}
</style>
