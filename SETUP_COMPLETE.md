# ✅ Configuration XAMPP pour ISSATSO+ - Résumé Complet

> 📌 Date : 28 Avril 2026  
> 📍 Projet : ISSATSO+ (Gestion Académique Django + React)

---

## 📦 Fichiers Créés

Voici tous les fichiers créés pour configurer XAMPP + MySQL :

### 1. 📖 **XAMPP_SETUP_GUIDE.md**

- Guide complet d'installation XAMPP
- Instructions étape par étape
- Dépannage détaillé
- Comparaison SQLite vs MySQL

### 2. 🐍 **migrate_to_mysql.py**

- Script Python automatisé
- Migre SQLite → MySQL
- Crée les super utilisateurs
- Vérifie les connexions

### 3. ⚙️ **MYSQL_DATABASE_CONFIG.py**

- Configuration Django pour MySQL
- À copier dans `backend/settings.py`
- Paramètres optimisés

### 4. 📋 **initial_data.sql**

- Données SQL pré-chargées
- 5 Départements
- 5 Utilisateurs (Admin + Profs + Étudiants)
- Cours, Notes, Stages, Absences

### 5. 🚀 **start.bat** (Windows Batch)

- Lanceur automatique
- Double-cliquez pour démarrer
- Lance XAMPP + Django

### 6. ⚡ **start.ps1** (PowerShell)

- Version moderne pour Windows
- Meilleur feedback utilisateur
- Vérifications automatiques

### 7. 📦 **requirements.txt**

- Dépendances Python documentées
- mysqlclient inclus
- Versions compatibles

### 8. 📚 **README_SETUP.md**

- Guide complet du projet
- Structure du projet
- API endpoints
- Dépannage

---

## 🎯 Prochaines Étapes (À Faire)

### 1️⃣ Installer XAMPP

```bash
# Téléchargez depuis : https://www.apachefriends.org/download.html
# Installez dans : C:\xampp\
# Lancez le control panel
```

### 2️⃣ Créer la Base de Données

```bash
# Via PhpMyAdmin : http://localhost/phpmyadmin
# Ou en ligne de commande :
# C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE issatso_db CHARACTER SET utf8mb4;"
```

### 3️⃣ Migrer vers MySQL

```bash
# Une fois MySQL configuré :
python migrate_to_mysql.py
```

### 4️⃣ Charger les Données

```bash
# Via PhpMyAdmin : Importer initial_data.sql
# Ou en ligne de commande :
# mysql -u root issatso_db < initial_data.sql
```

### 5️⃣ Lancer l'Application

```bash
# Option 1 (Simple) : Double-cliquez start.bat
# Option 2 (PowerShell) : .\start.ps1
# Option 3 (Manuel) : python manage.py runserver
```

---

## 🔧 Configuration Actuelle

### Base de Données

- **Type** : SQLite (actuellement)
- **Upgrade** : MySQL/XAMPP (prêt à utiliser)
- **Fichier config** : `backend/settings.py`

### Dépendances

- ✅ Django 5.0.1
- ✅ Django REST Framework 3.14.0
- ✅ JWT (Tokens)
- ✅ CORS configuré
- ✅ mysqlclient installé

### Frontend

- ✅ React 18
- ✅ Vite (build tool)
- ✅ axios (API calls)
- ✅ lucide-react (icons)

---

## 📊 Architecture de la Base de Données

### Tables Créées

```
users_user              → Utilisateurs (Admin, Profs, Étudiants)
departments_department  → Départements
courses_course          → Cours
courses_schedule        → Emploi du temps
courses_grade           → Notes des étudiants
students_student        → Profil étudiant
students_enrollment     → Inscriptions
attendance_absencecord  → Absences
internships_internship  → Stages
```

### Utilisateurs Pré-créés

```
✅ admin          / admin@issatso.com    [ADMIN]
✅ prof_info      / prof.info@issatso.com [ENSEIGNANT]
✅ prof_web       / prof.web@issatso.com  [ENSEIGNANT]
✅ student1       / student1@issatso.com  [ÉTUDIANT]
✅ student2       / student2@issatso.com  [ÉTUDIANT]

Tous les mots de passe : password123
```

---

## 🚀 Démarrage Rapide

### Pour les Développeurs

```bash
# Terminal 1 : Backend
python manage.py runserver

# Terminal 2 : Frontend
cd frontend && npm run dev

# Accès
- Frontend : http://localhost:3000
- API : http://localhost:8000/api/
- Admin : http://localhost:8000/admin/
```

