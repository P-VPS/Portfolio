<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { projects } from "@/content/projects";
import type { ProjectCode } from "@/content/types";
import { stack } from "@/composables/stackState";
import SectionHead from "@/components/ui/SectionHead.vue";
import ProjectCard from "./ProjectCard.vue";

const list = ref<HTMLElement>();
let observer: IntersectionObserver | undefined;
const visible = new Set<ProjectCode>();

// Le projet lu est celui qui traverse le milieu de l'écran : le rail le suit.
onMounted(() => {
	observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const code = (entry.target as HTMLElement).dataset.code as ProjectCode;
				if (entry.isIntersecting) visible.add(code);
				else visible.delete(code);
			}
			const order = projects.map((p) => p.code).filter((c) => visible.has(c));
			stack.readingProject = order[order.length - 1] ?? null;
		},
		{ rootMargin: "-48% 0px -48% 0px" },
	);
	list.value?.querySelectorAll<HTMLElement>("[data-code]").forEach((el) => observer?.observe(el));
});

onBeforeUnmount(() => {
	observer?.disconnect();
	stack.readingProject = null;
});
</script>

<template>
	<section id="projets" class="section container" aria-labelledby="projets-titre">
		<SectionHead
			id="projets-titre"
			kicker="Projets · 5 études de cas"
			title="Cinq projets, de l’écran jusqu’au terrain."
		>
			Une app mobile hors ligne, un back-office pour un club, un outil métier en VBA, une plateforme
			d’orchestration et la régie d’une conférence : chaque projet traverse la pile à un endroit
			différent.
		</SectionHead>

		<div ref="list" class="projects">
			<ProjectCard v-for="(project, i) in projects" :key="project.slug" :project="project" :index="i" />
		</div>
	</section>
</template>

<style scoped lang="scss">
.projects {
	display: flex;
	flex-direction: column;
	gap: var(--section-gap);
}
</style>
