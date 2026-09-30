# Portfolio — Sébastien Voide

Portfolio personnel, construit avec **Vue 3**, **TypeScript**, **SCSS**, **SVG** et **GSAP**.

Concept « vue en coupe » : un logiciel est présenté comme une pile de cinq couches
(interface, logique & API, données, infrastructure, terrain). Chaque projet traverse les couches qu'il touche ;
au scroll, la coupe du hero pivote de profil et devient le rail de lecture.

## Scripts

```sh
npm install
npm run dev         # serveur de développement
npm run build       # type-check + build de production
npm run preview     # prévisualisation du build
npm run lint        # ESLint
npm run format      # Prettier
```

## Organisation

```
src/
├─ content/          # tout le contenu éditorial (projets, parcours, compétences, couches, liens)
├─ components/
│  ├─ stack/         # la coupe : géométrie, rendu SVG, scène desktop (coupe → rail)
│  ├─ home/          # sections de l'accueil
│  ├─ project/       # schéma d'architecture, liste de stack
│  ├─ layout/        # header, footer, bande des couches (mobile), grille (touche G)
│  └─ ui/            # composants de base (média, puces de couches, boutons…)
├─ composables/      # état partagé de la coupe, révélations au scroll, médias
├─ styles/           # design system SCSS (tokens, breakpoints, base, typographie, mouvement)
├─ assets/media/     # médias des projets (voir MEDIAS.md)
└─ views/            # accueil et étude de cas (/projets/:slug)
```

- **Modifier un texte** : `src/content/*.ts`.
- **Ajouter une capture ou une photo** : voir [MEDIAS.md](./MEDIAS.md) — un fichier déposé au bon chemin remplace automatiquement son placeholder.
- **Easter egg** : la touche `G` affiche la grille de construction.

## Docker

```sh
docker build -t portfolio .
docker run -p 4000:4000 portfolio
```
