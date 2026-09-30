<script setup lang="ts">
import { onMounted } from "vue";
import { stack } from "@/composables/stackState";
import HeroSection from "@/components/home/HeroSection.vue";
import IntroSection from "@/components/home/IntroSection.vue";
import ProjectsSection from "@/components/home/ProjectsSection.vue";
import ExperimentsSection from "@/components/home/ExperimentsSection.vue";
import JourneySection from "@/components/home/JourneySection.vue";
import SkillsSection from "@/components/home/SkillsSection.vue";
import ContactSection from "@/components/home/ContactSection.vue";

stack.mode = "home";
stack.readingProject = null;

onMounted(() => (document.title = "Sébastien Voide — Développeur full-stack"));
</script>

<template>
	<HeroSection />
	<IntroSection />
	<ProjectsSection />
	<ExperimentsSection />
	<JourneySection />
	<SkillsSection />
	<ContactSection />
</template>
