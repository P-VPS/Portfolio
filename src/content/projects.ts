import type { Experiment, Project } from "./types";

const MOBILE = {
	kind: "mobile",
	ratio: "9 / 19.5",
	format: "Capture d’écran native (iOS ou Android), PNG ou WebP, sans cadre d’appareil",
	size: "Idéal 1170 × 2532 · minimum 750 × 1624",
} as const;

const DESKTOP = {
	kind: "desktop",
	ratio: "16 / 10",
	format: "Capture navigateur desktop, fenêtre sans barre d’onglets, PNG ou WebP",
	size: "Idéal 2560 × 1600 · minimum 1440 × 900",
} as const;

const PHOTO = {
	kind: "photo",
	ratio: "3 / 2",
	format: "Photo d’origine (JPG), couleurs naturelles, non retouchée",
	size: "Idéal 3000 × 2000 · minimum 2000 × 1333",
} as const;

export const projects: Project[] = [
	{
		slug: "jalona",
		code: "JAL",
		name: "Jalona",
		context: "Projet personnel · produit",
		period: "Depuis janvier 2026",
		role: "Seul, de l’app à l’infrastructure",
		status: "En développement · publication sur les stores prévue",
		layers: ["05", "04", "03", "02"],
		coreOffset: -45,
		title: "Une app de planification très configurable, construite seul de bout en bout.",
		summary: "Rappels précis, récurrences avancées, utilisable hors ligne : une app mobile pour les gens très organisés.",
		lead: "Les apps de tâches courantes offrent peu de contrôle fin. Jalona mise sur la personnalisation : rappels précis, récurrences avancées, nombreux réglages. Je conçois et développe tout seul, de l’app mobile à l’infrastructure.",
		highlights: [
			{
				title: "Pensée hors ligne",
				text: "Utilisable sans réseau, synchronisée dès que la connexion revient.",
			},
			{
				title: "Une vraie architecture",
				text: "API NestJS, PostgreSQL et Redis, répartis dans trois pods Podman.",
			},
			{
				title: "Jusqu’au déploiement",
				text: "Une CI sur mon propre VPS : automatisation et mise en production comprises.",
			},
			{
				title: "Configurable en profondeur",
				text: "Des règles de planification bien plus riches qu’une liste de tâches.",
			},
		],
		stack: {
			"05": ["React Native", "Expo"],
			"04": ["NestJS", "Rate limiting"],
			"03": ["PostgreSQL", "Redis", "Stockage local · synchronisation"],
			"02": ["Podman (3 pods)", "CI sur VPS"],
		},
		tech: ["React Native", "NestJS", "PostgreSQL", "Redis", "Podman"],
		diagram: {
			columns: [
				{
					nodes: [{ title: "App mobile", sub: "React Native · Expo · stockage local" }],
					link: { label: "synchronisation", direction: "both" },
				},
				{
					group: "3 pods Podman",
					nodes: [
						{ title: "API", sub: "NestJS" },
						{ title: "PostgreSQL", sub: "données" },
						{ title: "Redis", sub: "rate limiting" },
					],
					link: { label: "", direction: "none" },
				},
				{
					nodes: [{ title: "Intégration continue", sub: "VPS personnel" }],
				},
			],
			caption: "L’app fonctionne en local et se synchronise avec des services conteneurisés.",
		},
		proves: "Que je peux porter un produit entier, de l’usage jusqu’à l’infrastructure qui le fait tourner.",
		homeVisual: "phones",
		media: [
			{
				...MOBILE,
				file: "projets/jalona/accueil",
				alt: "Écran d’accueil de l’application Jalona",
				caption: "Accueil",
				brief: "L’écran principal au quotidien (vue du jour ou de la semaine), avec des données réalistes.",
			},
			{
				...MOBILE,
				file: "projets/jalona/planification",
				alt: "Écran de planification de Jalona",
				caption: "Planification",
				brief: "La création ou l’édition d’un élément planifié, montrant la richesse des options.",
			},
			{
				...MOBILE,
				file: "projets/jalona/recurrence",
				alt: "Réglage d’une récurrence avancée dans Jalona",
				caption: "Récurrences et rappels",
				brief: "Le réglage d’une récurrence avancée ou d’un rappel précis : c’est le point différenciant de l’app.",
			},
		],
	},
	{
		slug: "usts-hc",
		code: "UST",
		name: "USTS-HC",
		context: "Mandat indépendant · client externe",
		period: "2025",
		role: "Site public et back-office, en indépendant",
		status: "En production",
		url: { href: "https://usts-hc.ch/", label: "usts-hc.ch" },
		layers: ["05", "04", "03"],
		coreOffset: -90,
		title: "Le site d’un club de hockey, et l’outil qui lui permet de tout gérer lui-même.",
		summary: "Un site public et, surtout, un back-office complet pour un club de hockey. En production.",
		lead: "Le club voulait gérer lui-même son site, sans dépendre d’un développeur. J’ai réalisé en indépendant le site public et un back-office complet : équipes, matchs, contenu. Il est utilisé en production par les responsables du club.",
		highlights: [
			{
				title: "Un vrai client",
				text: "Un mandat externe : comprendre le fonctionnement d’un club et livrer un outil réellement utilisé.",
			},
			{
				title: "Plus qu’un site vitrine",
				text: "Joueurs, équipes, matchs, calendrier, actualités, sponsors, staff, photos : tout se gère depuis le dashboard.",
			},
			{
				title: "Pensé pour des non-développeurs",
				text: "Un outil simple, malgré un modèle de données riche.",
			},
		],
		stack: {
			"05": ["Vue.js", "Nuxt", "Dashboard d’administration"],
			"04": ["NestJS"],
			"03": ["Prisma", "PostgreSQL"],
		},
		tech: ["Nuxt", "NestJS", "Prisma", "PostgreSQL"],
		diagram: {
			columns: [
				{
					nodes: [
						{ title: "Site public", sub: "Vue.js · Nuxt" },
						{ title: "Back-office", sub: "dashboard d’administration" },
					],
					link: { label: "API", direction: "right" },
				},
				{
					nodes: [{ title: "API", sub: "NestJS" }],
					link: { label: "Prisma", direction: "right" },
				},
				{
					nodes: [{ title: "PostgreSQL", sub: "équipes · matchs · contenu" }],
				},
			],
			caption: "Le site public et le back-office partagent la même API.",
		},
		proves: "Que je sais transformer un besoin client en outil simple, et le livrer en production.",
		homeVisual: "screen",
		media: [
			{
				...DESKTOP,
				file: "projets/usts-hc/site",
				alt: "Page d’accueil du site USTS-HC",
				caption: "Site public",
				brief: "La page d’accueil du site public, en haut de page.",
			},
			{
				...DESKTOP,
				file: "projets/usts-hc/dashboard",
				alt: "Tableau de bord du back-office USTS-HC",
				caption: "Back-office",
				brief: "Le tableau de bord ou la liste des équipes / joueurs dans le back-office.",
			},
			{
				...DESKTOP,
				file: "projets/usts-hc/edition-match",
				alt: "Édition d’un match dans le back-office USTS-HC",
				caption: "Gestion des matchs",
				brief: "L’édition d’un match ou d’un résultat, pour montrer la profondeur du back-office.",
			},
			{
				...MOBILE,
				// La capture fournie n’est pas un écran entier : cadre au ratio réel du fichier
				ratio: "5 / 7",
				file: "projets/usts-hc/mobile",
				alt: "Site USTS-HC sur téléphone",
				caption: "Site sur mobile",
				brief: "Le site public sur téléphone (calendrier ou page d’une équipe).",
			},
		],
	},
	{
		slug: "plte",
		code: "PLT",
		name: "Plateforme collaborative de gestion — PLTE",
		context: "Stage à la PL-MTI · Projet pour la PLTE (EPFL)",
		period: "2023–2024",
		role: "Interface VBA, API Laravel, base MySQL",
		status: "Utilisé par ≈ 5 personnes",
		layers: ["05", "04", "03"],
		coreOffset: 0,
		title: "Un outil de gestion collaboratif, construit dans une stack imposée : VBA.",
		summary: "Interface VBA imposée, API Laravel et base MySQL : un outil métier multi-utilisateur pour une plateforme de l’EPFL.",
		lead: "Pendant mon stage à la PL-MTI, j’ai développé, en parallèle d’autres projets, un outil de gestion de projet pour la PLTE, une plateforme de l’EPFL cliente de la PL-MTI. Contrainte : l’interface devait rester en VBA. J’ai construit autour une vraie architecture : API Laravel, base MySQL hébergée à l’EPFL, travail à plusieurs sur les mêmes données.",
		highlights: [
			{
				title: "Une contrainte assumée",
				text: "VBA imposé : j’ai adapté l’architecture à l’existant plutôt que l’inverse.",
			},
			{
				title: "Travailler à plusieurs",
				text: "Plusieurs personnes sur les mêmes données : modifications concurrentes détectées, conflits gérés.",
			},
			{
				title: "Un vrai outil métier",
				text: "Projets, heures, personnes, mesures et planning, via une API que j’ai conçue.",
			},
		],
		stack: {
			"05": ["VBA", "Excel"],
			"04": ["Laravel", "API", "Détection des conflits"],
			"03": ["MySQL", "Serveurs de l’EPFL"],
		},
		tech: ["VBA", "Laravel", "MySQL"],
		diagram: {
			columns: [
				{
					nodes: [{ title: "Postes utilisateurs", sub: "interface VBA · ≈ 5 personnes" }],
					link: { label: "API", direction: "both" },
				},
				{
					nodes: [{ title: "Backend", sub: "Laravel · détection des conflits" }],
					link: { label: "", direction: "right" },
				},
				{
					nodes: [{ title: "MySQL", sub: "hébergé à l’EPFL" }],
				},
			],
			caption: "Chaque poste VBA passe par l’API, qui détecte les modifications concurrentes.",
		},
		proves: "Que je m’adapte à l’environnement du client, en construisant une architecture propre autour d’une contrainte ancienne.",
		homeVisual: "screen",
		media: [
			{
				...DESKTOP,
				file: "projets/plte/interface",
				alt: "Interface principale de l’outil de gestion PLTE",
				caption: "Interface principale",
				brief: "L’écran principal de l’outil (liste des projets ou vue d’ensemble). Anonymiser les noms si nécessaire.",
			},
			{
				...DESKTOP,
				file: "projets/plte/planning",
				alt: "Vue planning de l’outil PLTE",
				caption: "Planning",
				brief: "La vue planning ou la saisie des heures.",
			},
			{
				...DESKTOP,
				file: "projets/plte/collaboration",
				alt: "Gestion d’une modification concurrente dans l’outil PLTE",
				caption: "Travail à plusieurs",
				brief: "Un écran où la synchronisation ou la gestion d’un conflit est visible.",
			},
		],
	},
	{
		slug: "agent-hub",
		code: "AGH",
		name: "Agent-hub",
		context: "Projet personnel",
		period: "Depuis 2026",
		role: "Conception et développement, seul",
		status: "En développement",
		layers: ["05", "04", "03", "02"],
		coreOffset: 45,
		title: "Une plateforme pour orchestrer des agents de développement dans des environnements isolés.",
		summary: "Des tâches confiées à des agents de développement, chacune exécutée dans un conteneur isolé.",
		lead: "Agent-hub centralise plusieurs projets et confie des tâches à des agents de développement, chacune exécutée dans un conteneur isolé. L’intérêt n’est pas l’IA, mais ce qui l’encadre : orchestration, isolation, sécurité et pilotage.",
		highlights: [
			{
				title: "Orchestration",
				text: "Choix de l’environnement et des outils, exécution, récupération du résultat.",
			},
			{
				title: "Isolation par conception",
				text: "Chaque tâche tourne dans son conteneur, séparée des autres projets.",
			},
			{
				title: "Agents interchangeables",
				text: "Une abstraction commune : l’architecture ne dépend d’aucun modèle.",
			},
			{
				title: "Deux façons de piloter",
				text: "Une vue bureau et une vue Kanban pour suivre chaque projet.",
			},
		],
		stack: {
			"05": ["React", "Vue bureau · Kanban"],
			"04": ["Node.js", "Orchestration de tâches", "Abstraction des agents"],
			"03": ["Gestion multi-projets"],
			"02": ["Docker", "Conteneurs isolés", "Exécution contrôlée"],
		},
		tech: ["React", "Node.js", "Docker"],
		diagram: {
			columns: [
				{
					nodes: [{ title: "Interface web", sub: "React · vue bureau · Kanban" }],
					link: { label: "tâche · résultat", direction: "both" },
				},
				{
					nodes: [
						{ title: "Orchestrateur", sub: "Node.js · choix de l’environnement et des outils" },
						{ title: "Agents", sub: "abstraction commune" },
					],
					link: { label: "exécution isolée", direction: "both" },
				},
				{
					group: "Environnements isolés",
					nodes: [
						{ title: "Projet A", sub: "conteneur Docker" },
						{ title: "Projet B", sub: "conteneur Docker" },
					],
				},
			],
			caption: "Chaque tâche passe par l’orchestrateur et s’exécute dans un environnement séparé.",
		},
		proves: "Que je sais concevoir un système, pas seulement une application.",
		homeVisual: "diagram",
		media: [
			{
				...DESKTOP,
				file: "projets/agent-hub/vue-bureau",
				alt: "Vue de type bureau dans l’interface d’Agent-hub",
				caption: "Vue bureau",
				brief: "La vue de type bureau / office, avec un ou plusieurs projets ouverts. Masquer tout secret ou chemin sensible.",
			},
			{
				...DESKTOP,
				file: "projets/agent-hub/kanban",
				alt: "Vue Kanban des tâches dans Agent-hub",
				caption: "Vue Kanban",
				brief: "La vue Kanban avec des tâches à différents stades.",
			},
		],
	},
	{
		slug: "cisbat-2025",
		code: "CIS",
		name: "CISBAT 2025",
		context: "Projet de dernière année d’ES · mandant externe · EPFL",
		period: "3–5 septembre 2025",
		role: "Responsable informatique, sous la responsabilité de mon chef",
		layers: ["02", "01"],
		coreOffset: 90,
		title: "Faire fonctionner l’informatique d’une conférence de trois jours, en direct.",
		summary: "Machines, réseau, régies, diffusion en ligne et support d’une conférence hybride à l’EPFL.",
		lead: "Une conférence de trois jours à l’EPFL, sur place et en ligne. Pour ce projet de dernière année d’ES (mandant externe), j’étais responsable de l’informatique : machines, réseau, régies, diffusion et support, avec une équipe d’environ dix personnes.",
		facts: [
			{ value: "≈ 450", label: "participants sur place" },
			{ value: "≈ 50", label: "participants en ligne" },
			{ value: "4", label: "salles principales" },
			{ value: "≈ 15", label: "ordinateurs" },
			{ value: "≈ 10", label: "personnes dans l’équipe" },
		],
		highlights: [
			{
				title: "Préparer en amont",
				text: "Machines, réseau, micros, caméras et régies prêts avant le premier jour.",
			},
			{
				title: "Une conférence hybride",
				text: "Live sur Zoom, replays sur Vimeo, ConfTool et Swapcard côté organisation.",
			},
			{
				title: "Coordonner une équipe",
				text: "Une dizaine de personnes entre régies, micros et support.",
			},
		],
		story: {
			kicker: "Sur le terrain",
			title: "Un Wi-Fi visible, mais sans Internet",
			paragraphs: [
				"Le jour J, le Wi-Fi demandé pour la conférence se connectait, mais sans Internet. Ce besoin ne m’avait pas été signalé en amont, et les tests avaient été faits ailleurs sur le campus.",
				"Écarter la piste des appareils, identifier un problème propre à l’infrastructure du lieu, coordonner la résolution avec les responsables, sans arrêter le reste : c’est ce qu’un événement réel demande.",
			],
		},
		stack: {
			"02": ["≈ 15 postes configurés", "Switches · câblage réseau", "Zoom (live)", "Vimeo (replays)"],
			"01": ["Régies", "Micros · caméras", "ConfTool · Swapcard", "Coordination d’équipe"],
		},
		tech: ["Réseau", "Régies", "Zoom", "Vimeo"],
		diagram: {
			columns: [
				{
					nodes: [
						{ title: "4 salles", sub: "micros · caméras · régies" },
						{ title: "Accueil · workshop", sub: "postes et support" },
					],
					link: { label: "réseau", direction: "right" },
				},
				{
					nodes: [{ title: "Postes et réseau", sub: "≈ 15 ordinateurs · switches" }],
					link: { label: "diffusion", direction: "right" },
				},
				{
					nodes: [
						{ title: "Zoom", sub: "live · ≈ 50 en ligne" },
						{ title: "Vimeo", sub: "replays" },
					],
				},
			],
			caption: "Des salles jusqu’à la diffusion en ligne.",
		},
		proves: "Que je sais préparer une infrastructure, coordonner une équipe et résoudre des problèmes en direct.",
		homeVisual: "photo",
		media: [
			{
				...PHOTO,
				file: "projets/cisbat-2025/salle",
				alt: "Salle principale de CISBAT 2025 en configuration",
				caption: "Salle principale",
				brief: "Vue large d’une salle principale en configuration ou pendant une session (public, scène, écran).",
				crop: "Garder le sujet principal dans le tiers central : l’image est recadrée en 4:5 sur mobile.",
			},
			{
				...PHOTO,
				file: "projets/cisbat-2025/regie",
				alt: "Régie technique pendant CISBAT 2025",
				caption: "Régie",
				brief: "Une régie ou le poste de streaming : écrans, matériel, personne au travail si possible.",
			},
			{
				...PHOTO,
				file: "projets/cisbat-2025/preparation",
				// Photo verticale dans un cadre 3:2 : on garde le poste de travail, au centre bas de l’image
				position: "50% 62%",
				alt: "Préparation du matériel informatique avant CISBAT 2025",
				caption: "Préparation",
				brief: "La préparation en amont : installation des postes, câblage, matériel réseau.",
			},
			{
				...PHOTO,
				file: "projets/cisbat-2025/equipe",
				alt: "L’équipe informatique de CISBAT 2025 au travail",
				caption: "L’équipe",
				brief: "L’équipe en action (avec l’accord des personnes visibles).",
			},
			{
				kind: "video",
				ratio: "16 / 9",
				file: "projets/cisbat-2025/boucle",
				alt: "Courte séquence vidéo de la conférence CISBAT 2025",
				caption: "En direct",
				brief: "Boucle de 5 à 10 secondes, sans son : une salle pendant une session ou la régie en fonctionnement.",
				format: "MP4 (H.264) ou WebM, sans piste audio, moins de 4 Mo",
				size: "1920 × 1080 (1280 × 720 accepté)",
			},
		],
	},
];

