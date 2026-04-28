# 🎓 Système de Gestion du Cursus Universitaire

Une application web Full-Stack moderne permettant de gérer intégralement le cursus des étudiants, les départements, les emplois du temps, les notes, l'assiduité et les stages.

## 🌟 Fonctionnalités

- **Authentification & Rôles** : Connexion sécurisée (JWT) avec des permissions basées sur les rôles (Admin, Chef de Département, Enseignant, Étudiant).
- **Design Premium** : Interface utilisateur moderne avec Glassmorphism, animations fluides et gestion du Light/Dark Mode natif (sans librairie tierce lourde).
- **Emploi du temps (Schedule)** : 
  - Les administrateurs peuvent créer et gérer l'emploi du temps complet.
  - Les étudiants et enseignants consultent dynamiquement les cours qui les concernent.
- **Cours & Classes** : Les enseignants peuvent créer de nouveaux cours, cibler un niveau spécifique (ex: "1ère année", "Master") et y attacher des supports.
- **Notes & Résultats** : Saisie des notes par les enseignants et consultation privée par les étudiants.
- **Assiduité** : Pointage des présences et gestion des justificatifs.
- **Stages** : Workflow de demande de stage (Étudiant -> En attente -> Validation par le Chef de département).

## 🛠 Stack Technique

- **Backend** : Django 5, Django REST Framework, SimpleJWT
- **Base de Données** : PostgreSQL (ou SQLite par défaut en développement)
- **Frontend** : React 18, Vite, React Router, Axios, Lucide React (Icônes)
- **Style** : Vanilla CSS Premium (Variables CSS natives, flexbox/grid, animations)

## 🚀 Installation & Lancement Rapide

Ce projet contient un script automatisé pour tout lancer en une seule commande sous Linux/macOS.

### 1. Démarrer les serveurs
Placez-vous à la racine du projet et exécutez le script Bash fourni :
```bash
bash run.sh
```
Ce script va automatiquement :
- Appliquer toutes les migrations de base de données.
- Démarrer le serveur backend Django sur le port `8000`.
- Démarrer le serveur frontend React (Vite) sur le port `3000`.

### 2. Initialiser la Base de Données (Mock Data)
Pour tester l'application, nous fournissons un script qui génère un grand volume de données réalistes.
Dans un **nouveau terminal**, exécutez :
```bash
source venv/bin/activate
python seed_db.py
```

## 🔐 Comptes de Test Disponibles

Après avoir exécuté le script `seed_db.py`, vous pouvez utiliser ces comptes :

| Rôle | Nom d'utilisateur | Mot de passe | Ce que vous pouvez tester |
|------|-------------------|--------------|---------------------------|
| 👑 Admin | `admin` | `admin123` | Création de l'emploi du temps (onglet Schedule) |
| 👨‍🏫 Professeur | `prof1` | `prof123` | Création de nouveaux cours, choix des classes cibles |
| 🎓 Étudiant | `etudiant1` | `etud123` | Consultation de son propre emploi du temps et de ses notes |
| 🏢 Chef Dept | `chef_info` | `chef123` | Visualisation globale des étudiants de son département |

## 🏗 Architecture du Projet
```text
mini_projet_issat/
├── backend/            # Configuration Django (settings, urls)
├── users/              # Gestion des utilisateurs et rôles personnalisés
├── departments/        # Gestion des départements universitaires
├── students/           # Profils étudiants et inscriptions (Enrollments)
├── courses/            # Modules pédagogiques (Cours, Schedule, Notes)
├── attendance/         # Gestion des absences
├── internships/        # Workflow des conventions de stage
├── frontend/           # Application React Vite
│   ├── src/
│   │   ├── components/ # Composants réutilisables (Navbar, Sidebar)
│   │   ├── pages/      # Vues principales (Dashboard, Emploi du temps...)
│   │   └── index.css   # Système de design global (Glassmorphism, Dark mode)
├── run.sh              # Script lanceur
└── seed_db.py          # Script de génération de données
```

---
*Développé avec ❤️ pour une gestion universitaire simplifiée et élégante.*
