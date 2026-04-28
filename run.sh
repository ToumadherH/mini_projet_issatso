#!/bin/bash

echo "🚀 Démarrage du projet Université (Django + React)..."

# Chemin absolu du projet
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ========================================
# 0. Nettoyage des ports (Évite l'erreur "port in use")
# ========================================
echo "🧹 Libération des ports 8000 et 3000..."
fuser -k 8000/tcp 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
sleep 1

# ========================================
# 1. Démarrage du Backend (Django)
# ========================================
echo "🐍 Préparation du backend Django..."
cd "$PROJECT_DIR"
if [ ! -d "venv" ]; then
    echo "Création de l'environnement virtuel..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt 2>/dev/null || echo "Le fichier requirements.txt n'existe pas encore. Les dépendances de base sont censées être installées."

echo "Application des migrations de base de données..."
# On force l'utilisation de SQLite si PostgreSQL n'est pas configuré
python manage.py makemigrations users departments students internships attendance courses
python manage.py migrate

echo "Démarrage du serveur backend sur http://localhost:8000..."
python manage.py runserver &
BACKEND_PID=$!

# ========================================
# 2. Démarrage du Frontend (React + Vite)
# ========================================
echo "⚛️ Préparation du frontend React..."
cd "$PROJECT_DIR/frontend"

if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances frontend..."
    npm install
fi

echo "Démarrage du serveur frontend sur http://localhost:3000..."
npm run dev -- --port 3000 &
FRONTEND_PID=$!

# ========================================
# Gestion de l'arrêt
# ========================================
echo "✅ Les deux serveurs sont en cours d'exécution !"
echo "👉 Frontend : http://localhost:3000"
echo "👉 Backend API : http://localhost:8000"
echo "Appuyez sur Ctrl+C pour arrêter les deux serveurs."

# Attendre que les processus se terminent ou qu'on les tue
trap "echo '🛑 Arrêt des serveurs...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait $FRONTEND_PID $BACKEND_PID
