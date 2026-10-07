/** Identifiant d'une couche de la coupe, du plus haut (interface) au plus bas (terrain). */
export type LayerId = "05" | "04" | "03" | "02" | "01";

export interface Layer {
	id: LayerId;
	name: string;
	/** Ce que recouvre la couche, en quelques mots. */
	scope: string;
}

/** Code court affiché sur la coupe et dans les références croisées. */
export type ProjectCode = "JAL" | "UST" | "PLT" | "AGH" | "CIS";

/**
 * Média attendu pour un projet.
 * Tant que le fichier `src/assets/media/<file>.<ext>` n'existe pas, un placeholder documenté est affiché.
 * Voir MEDIAS.md à la racine du projet.
 */
export interface MediaSpec {
	/** Chemin sans extension, relatif à src/assets/media (ex. « projets/jalona/accueil »). */
	file: string;
	kind: "mobile" | "desktop" | "photo" | "video";
	/** Ratio CSS, ex. « 16 / 10 ». */
	ratio: string;
	alt: string;
	caption: string;
	/** Ce que la capture ou la photo doit montrer. */
	brief: string;
	/** Source et format conseillés. */
	format: string;
	/** Résolution minimale / idéale. */
	size: string;
	/** Zone à garder libre pour le recadrage responsive, si nécessaire. */
	crop?: string;
	/**
	 * Cadrage du fichier dans le ratio : « contain » montre l'image entière sur un fond neutre,
	 * « cover » remplit le cadre en recadrant. Par défaut : contain pour les captures, cover pour photos et vidéos.
	 */
	fit?: "cover" | "contain";
	/** Point focal en mode cover (object-position CSS), ex. « 50% 30% ». */
	position?: string;
}

export interface DiagramNode {
	title: string;
	sub?: string;
}

export interface DiagramColumn {
	nodes: DiagramNode[];
	/** Frontière (pointillés) autour des nœuds de la colonne. */
	group?: string;
	/** Liaison vers la colonne suivante. */
	link?: { label: string; direction: "right" | "left" | "both" | "none" };
}

export interface Diagram {
	columns: DiagramColumn[];
	caption: string;
}

export interface Highlight {
	title: string;
	text: string;
}

export interface Project {
	slug: string;
	code: ProjectCode;
	name: string;
	/** Nature du projet : perso, client, stage, école… */
	context: string;
	period: string;
	role: string;
	status?: string;
	url?: { href: string; label: string };
	/** Couches traversées (contiguës, de la plus haute à la plus basse). */
	layers: LayerId[];
	/** Position du « cœur » du projet sur la coupe (décalage horizontal, unités du dessin). */
	coreOffset: number;
	/** Phrase d'accroche. */
	title: string;
	/** Résumé court pour la page d'accueil. */
	summary: string;
	/** Introduction de l'étude de cas. */
	lead: string;
	/** Points forts : les trois premiers apparaissent sur l'accueil. */
	highlights: Highlight[];
	facts?: { value: string; label: string }[];
	stack: Partial<Record<LayerId, string[]>>;
	/** Quelques technologies clés, affichées sur l'accueil. */
	tech: string[];
	diagram?: Diagram;
	story?: { kicker: string; title: string; paragraphs: string[] };
	/** Ce que le projet montre sur le profil. */
	proves: string;
	/** Présentation visuelle sur l'accueil. */
	homeVisual: "phones" | "screen" | "diagram" | "photo";
	media: MediaSpec[];
}

export interface Experiment {
	slug: string;
	name: string;
	text: string;
	tech: string;
	/** Code source. */
	href: string;
	/** Démo en ligne. */
	demo: string;
	media: MediaSpec;
}

export interface JourneyEntry {
	period: string;
	kind: "Formation" | "Expérience" | "Projets";
	title: string;
	place?: string;
	text?: string;
	current?: boolean;
	project?: string;
}

export interface SkillItem {
	name: string;
	/** Codes des projets où la technologie ou la compétence a été utilisée. */
	in: (ProjectCode | "EXP")[];
}