### Pour les Tests MySQL

```bash
# Une fois XAMPP lancé
cd C:\xampp\mysql\bin
mysql.exe -u root

# Dans MySQL :
> USE issatso_db;
> SELECT * FROM users_user;
```

---

## ⚙️ Configuration Détaillée

### Settings Django

```python
# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'issatso_db',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

# Auth
AUTH_USER_MODEL = 'users.User'

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
```

### XAMPP Configuration

```
MySQL:
- Host : 127.0.0.1
- Port : 3306
- User : root
- Password : (vide)

PhpMyAdmin :
- URL : http://localhost/phpmyadmin
```

---

## 🔍 Vérification

### ✅ Checklist

- [ ] XAMPP installé dans `C:\xampp\`
- [ ] Service MySQL démarré
- [ ] Base de données `issatso_db` créée
- [ ] Migrations Django exécutées
- [ ] Données initiales chargées
- [ ] Super utilisateur créé
- [ ] Serveur Django lance sans erreur
- [ ] Frontend accessible sur port 3000
- [ ] API accessible sur port 8000

### 🧪 Tests

```bash
# Tester la connexion DB
python manage.py shell
>>> from django.db import connection
>>> connection.ensure_connection()
>>> print("✅ OK")

# Tester les utilisateurs
>>> from users.models import User
>>> User.objects.count()
>>> # Doit afficher : 5

# Tester les cours
>>> from courses.models import Course
>>> Course.objects.count()
>>> # Doit afficher : 4
```

---

## 🐛 Problèmes Courants

### ❌ "mysql.exe not found"

```bash
# Vérifiez que XAMPP est dans C:\xampp\
# Ajoutez au PATH Windows :
# C:\xampp\mysql\bin\
```

### ❌ "Access denied for user 'root'"

```bash
# Mot de passe vide ? Vérifiez settings.py :
'PASSWORD': '',  # Doit être vide

# Ou changez le mot de passe dans XAMPP
```

### ❌ "Database 'issatso_db' doesn't exist"

```bash
# Créez la base :
mysql -u root -e "CREATE DATABASE issatso_db CHARACTER SET utf8mb4;"
```

### ❌ "Port 8000 already in use"

```bash
# Utilisez un autre port :
python manage.py runserver 8001
```

---

## 📚 Documentation

- **[XAMPP_SETUP_GUIDE.md](XAMPP_SETUP_GUIDE.md)** - Guide d'installation complet
- **[README_SETUP.md](README_SETUP.md)** - Guide du projet
- **[requirements.txt](requirements.txt)** - Dépendances
- **[initial_data.sql](initial_data.sql)** - Données SQL

---

## 🎓 Ressources Utiles

| Ressource      | URL                                                     |
| -------------- | ------------------------------------------------------- |
| XAMPP Download | https://www.apachefriends.org/download.html             |
| Django Docs    | https://docs.djangoproject.com/                         |
| DRF Docs       | https://www.django-rest-framework.org/                  |
| MySQL Docs     | https://dev.mysql.com/doc/                              |
| React Docs     | https://react.dev/                                      |
| JWT Tutorial   | https://django-rest-framework-simplejwt.readthedocs.io/ |

---

## 📝 Notes

### Pourquoi XAMPP ?

- ✅ All-in-one (Apache, MySQL, PHP, Perl)
- ✅ Facile à installer sur Windows
- ✅ Interface graphique intuitive
- ✅ Gratuit et open-source
- ✅ Parfait pour développement local

### SQLite vs MySQL

- **SQLite** : Parfait pour développement, trop limité pour production
- **MySQL** : Recommandé pour production, multi-utilisateurs

### Structure du Projet

```
mini_projet_issatso/
├── backend/       → Configuration Django
├── frontend/      → React + Vite
├── [apps]/        → Modules Django (courses, users, etc.)
├── manage.py      → CLI Django
└── db.sqlite3     → Fichier de base de données
```

---

## ✨ Résumé

Vous avez maintenant :

1. ✅ Configuration Django prête pour MySQL
2. ✅ Scripts d'automatisation (Python, Batch, PowerShell)
3. ✅ Guide d'installation complet (XAMPP_SETUP_GUIDE.md)
4. ✅ Données initiales pré-chargées (initial_data.sql)
5. ✅ Documentation complète (README_SETUP.md)

**Prochaine étape** : Installer XAMPP et exécuter `python migrate_to_mysql.py` 🚀

---

**Questions?** Consultez les fichiers de documentation créés ou le guide XAMPP!
