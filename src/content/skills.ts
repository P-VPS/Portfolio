import type { LayerId, SkillItem } from "./types";

/**
 * Compétences rangées par couche.
 * Chaque élément renvoie aux projets où il a réellement été utilisé
 * (EXP = expériences visuelles).
 */
export const skills: Record<LayerId, SkillItem[]> = {
	"05": [
		{ name: "React Native · Expo", in: ["JAL"] },
		{ name: "React", in: ["AGH"] },
		{ name: "Vue.js", in: ["UST"] },
		{ name: "Nuxt", in: ["UST"] },
		{ name: "Interfaces d’administration", in: ["UST", "AGH"] },
		{ name: "VBA · Excel", in: ["PLT"] },
		{ name: "Canvas · CSS 3D · Web Audio", in: ["EXP"] },
	],
	"04": [
		{ name: "NestJS", in: ["JAL", "UST"] },
		{ name: "Node.js", in: ["AGH"] },
		{ name: "Laravel", in: ["PLT"] },
		{ name: "Conception d’API", in: ["JAL", "UST", "PLT"] },
		{ name: "Orchestration de tâches", in: ["AGH"] },
		{ name: "Détection de conflits", in: ["PLT"] },
		{ name: "Rate limiting", in: ["JAL"] },
	],
	"03": [
		{ name: "PostgreSQL", in: ["JAL", "UST"] },
		{ name: "MySQL", in: ["PLT"] },
		{ name: "Prisma", in: ["UST"] },
		{ name: "Redis", in: ["JAL"] },
		{ name: "Offline-first · synchronisation", in: ["JAL"] },
		{ name: "Travail concurrent multi-utilisateur", in: ["PLT"] },
	],
	"02": [
		{ name: "Podman · pods", in: ["JAL"] },
		{ name: "Docker · conteneurs isolés", in: ["AGH"] },
		{ name: "CI sur VPS", in: ["JAL"] },
		{ name: "Réseau · switches · câblage", in: ["CIS"] },
		{ name: "Configuration de postes", in: ["CIS"] },
	],
	"01": [
		{ name: "Régies · micros · caméras", in: ["CIS"] },
		{ name: "Diffusion hybride (Zoom, Vimeo)", in: ["CIS"] },
		{ name: "Coordination d’une équipe", in: ["CIS"] },
		{ name: "Support en direct", in: ["CIS"] },
	],
};

export const languages: SkillItem[] = [
	{ name: "TypeScript", in: ["JAL", "AGH"] },
	{ name: "JavaScript", in: ["EXP"] },
	{ name: "PHP", in: ["PLT"] },
	{ name: "VBA", in: ["PLT"] },
	{ name: "SQL", in: ["JAL", "UST", "PLT"] },
];