export const experiments: Experiment[] = [
	{
		slug: "dice",
		name: "Dice",
		text: "Un dé 3D lancé d’un swipe : plus le geste est fort, plus il roule.",
		tech: "CSS 3D · JavaScript vanilla",
		href: "https://github.com/seb3x97/Dice",
		demo: "https://manager.sebastien-voide.ch/?src=https://github.com/seb3x97/Dice/blob/main/index.html",
		media: {
			kind: "video",
			// Objet détouré sur fond blanc : affiché en entier, fondu dans le cadre
			fit: "contain",
			blend: true,
			ratio: "4 / 3",
			file: "experiences/dice",
			alt: "Le dé 3D de Dice en train de rouler",
			caption: "Dice",
			brief: "Boucle courte (3 à 6 s, sans son) du dé qui roule après un swipe. Une capture fixe (PNG) est aussi acceptée.",
			format: "MP4 / WebM sans audio, ou PNG / WebP",
			size: "1200 × 900",
		},
	},
	{
		slug: "audio-analyser",
		name: "AudioAnalyser",
		text: "Une sphère de points qui réagit aux basses, analysées en temps réel.",
		tech: "Web Audio API · Canvas",
		href: "https://github.com/seb3x97/AudioAnalyser",
		demo: "https://manager.sebastien-voide.ch/?src=https://github.com/seb3x97/AudioAnalyser/blob/main/index.html",
		media: {
			kind: "video",
			fit: "contain",
			blend: true,
			ratio: "4 / 3",
			file: "experiences/audio-analyser",
			alt: "La sphère d’AudioAnalyser qui réagit à la musique",
			caption: "AudioAnalyser",
			brief: "Boucle courte (3 à 6 s, sans son) de la sphère qui pulse sur les basses. Une capture fixe est aussi acceptée.",
			format: "MP4 / WebM sans audio, ou PNG / WebP",
			size: "1200 × 900",
		},
	},
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
