import type { JourneyEntry } from "./types";

// Du plus récent au plus ancien.
export const journey: JourneyEntry[] = [
	{
		period: "2026 → aujourd’hui",
		kind: "Projets",
		title: "Jalona et Agent-hub",
		text: "Deux projets menés seul : un produit mobile complet et une plateforme d’orchestration conteneurisée.",
		current: true,
	},
	{
		period: "2025 → juin 2027",
		kind: "Formation",
		title: "Informatique de gestion",
		place: "HEG",
		current: true,
	},
	{
		period: "2025",
		kind: "Expérience",
		title: "Développeur indépendant",
		place: "USTS-HC · mandat externe",
		text: "Site public et back-office d’un club de hockey, en production.",
		project: "usts-hc",
	},
	{
		period: "Sept. 2025",
		kind: "Expérience",
		title: "Responsable informatique, CISBAT 2025",
		place: "EPFL · projet de dernière année d’ES",
		text: "Machines, réseau, régies et diffusion d’une conférence de trois jours, avec une équipe d’environ dix personnes.",
		project: "cisbat-2025",
	},
	{
		period: "2023 → 2025",
		kind: "Formation",
		title: "Informatique de gestion",
		place: "ES",
	},
	{
		period: "2023 → 2024",
		kind: "Expérience",
		title: "Stage à la PL-MTI",
		place: "Projet pour la PLTE (EPFL)",
		text: "Système de gestion de projet pour la PLTE, client de la PL-MTI : interface VBA, API Laravel, base MySQL.",
		project: "plte",
	},
	{
		period: "2019 → 2023",
		kind: "Formation",
		title: "CFC de développeur",
	},
];
