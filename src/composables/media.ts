import type { MediaSpec } from "@/content/types";

// Tous les médias déposés dans src/assets/media sont détectés au build.
// Un média manquant affiche automatiquement un placeholder documenté.
const files = import.meta.glob<string>("../assets/media/**/*.{webp,avif,jpg,jpeg,png,gif,mp4,webm}", {
	eager: true,
	query: "?url",
	import: "default",
});

const byBase = new Map<string, string>();
for (const [path, url] of Object.entries(files)) {
	const base = path.replace("../assets/media/", "").replace(/\.[a-z0-9]+$/i, "");
	// Priorité aux formats les plus légers si plusieurs existent
	if (!byBase.has(base) || /\.(avif|webp|webm)$/i.test(path)) byBase.set(base, url);
}

export interface ResolvedMedia {
	url: string;
	isVideo: boolean;
}

export function resolveMedia(spec: MediaSpec): ResolvedMedia | null {
	const url = byBase.get(spec.file);
	if (!url) return null;
	return { url, isVideo: /\.(mp4|webm)(\?|$)/i.test(url) };
}
