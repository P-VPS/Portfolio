<script setup lang="ts">
import { site } from "@/content/site";
import { vReveal } from "@/composables/reveal";
import ButtonLink from "@/components/ui/ButtonLink.vue";
</script>

<template>
	<section id="contact" class="contact section container" aria-labelledby="contact-titre">
		<p v-reveal class="t-mono t-signal">Contact</p>
		<h2 id="contact-titre" v-reveal:1 class="t-display contact__title">
			Un job étudiant en développement&#8239;? Parlons-en.
		</h2>
		<div class="contact__grid">
			<p v-reveal:2 class="t-lead contact__text">
				40 à 80&#8239;%, idéalement full-stack, avec un peu de télétravail. Ouvert aussi à des
				missions informatiques plus larges.
			</p>
			<div v-reveal:3 class="contact__actions">
				<ButtonLink :href="site.links.linkedin" external>
					Me contacter sur LinkedIn <span class="btn__icon" aria-hidden="true">↗</span>
				</ButtonLink>
				<ButtonLink :href="site.links.github" variant="outline" external>
					GitHub <span class="btn__icon" aria-hidden="true">↗</span>
				</ButtonLink>
				<p class="contact__note t-mono-plain">La plupart de mes projets récents sont privés.</p>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.contact {
	display: flex;
	flex-direction: column;
	gap: var(--space-5);
	padding-bottom: var(--section-gap);
}

.contact__title {
	max-width: 16ch;
}

.contact__grid {
	display: grid;
	gap: var(--space-6);
	margin-top: var(--space-4);

	@include up(md) {
		grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
		column-gap: var(--space-8);
		align-items: start;
	}
}

.contact__text {
	max-width: 30em;
}

.contact__actions {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-3);
	align-items: center;
}

.contact__note {
	flex-basis: 100%;
	margin-top: var(--space-3);
	max-width: 48ch;
}
</style>
