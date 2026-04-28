# 📚 INDEX DE DOCUMENTATION - ISSATSO+

> Guide complet des fichiers de configuration et documentation

---

## 📖 Fichiers de Documentation

### 🔴 **Nouveaux Fichiers Créés**

#### 1. **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** ⭐ LIRE EN PREMIER

- 📋 Résumé complet de la configuration
- ✅ Checklist de vérification
- 🔧 Configuration détaillée
- 🐛 Problèmes courants

#### 2. **[XAMPP_SETUP_GUIDE.md](XAMPP_SETUP_GUIDE.md)** ⭐ POUR MYSQL

- 🗄️ Installation XAMPP (7 étapes)
- 💾 Créer la base de données
- 🔄 Migrer de SQLite à MySQL
- ⚙️ Configuration Django pour MySQL
- 🧪 Tests de vérification

#### 3. **[README_SETUP.md](README_SETUP.md)** 📚 GUIDE COMPLET

- 🚀 Démarrage rapide
- 📋 Prérequis
- ▶️ Lancer le projet
- 📡 API endpoints
- 🐛 Dépannage

---

## 🛠️ Fichiers de Configuration

### ⚙️ **Configuration Django**

#### **backend/settings.py**

- Actuellement : SQLite (développement)
- Configuration DB modifiable facilement
- JWT, CORS, REST Framework configurés

#### **[MYSQL_DATABASE_CONFIG.py](MYSQL_DATABASE_CONFIG.py)**

- Configuration prête pour MySQL
- À copier dans `backend/settings.py` quand prêt
- Paramètres optimisés

#### **[.env.example](.env.example)**

- Variables d'environnement
- Copier en `.env` et remplir
- Pour secrets (passwords, API keys)

---

## 🚀 Fichiers d'Automatisation

### 🐍 **Scripts Python**

#### **[migrate_to_mysql.py](migrate_to_mysql.py)** 🌟

```bash
# Migrer SQLite → MySQL automatiquement
python migrate_to_mysql.py
```

- ✅ Vérifie la connexion MySQL
- ✅ Sauvegarde SQLite
- ✅ Exécute les migrations
- ✅ Crée un super utilisateur
- ✅ Affiche les statistiques

#### **[backup_restore.py](backup_restore.py)**

```bash
# Menu interactif de backup/restore
python backup_restore.py

# Ou commandes :
python backup_restore.py backup   # Sauvegarde
python backup_restore.py list     # Liste les backups
```

- 💾 Backup SQLite + JSON
- 🔄 Restauration facile
- 📊 Commandes MySQL incluses

### 🪟 **Scripts Windows**

#### **[start.bat](start.bat)** 🟢 SIMPLE

```bash
# Double-cliquez sur start.bat
```

- Démarre XAMPP automatiquement
- Lance MySQL
- Démarre Django

#### **[start.ps1](start.ps1)** ⚡ MODERNE

```bash
# Exécutez dans PowerShell
.\start.ps1
```

- Meilleur feedback utilisateur
- Vérifications automatiques
- Plus contrôlable

---

## 📦 Dépendances & Données

### **[requirements.txt](requirements.txt)** 📦

```bash
# Installer toutes les dépendances
pip install -r requirements.txt
```

- Django 5.0.1
- Django REST Framework
- mysqlclient (pour MySQL)
- Toutes les dépendances documentées

### **[initial_data.sql](initial_data.sql)** 📋

- 5 Départements
- 5 Utilisateurs
- 4 Cours
- 8 Créneaux d'emploi du temps
- Notes, Absences, Stages
- À importer dans PhpMyAdmin

---

## 📁 Autres Fichiers Importants

### **[.gitignore](.gitignore)**

- Fichiers à ne pas commiter
- Dossiers temporaires
- Fichiers secrets

---

## 🎯 Guide de Démarrage Rapide

### Cas 1️⃣ : Développement Simple (SQLite)

```bash
1. pip install -r requirements.txt
2. python manage.py migrate
3. python manage.py runserver
4. Frontend : cd frontend && npm run dev
```

**Temps** : 5 minutes ⚡

### Cas 2️⃣ : Production (MySQL/XAMPP)

```bash
1. Télécharger XAMPP (XAMPP_SETUP_GUIDE.md)
2. pip install -r requirements.txt
3. pip install -r requirements.txt
4. Créer base de données (guide)
5. python migrate_to_mysql.py
6. Charger initial_data.sql (PhpMyAdmin)
7. python manage.py runserver
```

**Temps** : 30 minutes ⏱️

