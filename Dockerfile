# Utiliser une image de base Node.js
FROM node:18-alpine
# Définir le répertoire de travail
WORKDIR /app
# Copier les fichiers de dépendances
COPY package*.json ./
# Installer les dépendances
RUN npm install --production
# Copier le reste du code source
COPY . .
# Exposer le port (vérifiez le port utilisé dans votre index.js/app.js)
EXPOSE 3000
# Commande de démarrage
CMD ["node", "server.js"] 
# (Remplacez index.js par votre fichier d'entrée, ex: app.js ou server.js)
