#!/usr/bin/env python
"""
🗄️ Script de Migration SQLite → MySQL pour Django
Automatise la migration vers XAMPP/MySQL
"""

import os
import sys
import django
from pathlib import Path

# Configuration
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.core.management import call_command
from django.db import connection

def check_mysql_connection():
    """Vérifie la connexion à MySQL"""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT VERSION()")
            version = cursor.fetchone()[0]
            print(f"✅ Connecté à MySQL {version}")
            return True
    except Exception as e:
        print(f"❌ Impossible de se connecter à MySQL: {e}")
        print("   Assurez-vous que XAMPP est en cours d'exécution!")
        return False

def backup_sqlite():
    """Crée une sauvegarde SQLite"""
    db_file = Path('db.sqlite3')
    if db_file.exists():
        backup_file = Path('db.sqlite3.backup')
        db_file.rename(backup_file)
        print(f"✅ Sauvegarde SQLite créée: {backup_file}")
        return backup_file
    return None

def run_migrations():
    """Exécute les migrations Django"""
    print("\n📊 Exécution des migrations...")
    try:
        call_command('migrate', verbosity=1)
        print("✅ Migrations complétées avec succès!")
        return True
    except Exception as e:
        print(f"❌ Erreur lors des migrations: {e}")
        return False

def create_superuser():
    """Crée un super utilisateur"""
    from django.contrib.auth import get_user_model
    User = get_user_model()
    
    if User.objects.filter(username='admin').exists():
        print("⚠️  Admin existe déjà")
        return
    
    print("\n👤 Création du super utilisateur...")
    User.objects.create_superuser('admin', 'admin@issatso.com', 'admin123')
    print("✅ Super utilisateur créé (login: admin / password: admin123)")

def verify_tables():
    """Vérifie que les tables sont créées"""
    print("\n📋 Vérification des tables...")
    with connection.cursor() as cursor:
        cursor.execute("SHOW TABLES;")
        tables = cursor.fetchall()
        print(f"✅ Nombre de tables: {len(tables)}")
        for table in tables:
            print(f"   - {table[0]}")

def main():
    """Fonction principale"""
    print("=" * 60)
    print("🗄️  Migration SQLite → MySQL (XAMPP)")
    print("=" * 60)
    
    # Vérifier la connexion MySQL
    print("\n1️⃣  Vérification de la connexion MySQL...")
    if not check_mysql_connection():
        print("\n⚠️  XAMPP/MySQL n'est pas disponible.")
        print("   📥 Téléchargez et installez XAMPP depuis: https://www.apachefriends.org/download.html")
        print("   ▶️  Lancez XAMPP et démarrez les services MySQL et Apache")
        sys.exit(1)
    
    # Sauvegarder SQLite
    print("\n2️⃣  Sauvegarde de la base de données SQLite...")
    backup_sqlite()
    
    # Exécuter les migrations
    print("\n3️⃣  Exécution des migrations...")
    if not run_migrations():
        sys.exit(1)
    
    # Vérifier les tables
    print("\n4️⃣  Vérification des tables...")
    verify_tables()
    
    # Créer un super utilisateur
    print("\n5️⃣  Création du super utilisateur...")
    create_superuser()
    
    print("\n" + "=" * 60)
    print("✅ Migration terminée avec succès!")
    print("=" * 60)
    print("\n🚀 Prochaines étapes:")
    print("   1. Lancez le serveur: python manage.py runserver")
    print("   2. Admin: http://localhost:8000/admin")
    print("   3. API: http://localhost:8000/api/")
    print("   4. PhpMyAdmin: http://localhost/phpmyadmin")
    print("\n")

if __name__ == '__main__':
    main()
