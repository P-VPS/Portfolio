<script setup lang="ts">
import { journey } from "@/content/journey";
import { vReveal } from "@/composables/reveal";
import SectionHead from "@/components/ui/SectionHead.vue";
</script>

<template>
	<section id="parcours" class="section container" aria-labelledby="parcours-titre">
		<SectionHead
			id="parcours-titre"
			kicker="Parcours"
			title="Du CFC à la HEG, avec du terrain entre les deux."
		/>

		<ol class="timeline">
			<li
				v-for="(entry, i) in journey"
				:key="entry.title + entry.period"
				v-reveal:[Math.min(i,3)]
				class="entry"
				:class="{ 'is-current': entry.current }"
			>
				<p class="entry__period t-mono-plain">
					<span class="entry__dot" aria-hidden="true" />{{ entry.period }}
				</p>
				<div class="entry__body">
					<p class="entry__kind t-mono">{{ entry.kind }}</p>
					<h3 class="entry__title">
						{{ entry.title
						}}<span v-if="entry.place" class="entry__place">{{ entry.place }}</span>
					</h3>
					<p v-if="entry.text" class="entry__text">{{ entry.text }}</p>
				</div>
				<RouterLink
					v-if="entry.project"
					:to="{ name: 'project', params: { slug: entry.project } }"
					class="link entry__link"
				>
					Voir le projet →
				</RouterLink>
			</li>
		</ol>
	</section>
</template>

<style scoped lang="scss">
.timeline {
	display: flex;
	flex-direction: column;
}

.entry {
	display: grid;
	gap: var(--space-2) var(--gutter);
	padding-block: var(--space-5);
	border-top: 1px solid var(--line);

	&:last-child {
		border-bottom: 1px solid var(--line);
	}

	@include up(md) {
		grid-template-columns: minmax(0, 3fr) minmax(0, 7fr) minmax(0, 2fr);
		align-items: baseline;
	}

	&__period {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--ink);
	}

	&__dot {
		width: 7px;
		height: 7px;
		border: 1px solid var(--ink);
		border-radius: 50%;

		.is-current & {
			background: var(--signal);
			border-color: var(--signal);
		}
	}

	&__body {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__kind {
		font-size: 0.625rem;
	}

	&__title {
		font-size: clamp(1.125rem, 1rem + 0.4vw, 1.375rem);
		letter-spacing: -0.015em;
		line-height: 1.25;
	}

	&__place {
		display: block;
		margin-top: 2px;
		font-size: 0.9375rem;
		letter-spacing: 0;
		color: var(--graphite);
		font-weight: 400;
	}

	&__text {
		font-size: 0.9375rem;
		color: var(--graphite);
		max-width: 56ch;
	}

	&__link {
		justify-self: start;
		font-size: 0.9375rem;
		white-space: nowrap;

		@include up(md) {
			justify-self: end;
		}
	}
}
</style>
