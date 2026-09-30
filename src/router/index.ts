import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { getProject } from "@/content/projects";
import { prefersReducedMotion } from "@/composables/useMediaQuery";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", name: "home", component: HomeView },
		{
			path: "/projets/:slug",
			name: "project",
			component: () => import("@/views/ProjectView.vue"),
			props: true,
			beforeEnter: (to) => (getProject(String(to.params.slug)) ? true : { name: "home" }),
		},
		{ path: "/:pathMatch(.*)*", redirect: { name: "home" } },
	],
	scrollBehavior(to, from, saved) {
		if (saved) return saved;
		if (to.hash) {
			// Ancre sur la même page : défilement doux ; changement de page : saut direct après rendu
			const sameRoute = to.path === from.path;
			return new Promise((resolve) =>
				setTimeout(
					() => resolve({ el: to.hash, behavior: sameRoute ? "smooth" : "auto" }),
					sameRoute ? 0 : 60,
				),
			);
		}
		return { top: 0 };
	},
});

// Transitions de page : View Transitions API (le titre du projet glisse entre l'accueil et l'étude de cas).
// Navigateurs sans support : navigation classique.
let finishTransition: (() => void) | null = null;

router.beforeResolve((to, from) => {
	if (to.path === from.path || !from.matched.length) return;
	if (!("startViewTransition" in document) || prefersReducedMotion()) return;

	return new Promise<void>((resolve) => {
		document.startViewTransition(
			() =>
				new Promise<void>((done) => {
					finishTransition = done;
					resolve();
				}),
		);
	});
});

router.afterEach(async () => {
	if (!finishTransition) return;
	await nextTick();
	finishTransition();
	finishTransition = null;
});

export default router;
