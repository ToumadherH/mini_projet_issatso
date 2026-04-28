# 📚 ISSATSO+ - Guide de Configuration avec XAMPP

> Gestion Académique Complète - Django + React + MySQL/XAMPP

---

## 🚀 Démarrage Rapide

### ⚡ Le plus simple (Windows)

```bash
# Double-cliquez sur start.bat ou exécutez :
.\start.ps1
```

Cela :

- ✅ Lance XAMPP automatiquement
- ✅ Démarre MySQL
- ✅ Lance le serveur Django

---

## 📋 Prérequis

- Python 3.10+ https://www.python.org/downloads/
- Node.js 18+ https://nodejs.org/
- XAMPP https://www.apachefriends.org/download.html
- Git (optionnel)

---

## 🔧 Installation (Première fois)

### 1️⃣ Installer XAMPP

- Téléchargez depuis : https://www.apachefriends.org/download.html
- Installez dans : `C:\xampp\`
- Lancez le **Control Panel**

### 2️⃣ Installer les dépendances Python

```bash
cd mini_projet_issatso

# Créer un environnement virtuel (recommandé)
python -m venv venv

# Activer l'environnement
venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt
```

### 3️⃣ Installer les dépendances Node.js

```bash
cd frontend

npm install

cd ..
```

### 4️⃣ Configurer la Base de Données

Le projet lit maintenant les variables d’environnement de `.env.example`.

#### Option A : SQLite (développement rapide)

Laissez les valeurs par défaut :

```env
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
```

#### Option B : MySQL/XAMPP (quand MariaDB 10.5+ est installé)

Décommentez et ajustez :

```env
DB_ENGINE=django.db.backends.mysql
DB_NAME=issatso_db
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1
DB_PORT=3306
DB_CHARSET=utf8mb4
DB_INIT_COMMAND=SET sql_mode='STRICT_TRANS_TABLES'
DB_CONN_MAX_AGE=600
```

Voir aussi : [XAMPP_SETUP_GUIDE.md](XAMPP_SETUP_GUIDE.md)

---

## ▶️ Lancer le Projet

### Backend Django

```bash
# Terminal 1 - Backend
cd mini_projet_issatso
venv\Scripts\activate
python manage.py runserver
```

API disponible à : http://localhost:8000/api/

### Frontend React

```bash
# Terminal 2 - Frontend
cd frontend
npm run dev
```

App disponible à : http://localhost:3000

---

## 📊 Gestion des Données

### Créer un Super Utilisateur

```bash
python manage.py createsuperuser
```

### Administration Django

- URL : http://localhost:8000/admin
- Gérez : Utilisateurs, Cours, Étudiants, etc.

### PhpMyAdmin (si MySQL est configuré)

- URL : http://localhost/phpmyadmin
- User: `root`
- Password: (laisser vide)

---

## 🗄️ Migration SQLite → MySQL

Voir le guide complet : [XAMPP_SETUP_GUIDE.md](XAMPP_SETUP_GUIDE.md)

**Commande rapide une fois MySQL configuré :**

1. Passez `DB_ENGINE` à `django.db.backends.mysql` dans votre `.env`.
2. Créez la base `issatso_db`.
3. Lancez :

```bash
python manage.py migrate
python seed_db.py
```

---

## 📁 Structure du Projet

```
mini_projet_issatso/
├── backend/              # Configuration Django
│   ├── settings.py       # ⚙️ Configuration DB
│   ├── urls.py
│   └── wsgi.py
├── frontend/             # React + Vite
│   ├── src/
│   │   ├── pages/        # Emploi, Notes, Étudiants...
│   │   ├── components/   # Navbar, Sidebar
│   │   └── context/      # Auth, Theme
│   └── package.json
├── attendance/           # Module Absences
├── courses/              # Module Cours
├── departments/          # Module Départements
├── internships/          # Module Stages
├── students/             # Module Étudiants
├── users/                # Module Utilisateurs
├── db.sqlite3            # 📦 Base de données (SQLite)
├── manage.py             # CLI Django
├── XAMPP_SETUP_GUIDE.md  # 📖 Guide MySQL
└── requirements.txt      # 📦 Dépendances Python
```

---

## 🔐 Authentification

L'app utilise **JWT (JSON Web Tokens)**

### Login

```bash
POST /api/token/
{
  "username": "user@example.com",
  "password": "password123"
}

# Réponse
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Utiliser le Token

```bash
GET /api/students/
Headers: {
  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 📡 API Endpoints

### Publics

- `POST /api/token/` - Login
- `POST /api/token/refresh/` - Refresh token

### Authentifiés

- `GET /api/students/` - Liste des étudiants
- `GET /api/courses/list/` - Liste des cours
- `GET /api/attendance/records/` - Absences
- `GET /api/courses/grades/` - Notes
- `GET /api/courses/schedule/` - Emploi du temps
- `GET /api/internships/applications/` - Stages
- `GET /api/departments/` - Départements

---

## 🐛 Dépannage

### "Port 8000 déjà utilisé"

```bash
python manage.py runserver 8001
```

### "Module not found: MySQL"

```bash
pip install mysqlclient
```

### "CORS error"

- ✅ C'est normal en développement
- Vérifiez que `CORS_ALLOW_ALL_ORIGINS = True` dans settings.py

### "Base de données vide"

```bash
python manage.py migrate
python manage.py createsuperuser
```

---

## 📚 Ressources

- [Django Docs](https://docs.djangoproject.com/)
- [DRF Docs](https://www.django-rest-framework.org/)
- [React Docs](https://react.dev/)
- [XAMPP Support](https://www.apachefriends.org/)
- [JWT Auth](https://django-rest-framework-simplejwt.readthedocs.io/)

---

## 👥 Contributeurs

- Frontend : React + Vite
- Backend : Django + DRF
- Database : SQLite ou MySQL selon `.env`

---

## 📝 License

MIT License - Libre d'utilisation pour l'éducation

---

## 🎯 Prochaines Étapes

- [ ] Configurer MySQL/XAMPP
- [ ] Ajouter l'upload de fichiers
- [ ] Configurer les emails
- [ ] Déployer en production
- [ ] Ajouter les tests

---

**Besoin d'aide?** Consultez [XAMPP_SETUP_GUIDE.md](XAMPP_SETUP_GUIDE.md) pour plus de détails.
