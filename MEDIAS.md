# Médias du portfolio

Tous les visuels des projets vivent dans `src/assets/media/`.
**Aucune ligne de code à modifier** : déposez simplement le fichier au bon chemin, avec le bon nom.
Le build le détecte automatiquement et remplace le placeholder hachuré.

- Extensions acceptées : `.webp`, `.avif`, `.jpg`, `.jpeg`, `.png`, `.gif` (images) · `.mp4`, `.webm` (vidéos).
- Si plusieurs formats existent pour le même nom, le plus léger (`avif` / `webp` / `webm`) est utilisé.
- Les légendes, textes alternatifs et ratios sont définis dans `src/content/projects.ts` (champ `media`).
- Conseil : exporter en WebP qualité 80–85.
- Cadrage : les **captures** (desktop, mobile) sont affichées en entier (`contain`) sur un fond neutre ; les **photos et vidéos** remplissent le cadre (`cover`). Respecter le ratio évite toute marge ou tout recadrage.
- Pour changer le cadrage d'un média, dans `src/content/projects.ts` : `fit: "cover" | "contain"`, `position: "50% 30%"` (point focal en mode cover) ou `ratio` (si le fichier n'a pas le ratio de référence).

## Formats de référence

| Type | Ratio | Idéal | Minimum | Source |
|---|---|---|---|---|
| Capture mobile | 9:19,5 | 1170 × 2532 | 750 × 1624 | Capture native iOS / Android, **sans cadre d'appareil** |
| Capture desktop | 16:10 | 2560 × 1600 | 1440 × 900 | Navigateur desktop, sans barre d'onglets |
| Photo | 3:2 | 3000 × 2000 | 2000 × 1333 | Photo d'origine (JPG), non retouchée |
| Vidéo (boucle) | 16:9 ou 4:3 | 1920 × 1080 | 1280 × 720 | MP4 H.264 / WebM, **sans piste audio**, < 4 Mo |

## Liste des médias attendus

### Jalona — `projets/jalona/` (captures mobiles)

| Fichier | Contenu attendu |
|---|---|
| `accueil` | L'écran principal au quotidien (vue du jour ou de la semaine), avec des données réalistes. |
| `planification` | La création ou l'édition d'un élément planifié, montrant la richesse des options. |
| `recurrence` | Le réglage d'une récurrence avancée ou d'un rappel précis (point différenciant de l'app). |

### USTS-HC — `projets/usts-hc/`

| Fichier | Type | Contenu attendu |
|---|---|---|
| `site` | desktop | Page d'accueil du site public, en haut de page. *(image principale sur l'accueil)* |
| `dashboard` | desktop | Tableau de bord ou liste des équipes / joueurs dans le back-office. |
| `edition-match` | desktop | Édition d'un match ou d'un résultat. |
| `mobile` | mobile | Le site public sur téléphone (calendrier ou page d'une équipe). |

### Gestion de projet PLTE — `projets/plte/` (captures desktop)

| Fichier | Contenu attendu |
|---|---|
| `interface` | Écran principal (liste des projets ou vue d'ensemble). Anonymiser les noms si nécessaire. *(image principale)* |
| `planning` | Vue planning ou saisie des heures. |
| `collaboration` | Un écran où la synchronisation ou la gestion d'un conflit est visible. |

### Agent-hub — `projets/agent-hub/` (captures desktop)

| Fichier | Contenu attendu |
|---|---|
| `vue-bureau` | La vue de type bureau / office avec un ou plusieurs projets ouverts. **Masquer tout secret, token ou chemin sensible.** |
| `kanban` | La vue Kanban avec des tâches à différents stades. |

> Sur l'accueil, Agent-hub est illustré par son schéma d'architecture ; les captures apparaissent dans l'étude de cas.

### CISBAT 2025 — `projets/cisbat-2025/`

| Fichier | Type | Contenu attendu |
|---|---|---|
| `salle` | photo 3:2 | Vue large d'une salle principale (public, scène, écran). **Garder le sujet dans le tiers central** : recadrage en 4:5 possible sur mobile. *(image principale)* |
| `regie` | photo 3:2 | Une régie ou le poste de streaming (écrans, matériel, personne au travail). Illustre aussi le récit de l'incident Wi-Fi. |
| `preparation` | photo 3:2 | Préparation en amont : installation des postes, câblage, matériel réseau. |
| `equipe` | photo 3:2 | L'équipe en action — **avec l'accord des personnes visibles**. |
| `boucle` | vidéo 16:9 | Boucle de 5 à 10 s, sans son : une salle pendant une session ou la régie en fonctionnement. |

### Expériences — `experiences/` (ratio 16:10, 1600 × 1000 ; affichées en entier, sans recadrage)

| Fichier | Contenu attendu |
|---|---|
| `dice` | Boucle courte (3–6 s, sans son) du dé qui roule après un swipe. Une capture fixe est aussi acceptée. |
| `audio-analyser` | Boucle courte (3–6 s, sans son) de la sphère qui pulse sur les basses. Une capture fixe est aussi acceptée. |

## Ajouter un média

1. Exporter au bon ratio (voir tableau).
2. Nommer le fichier exactement comme indiqué (ex. `src/assets/media/projets/jalona/accueil.webp`).
3. `npm run dev` : le placeholder est remplacé.
4. Si besoin, ajuster `alt` / `caption` dans `src/content/projects.ts`.
