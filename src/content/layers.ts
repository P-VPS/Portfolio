import type { Layer, LayerId } from "./types";

export const layers: Layer[] = [
	{ id: "05", name: "Interface", scope: "web · mobile · outils métier" },
	{ id: "04", name: "Logique & API", scope: "backend · règles métier" },
	{ id: "03", name: "Données", scope: "bases · cache · synchronisation" },
	{ id: "02", name: "Infrastructure", scope: "conteneurs · déploiement · réseau" },
	{ id: "01", name: "Terrain", scope: "matériel · salles · équipes" },
];

export const layerIndex = (id: LayerId): number => layers.findIndex((l) => l.id === id);

export const layerById = (id: LayerId): Layer => layers[layerIndex(id)]!;

/** « 05 → 02 » */
export const layerSpan = (ids: LayerId[]): string =>
	ids.length > 1 ? `${ids[0]} → ${ids[ids.length - 1]}` : (ids[0] ?? "");
