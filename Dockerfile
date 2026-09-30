# Étape 1 : Build de l'application Vite
FROM node:20-slim AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers
COPY . .

# Construire l'application (output dans /dist)
RUN npm run build

# Étape 2 : Image légère pour servir l'app
FROM node:20-slim AS runner

WORKDIR /app

# Installer un serveur statique ultra-léger
RUN npm install -g serve

# Copier le build depuis l'étape précédente
COPY --from=builder /app/dist ./dist

# Exposer le port (modifiable selon ton choix)
EXPOSE 4000

# Lancer le serveur sur le port défini
# -s : renvoie index.html pour les routes de la SPA (/projets/...)
CMD ["serve", "-s", "dist", "-l", "4000"]
