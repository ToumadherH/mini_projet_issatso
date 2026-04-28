# 🗄️ Configuration XAMPP + Django (Guide Complet)

## 📋 Vue d'ensemble

Ce guide explique comment configurer votre projet Django avec XAMPP (MySQL) au lieu de SQLite.

---

## **ÉTAPE 1️⃣ : Télécharger et Installer XAMPP**

### Option A : Téléchargement manuel

1. Accédez à : https://www.apachefriends.org/download.html
2. Téléchargez **XAMPP pour Windows** (dernière version)
3. Lancez le fichier `.exe` et suivez l'installation
4. **Chemin recommandé** : `C:\xampp\`
5. À la fin, laissez cocher l'option "Start XAMPP"

### Option B : Installation rapide (Script PowerShell)

```powershell
# Exécutez ce script en tant qu'administrateur
$url = "https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe/download"
$output = "$env:TEMP\xampp-installer.exe"
Invoke-WebRequest -Uri $url -OutFile $output
& $output
```

---

## **ÉTAPE 2️⃣ : Démarrer les Services XAMPP**

### Via le Panneau de Contrôle XAMPP :

1. Ouvrez `C:\xampp\xampp-control-panel.exe`
2. Cliquez sur **"Start"** pour **Apache** et **MySQL**
3. Attendez que le statut passe au **vert**

### Ou via PowerShell (administrateur) :

```powershell
cd C:\xampp
.\mysql\bin\mysqld.exe --install MySQL80
net start MySQL80
```

---

## **ÉTAPE 3️⃣ : Créer la Base de Données**

### Via PhpMyAdmin (Interface web)

1. Ouvrez : http://localhost/phpmyadmin
2. Connectez-vous (user: `root`, password: vide)
3. Cliquez sur **"Bases de données"**
4. Entrez `issatso_db` et cliquez **"Créer"**
5. Choisissez **utf8mb4_unicode_ci** comme collation

### Ou via ligne de commande :

```powershell
cd C:\xampp\mysql\bin
.\mysql.exe -u root -e "CREATE DATABASE issatso_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
.\mysql.exe -u root issatso_db -e "SHOW TABLES;"
```

---

## **ÉTAPE 4️⃣ : Configurer Django pour MySQL**

### 1. Modifier le fichier `.env`

Décommentez/ajoutez :

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

`backend/settings.py` lit déjà ces variables automatiquement.

### 2. Installer le driver MySQL pour Python (si pas fait)

```bash
pip install mysqlclient
```

---

## **ÉTAPE 5️⃣ : Migrer vers MySQL**

### ⚠️ IMPORTANT : Backup avant la migration

```bash
# Sauvegarder la base de données SQLite
copy db.sqlite3 db.sqlite3.backup
```

### Exécuter les migrations

```bash
# Dans le dossier du projet
python manage.py migrate
```

### Vérifier que tout fonctionne

```bash
python manage.py shell
>>> from django.db import connection
>>> connection.ensure_connection()
>>> print("✅ Base de données MySQL connectée!")
>>> exit()
```

---

## **ÉTAPE 6️⃣ : Vérifier les données**

### Via PhpMyAdmin

1. Ouvrez http://localhost/phpmyadmin
2. Allez à **issatso_db**
3. Vous devriez voir les tables (users, departments, etc.)

### Via Django

```bash
python manage.py shell
>>> from users.models import User
>>> User.objects.count()
>>> # Vous devriez voir le nombre d'utilisateurs
```

---

## **🚀 Redémarrer le serveur Django**

```bash
python manage.py runserver
```

Votre projet est maintenant connecté à **MySQL via XAMPP** ! 🎉

---

## **❌ Dépannage**

### "Error 2003: Can't connect to MySQL server"

- ✅ Vérifiez que MySQL est démarré dans XAMPP
- ✅ Vérifiez le port (3306 par défaut)
- ✅ Vérifiez que host est `127.0.0.1` ou `localhost`

### "django.db.utils.ProgrammingError: column not found"

- ✅ Assurez-vous d'avoir exécuté `python manage.py migrate`
- ✅ Vérifiez que la base de données existe

### "mysqlclient" import error

- ✅ Réinstaller : `pip install --upgrade mysqlclient`

---

## **📊 Comparaison SQLite vs MySQL**

| Aspect       | SQLite            | MySQL                   |
| ------------ | ----------------- | ----------------------- |
| Fichier      | Fichier unique    | Base de données serveur |
| Performances | Bon pour dev      | Excellent pour prod     |
| Concurrence  | Limitée           | Excellente              |
| Backup       | Copier le fichier | Export/Import           |
| **Utilisé**  | Développement     | Production              |

---

## **✅ Commandes Utiles**

```bash
# Voir toutes les tables
python manage.py inspectdb

# Exporter la base de données
python manage.py dumpdata > backup.json

# Importer la base de données
python manage.py loaddata backup.json

# Réinitialiser la base de données
python manage.py flush
```

---

## **📝 Fichier de configuration MySQL sauvegardé**

Votre configuration Django est prête à passer à MySQL. Suivez simplement les étapes ci-dessus !
