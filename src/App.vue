<script setup lang="ts">
import SiteHeader from "@/components/layout/SiteHeader.vue";
import SiteFooter from "@/components/layout/SiteFooter.vue";
import GridOverlay from "@/components/layout/GridOverlay.vue";
import StackStage from "@/components/stack/StackStage.vue";
import { DESKTOP_QUERY, useMediaQuery } from "@/composables/useMediaQuery";

const isDesktop = useMediaQuery(DESKTOP_QUERY);
</script>

<template>
	<a href="#contenu" class="skip-link">Aller au contenu</a>
	<SiteHeader />
	<main id="contenu">
		<RouterView v-slot="{ Component, route }">
			<component :is="Component" :key="route.path" />
		</RouterView>
	</main>
	<SiteFooter />
	<StackStage v-if="isDesktop" />
	<GridOverlay />
</template>
