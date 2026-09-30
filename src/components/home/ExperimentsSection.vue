<script setup lang="ts">
import { experiments } from "@/content/projects";
import { vReveal } from "@/composables/reveal";
import MediaFrame from "@/components/ui/MediaFrame.vue";
</script>

<template>
	<section id="experiences" class="section container" aria-labelledby="experiences-titre">
		<div class="head">
			<p v-reveal class="t-mono t-signal">À côté</p>
			<h2 id="experiences-titre" v-reveal:1 class="t-h3">
				Deux expériences plus visuelles, sans librairie 3D.
			</h2>
		</div>
		<ul class="list">
			<li v-for="(exp, i) in experiments" :key="exp.slug" v-reveal:[i] class="exp">
				<MediaFrame :media="exp.media" :caption="false" compact />
				<div class="exp__body">
					<h3 class="exp__name">{{ exp.name }}</h3>
					<p class="exp__text">{{ exp.text }}</p>
					<p class="t-mono-plain">{{ exp.tech }}</p>
					<a :href="exp.href" class="link exp__link" target="_blank" rel="noopener noreferrer"
						>Voir le code ↗</a
					>
				</div>
			</li>
		</ul>
	</section>
</template>

<style scoped lang="scss">
.head {
	display: flex;
	flex-direction: column;
	gap: var(--space-3);
	margin-bottom: var(--space-7);
	max-width: 30ch;
}

.list {
	display: grid;
	gap: var(--space-7);

	@include up(md) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: var(--space-8);
	}
}

.exp {
	display: grid;
	gap: var(--space-5);
	padding-top: var(--space-5);
	border-top: 1px solid var(--ink);

	@include up(sm) {
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		column-gap: var(--space-5);
	}

	&__body {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	&__name {
		font-size: 1.375rem;
		letter-spacing: -0.02em;
	}

	&__text {
		font-size: 0.9375rem;
		color: var(--graphite);
	}

	&__link {
		align-self: flex-start;
		margin-top: var(--space-2);
	}
}
</style>