### Cas 3️⃣ : Restaurer une Sauvegarde

```bash
1. python backup_restore.py
2. Choisir option 3 ou 4
3. Sélectionner le fichier de backup
```

**Temps** : 2 minutes ⚡

---

## 🗂️ Structure des Fichiers

```
mini_projet_issatso/
│
├── 📖 Documentation
│   ├── SETUP_COMPLETE.md          ← Lire en premier!
│   ├── XAMPP_SETUP_GUIDE.md       ← Pour MySQL
│   ├── README_SETUP.md            ← Guide complet
│   ├── .env.example               ← Config env
│   └── INDEX.md                   ← Ce fichier
│
├── 🐍 Scripts Python
│   ├── migrate_to_mysql.py        ← Migrer à MySQL
│   ├── backup_restore.py          ← Backup/Restore
│   ├── manage.py                  ← CLI Django
│   └── seed_db.py                 ← Charger données
│
├── 🪟 Scripts Windows
│   ├── start.bat                  ← Lancer (simple)
│   └── start.ps1                  ← Lancer (PowerShell)
│
├── ⚙️ Configuration
│   ├── backend/
│   │   ├── settings.py            ← Config Django
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── requirements.txt           ← Dépendances
│   ├── MYSQL_DATABASE_CONFIG.py  ← Config MySQL
│   ├── .env.example               ← Variables env
│   └── .gitignore
│
├── 📊 Données
│   ├── initial_data.sql           ← Données SQL
│   └── db.sqlite3                 ← Base de données
│
├── 🎨 Frontend
│   ├── frontend/
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.js
│
└── 🔧 Modules Django
    ├── users/
    ├── courses/
    ├── students/
    ├── departments/
    ├── attendance/
    └── internships/
```

---

## 🚀 Workflow Typique

### Jour 1 : Installation

1. Lire [SETUP_COMPLETE.md](SETUP_COMPLETE.md)
2. Lire [XAMPP_SETUP_GUIDE.md](XAMPP_SETUP_GUIDE.md)
3. Installer XAMPP
4. `pip install -r requirements.txt`
5. `python migrate_to_mysql.py`

### Jour 2+ : Développement

1. Double-cliquer `start.bat` (ou `./start.ps1`)
2. Ouvrir http://localhost:3000
3. Coder les modifications
4. `python backup_restore.py backup` (avant quitter)

### Avant Commit

1. Vérifier `.gitignore`
2. Pas de fichiers secrets dans git
3. Faire un backup : `python backup_restore.py backup`

---

## 🔍 Recherche Rapide

### "Je veux installer XAMPP"

→ Voir [XAMPP_SETUP_GUIDE.md](XAMPP_SETUP_GUIDE.md)

### "Je veux migrer vers MySQL"

→ Exécuter `python migrate_to_mysql.py`

### "Je veux faire une sauvegarde"

→ Exécuter `python backup_restore.py`

### "Je veux lancer l'app"

→ Exécuter `start.bat` ou `./start.ps1`

### "Je veux charger les données initiales"

→ Importer `initial_data.sql` dans PhpMyAdmin

### "Je veux l'API docs"

→ Voir [README_SETUP.md](README_SETUP.md#-api-endpoints)

### "Je veux dépanner un problème"

→ Voir [README_SETUP.md](README_SETUP.md#-dépannage)

---

## ✅ Checklist Finale

Avant de commencer le développement :

- [ ] XAMPP installé (optionnel mais recommandé)
- [ ] Python 3.10+ installé
- [ ] Node.js 18+ installé
- [ ] `pip install -r requirements.txt` exécuté
- [ ] `python manage.py migrate` exécuté
- [ ] Serveur Django démarre sans erreur
- [ ] Frontend accessible sur http://localhost:3000
- [ ] API accessible sur http://localhost:8000/api/

---

## 📞 Support

**Problèmes?** Consultez :

1. [SETUP_COMPLETE.md](SETUP_COMPLETE.md) - Checklist et troubleshooting
2. [XAMPP_SETUP_GUIDE.md](XAMPP_SETUP_GUIDE.md) - Guide détaillé MySQL
3. [README_SETUP.md](README_SETUP.md) - Guide complet du projet

---

## 📝 Notes

- **Développement** : Utilisez SQLite (plus simple)
- **Production** : Utilisez MySQL (plus robuste)
- **Backup** : Avant chaque modification importante
- **Migration** : Testez d'abord en développement

---

**Version**: 1.0 (28 Avril 2026)  
**Projet**: ISSATSO+ - Gestion Académique  
**Status**: ✅ Prêt pour développement
