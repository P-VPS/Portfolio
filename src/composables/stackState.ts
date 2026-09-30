import { reactive } from "vue";
import type { LayerId, ProjectCode } from "@/content/types";

/**
 * État partagé de la coupe / du rail.
 * - heroProject : projet mis en avant dans le hero (survol ou défilement automatique)
 * - readingProject : projet actuellement lu (section Projets ou étude de cas)
 * - hoverLayer : couche survolée (rail ou section Compétences)
 * - progress : 0 = coupe éclatée dans le hero, 1 = rail
 */
export const stack = reactive({
	heroProject: null as ProjectCode | null,
	readingProject: null as ProjectCode | null,
	hoverLayer: null as LayerId | null,
	progress: 0,
	/** Élément du hero qui réserve la place de la coupe (desktop). */
	anchor: null as HTMLElement | null,
	/** Le hero n'est plus visible : le rail / la bande mobile prend le relais. */
	pastHero: false,
	/** Page courante : accueil (coupe animée) ou étude de cas (rail direct). */
	mode: "home" as "home" | "case",
	/** Écartement des plaques (animation d'entrée + réaction au curseur). */
	spread: 1,
	/** Opacité de la coupe pendant l'animation d'entrée. */
	intro: 1,
	/** Le visiteur a survolé ou choisi un projet : on arrête le défilement automatique. */
	heroPinned: false,
});
