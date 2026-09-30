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
		role: "Conception et développement, seul, de l’app à l’infrastructure",
		status: "En développement · publication sur les stores prévue",
		layers: ["05", "04", "03", "02"],
		coreOffset: -45,
		title: "Une app de planification très configurable, construite seul de bout en bout.",
		summary:
			"Jalona s’adresse aux personnes qui veulent un contrôle précis sur leur organisation. Je la développe seul, de l’application mobile jusqu’au déploiement.",
		lead: "Jalona s’adresse aux personnes qui veulent être très organisées et garder un contrôle précis sur leur planification. Ce n’est pas une énième liste de tâches : l’intérêt est dans la personnalisation, avec des rappels précis, des récurrences avancées et de nombreux réglages. Je conçois et développe tout le produit seul : l’application mobile, le backend, les données et l’infrastructure qui le fait tourner.",
		highlights: [
			{
				title: "Pensée hors ligne",
				text: "Offline-first : l’app reste utilisable sans réseau grâce au stockage local, puis se synchronise avec le serveur dès que la connexion revient.",
			},
			{
				title: "Une vraie architecture",
				text: "Backend NestJS, PostgreSQL, Redis pour le rate limiting entre les services, le tout réparti dans trois pods Podman.",
			},
			{
				title: "Jusqu’au déploiement",
				text: "Une CI tourne sur mon propre VPS : le projet couvre aussi l’automatisation et le déploiement, pas seulement le code.",
			},
			{
				title: "Configurable en profondeur",
				text: "Rappels très précis, récurrences avancées, nombreux paramètres : des règles de planification bien plus riches qu’une simple liste de tâches.",
			},
		],
		stack: {
			"05": ["React Native", "Expo"],
			"04": ["NestJS", "Rate limiting"],
			"03": ["PostgreSQL", "Redis", "Stockage local · synchronisation"],
			"02": ["Podman (3 pods)", "CI sur VPS"],
		},
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
			caption:
				"Architecture simplifiée : l’app fonctionne en local et se synchronise avec des services conteneurisés.",
		},
		proves: "Que je peux porter un produit entier : penser l’usage, construire l’app mobile, concevoir le backend et les données, puis m’occuper de l’infrastructure et de l’automatisation qui le font tourner.",
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
		role: "Conception et développement du site public et du back-office",
		status: "En production",
		url: { href: "https://usts-hc.ch/", label: "usts-hc.ch" },
		layers: ["05", "04", "03"],
		coreOffset: -90,
		title: "Le site d’un club de hockey, et l’outil qui lui permet de tout gérer lui-même.",
		summary:
			"Pour un club de hockey, j’ai réalisé en indépendant le site public et, surtout, un back-office complet. Le site est en production.",
		lead: "Pour une équipe de hockey, j’ai réalisé en tant qu’indépendant le site public et, surtout, l’outil qui se cache derrière : un back-office complet qui permet au club de gérer ses équipes, ses matchs et tout le contenu du site sans passer par un développeur. Le site est en production et le back-office est utilisé par les personnes du club responsables du site.",
		highlights: [
			{
				title: "Un vrai client",
				text: "Un mandat externe : comprendre le fonctionnement d’un club, traduire ses besoins en fonctionnalités et livrer un produit réellement utilisé.",
			},
			{
				title: "Plus qu’un site vitrine",
				text: "Joueurs, équipes, matchs, résultats, calendrier, actualités, sponsors, staff, photos : tout se gère depuis le dashboard.",
			},
			{
				title: "Une stack moderne",
				text: "Nuxt côté site, une API NestJS, Prisma et PostgreSQL pour des données bien structurées.",
			},
			{
				title: "Pensé pour des non-développeurs",
				text: "Le back-office est utilisé par les responsables du club : l’outil doit rester simple, même si le modèle de données derrière ne l’est pas.",
			},
		],
		stack: {
			"05": ["Vue.js", "Nuxt", "Dashboard d’administration"],
			"04": ["NestJS"],
			"03": ["Prisma", "PostgreSQL"],
		},
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
			caption: "Architecture simplifiée : un site public et un back-office qui partagent la même API.",
		},
		proves: "Que je sais travailler pour un client : comprendre un besoin métier, le transformer en outil simple pour des non-développeurs, et livrer quelque chose qui tourne en production.",
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
		name: "Gestion de projet PLTE",
		context: "Stage à la PL-MTI · projet pour la PLTE (EPFL)",
		period: "2023–2024",
		role: "Conception et développement : interface VBA, API Laravel, base MySQL",
		status: "Utilisé par ≈ 5 personnes",
		layers: ["05", "04", "03"],
		coreOffset: 0,
		title: "Un outil de gestion collaboratif, construit dans une stack imposée : VBA.",
		summary:
			"L’interface devait vivre dans un environnement VBA. J’ai construit autour un vrai système : API Laravel, base MySQL et travail à plusieurs sur les mêmes données.",
		lead: "Pendant mon stage à la PL-MTI, j’ai développé un système complet de gestion de projet pour la PLTE, une plateforme de l’EPFL cliente de la PL-MTI, en parallèle d’autres projets. La contrainte : l’interface devait fonctionner dans un environnement VBA. Plutôt que de contourner cette contrainte, j’ai construit autour d’elle une vraie architecture, avec une API Laravel que j’ai développée, une base MySQL hébergée sur les serveurs de l’EPFL et une gestion de la collaboration entre utilisateurs.",
		highlights: [
			{
				title: "Une contrainte assumée",
				text: "L’interface en VBA était imposée. J’ai adapté l’architecture à l’environnement existant plutôt que d’imposer mes outils habituels.",
			},
			{
				title: "Travailler à plusieurs",
				text: "Plusieurs personnes modifient les mêmes données en parallèle : les modifications concurrentes sont détectées et les conflits gérés.",
			},
			{
				title: "Un vrai outil métier",
				text: "Projets, heures, personnes, mesures et planning : tout passe par une API que j’ai conçue et développée.",
			},
		],
		stack: {
			"05": ["VBA", "Excel"],
			"04": ["Laravel", "API", "Détection des conflits"],
			"03": ["MySQL", "Serveurs de l’EPFL"],
		},
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
			caption:
				"Architecture simplifiée : chaque poste VBA passe par l’API, qui détecte les modifications concurrentes.",
		},
		proves: "Que je m’adapte à l’environnement du client : je peux partir d’une contrainte technique ancienne et construire autour une architecture propre, sans tout réécrire avec mes outils habituels.",
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
		summary:
			"Agent-hub gère plusieurs projets et exécute des tâches confiées à des agents de développement, chacune dans un environnement conteneurisé et isolé.",
		lead: "Agent-hub centralise plusieurs projets et exécute des tâches confiées à des agents de développement, chacune dans un environnement conteneurisé, isolé et contrôlé. L’intérêt du projet n’est pas l’IA en elle-même, mais tout ce qui l’encadre : l’orchestration, l’isolation entre projets, la sécurité et l’interface qui permet de piloter le tout.",
		highlights: [
			{
				title: "Orchestration",
				text: "Une couche d’orchestration choisit l’environnement et les outils nécessaires, lance l’exécution puis récupère le résultat.",
			},
			{
				title: "Isolation par conception",
				text: "Chaque tâche s’exécute dans un environnement conteneurisé, séparé des autres projets, avec une exécution contrôlée.",
			},
			{
				title: "Agents interchangeables",
				text: "Différents agents ou moteurs d’exécution se branchent derrière une abstraction commune : l’architecture ne dépend pas d’un modèle.",
			},
			{
				title: "Deux façons de piloter",
				text: "Une interface web avec une vue de type bureau et une vue Kanban pour suivre les tâches de chaque projet.",
			},
		],
		stack: {
			"05": ["React", "Vue bureau · Kanban"],
			"04": ["Node.js", "Orchestration de tâches", "Abstraction des agents"],
			"03": ["Gestion multi-projets"],
			"02": ["Docker", "Conteneurs isolés", "Exécution contrôlée"],
		},
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
			caption:
				"Principe général : chaque tâche passe par l’orchestrateur et s’exécute dans un environnement séparé.",
		},
		proves: "Que je sais concevoir un système, pas seulement une application : orchestration, conteneurs, isolation et sécurité, avec une interface pour piloter le tout.",
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
		role: "Responsable de la partie informatique, sous la responsabilité de mon chef",
		layers: ["02", "01"],
		coreOffset: 90,
		title: "Faire fonctionner l’informatique d’une conférence de trois jours, en direct.",
		summary:
			"J’ai coordonné la partie informatique de la conférence : machines, réseau, régies, diffusion en ligne et support, avec une équipe d’environ dix personnes.",
		lead: "CISBAT 2025 est une conférence qui s’est tenue à l’EPFL du 3 au 5 septembre 2025. Dans le cadre de ma dernière année d’ES, pour un mandant externe, j’étais responsable de la partie informatique : préparation des machines et du réseau, organisation des régies, diffusion en ligne et support pendant l’événement. Je coordonnais une équipe d’environ dix personnes, sous la responsabilité de mon chef.",
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
				text: "Configuration des machines, réseau (switches, câblage), micros, caméras et matériel des régies, avant le premier jour.",
			},
			{
				title: "Une conférence hybride",
				text: "Participants sur place et en ligne : live sur Zoom, replays sur Vimeo, avec ConfTool et Swapcard côté organisation.",
			},
			{
				title: "Coordonner une équipe",
				text: "Répartir une dizaine de personnes entre régies, micros et support, puis gérer les problèmes au moment où ils apparaissent.",
			},
		],
		story: {
			kicker: "Sur le terrain",
			title: "Un exemple : un Wi-Fi visible, mais sans Internet",
			paragraphs: [
				"Personne ne m’avait signalé en amont qu’un accès Wi-Fi spécifique devait être mis à disposition pendant la conférence. La personne responsable du réseau avait bien fait des tests, mais à un autre endroit du campus.",
				"Le jour de la conférence, nous étions connectés à un autre point d’accès : le réseau apparaissait, les appareils s’y connectaient, mais sans accès à Internet. Il a fallu écarter rapidement la piste des appareils et de leur configuration, identifier que le problème venait de l’infrastructure propre au lieu, puis coordonner la résolution avec les personnes responsables.",
				"Rien de spectaculaire, mais c’est typiquement ce qu’un événement réel demande : diagnostiquer vite, parler aux bonnes personnes et garder le reste opérationnel.",
			],
		},
		stack: {
			"02": ["≈ 15 postes configurés", "Switches · câblage réseau", "Zoom (live)", "Vimeo (replays)"],
			"01": ["Régies", "Micros · caméras", "ConfTool · Swapcard", "Coordination d’équipe"],
		},
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
			caption: "Vue simplifiée du dispositif, des salles jusqu’à la diffusion en ligne.",
		},
		proves: "Que je ne travaille pas seulement derrière un écran : je peux préparer une infrastructure, coordonner une équipe et résoudre des problèmes au moment où ils arrivent.",
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
		text: "Un dé en 3D qu’on lance d’un geste : plus le swipe est fort, plus le dé roule, et le résultat reste aléatoire.",
		tech: "3D en CSS uniquement · JavaScript vanilla",
		href: "https://github.com/seb3x97/Dice",
		media: {
			kind: "video",
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
		text: "Une visualisation musicale : le son est analysé en temps réel et une sphère de points réagit aux basses.",
		tech: "Web Audio API · Canvas · visualisation qui réagit au son",
		href: "https://github.com/seb3x97/AudioAnalyser",
		media: {
			kind: "video",
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
