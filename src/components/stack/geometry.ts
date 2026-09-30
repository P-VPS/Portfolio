/**
 * Géométrie de la coupe : cinq plaques en axonométrie, empilées verticalement.
 * Une plaque vue de profil (b = 0, t = 0) devient un simple trait : c'est ainsi que la coupe devient le rail.
 */

export interface StackGeom {
	/** Centre horizontal des plaques. */
	cx: number;
	/** Demi-largeur d'une plaque. */
	a: number;
	/** Demi-profondeur apparente (inclinaison). 0 = vue de profil. */
	b: number;
	/** Épaisseur. */
	t: number;
	/** Position de la plaque du haut (05). */
	y0: number;
	/** Écart vertical entre deux plaques. */
	gap: number;
}

/** Dessin de référence (unités du viewBox du hero). */
export const DESIGN = {
	width: 740,
	height: 700,
	top: -80,
	cx: 250,
	a: 210,
	b: 105,
	t: 8,
	centerY: 304,
	gap: 92,
} as const;

/** Position des cœurs de projets sous la plaque (rapport de b). */
const DOT_DEPTH = 0.524;

export const designGeom = (spread = 1): StackGeom => ({
	cx: DESIGN.cx,
	a: DESIGN.a,
	b: DESIGN.b,
	t: DESIGN.t,
	y0: DESIGN.centerY - 2 * DESIGN.gap * spread,
	gap: DESIGN.gap * spread,
});

export const lerp = (from: number, to: number, k: number): number => from + (to - from) * k;

export const lerpGeom = (g1: StackGeom, g2: StackGeom, k: number): StackGeom => ({
	cx: lerp(g1.cx, g2.cx, k),
	a: lerp(g1.a, g2.a, k),
	b: lerp(g1.b, g2.b, k),
	t: lerp(g1.t, g2.t, k),
	y0: lerp(g1.y0, g2.y0, k),
	gap: lerp(g1.gap, g2.gap, k),
});

/** Ordonnée d'une plaque (index flottant accepté pour les animations). */
export const plateY = (g: StackGeom, i: number): number => g.y0 + i * g.gap;

/** Ordonnée d'un point de cœur de projet sur la plaque i. */
export const dotY = (g: StackGeom, i: number): number => plateY(g, i) + DOT_DEPTH * g.b;

/** Abscisse d'un cœur de projet (décalage exprimé en unités du dessin de référence). */
export const coreX = (g: StackGeom, offset: number): number => g.cx + offset * (g.a / DESIGN.a);

const pts = (p: [number, number][]): string => p.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

export function platePolygons(g: StackGeom, i: number): { top: string; left: string; right: string } {
	const y = plateY(g, i);
	const { cx, a, b, t } = g;
	return {
		top: pts([
			[cx - a, y],
			[cx, y - b],
			[cx + a, y],
			[cx, y + b],
		]),
		left: pts([
			[cx - a, y],
			[cx, y + b],
			[cx, y + b + t],
			[cx - a, y + t],
		]),
		right: pts([
			[cx, y + b],
			[cx + a, y],
			[cx + a, y + t],
			[cx, y + b + t],
		]),
	};
}

export const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

export const easeInOut = (k: number): number => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
