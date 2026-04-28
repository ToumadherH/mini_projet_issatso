#!/usr/bin/env python
"""
💾 Script de Backup/Restore pour ISSATSO+
Facilite la sauvegarde et restauration des données
"""

import os
import sys
import json
import shutil
import subprocess
from datetime import datetime
from pathlib import Path

def backup_sqlite():
    """Sauvegarde la base SQLite"""
    db_file = Path('db.sqlite3')
    if not db_file.exists():
        print("❌ db.sqlite3 non trouvé")
        return False
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_name = f"backups/sqlite_backup_{timestamp}.sqlite3"
    
    Path("backups").mkdir(exist_ok=True)
    shutil.copy2(db_file, backup_name)
    
    print(f"✅ Backup SQLite : {backup_name}")
    return backup_name

def backup_json():
    """Exporte les données en JSON"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    json_file = f"backups/data_export_{timestamp}.json"
    
    Path("backups").mkdir(exist_ok=True)
    
    print("📊 Exporte les données JSON...")
    result = subprocess.run(
        [sys.executable, "manage.py", "dumpdata", "--indent", "2"],
        capture_output=True,
        text=True
    )
    
    if result.returncode != 0:
        print(f"❌ Erreur : {result.stderr}")
        return False
    
    with open(json_file, 'w') as f:
        f.write(result.stdout)
    
    size = Path(json_file).stat().st_size / 1024  # KB
    print(f"✅ Backup JSON : {json_file} ({size:.2f} KB)")
    return json_file

def restore_sqlite(backup_file):
    """Restaure la base SQLite"""
    if not Path(backup_file).exists():
        print(f"❌ Fichier backup non trouvé : {backup_file}")
        return False
    
    shutil.copy2(backup_file, 'db.sqlite3')
    print(f"✅ Restauration SQLite depuis : {backup_file}")
    return True

def restore_json(json_file):
    """Restaure les données JSON"""
    if not Path(json_file).exists():
        print(f"❌ Fichier JSON non trouvé : {json_file}")
        return False
    
    print("📊 Charge les données JSON...")
    result = subprocess.run(
        [sys.executable, "manage.py", "loaddata", json_file],
        capture_output=True,
        text=True
    )
    
    if result.returncode != 0:
        print(f"❌ Erreur : {result.stderr}")
        return False
    
    print(f"✅ Restauration JSON : {json_file}")
    return True

def backup_mysql_command(database='issatso_db', user='root', password=''):
    """Affiche la commande pour backup MySQL"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = f"backups/mysql_backup_{timestamp}.sql"
    
    password_opt = f"-p{password}" if password else ""
    
    cmd = f'mysqldump -u {user} {password_opt} {database} > {backup_file}'
    
    print("🗄️  Commande Backup MySQL :")
    print(f"   {cmd}")
    print()
    print(f"💾 Sauvegarde sera dans : {backup_file}")
    
    return cmd

def restore_mysql_command(backup_file, database='issatso_db', user='root', password=''):
    """Affiche la commande pour restaurer MySQL"""
    password_opt = f"-p{password}" if password else ""
    
    cmd = f'mysql -u {user} {password_opt} {database} < {backup_file}'
    
    print("🗄️  Commande Restauration MySQL :")
    print(f"   {cmd}")
    print()
    print(f"💾 Restauration depuis : {backup_file}")
    
    return cmd

def list_backups():
    """Liste tous les backups"""
    backup_dir = Path('backups')
    if not backup_dir.exists():
        print("📁 Aucun backup trouvé")
        return
    
    backups = list(backup_dir.glob('*'))
    if not backups:
        print("📁 Aucun backup trouvé")
        return
    
    print("\n📁 Backups disponibles :")
    for i, backup in enumerate(sorted(backups, reverse=True), 1):
        size = backup.stat().st_size / 1024 / 1024  # MB
        print(f"   {i}. {backup.name} ({size:.2f} MB)")

def interactive_menu():
    """Menu interactif"""
    print("=" * 60)
    print("   💾 ISSATSO+ - Backup & Restore Tool")
    print("=" * 60)
    print()
    
    options = {
        '1': ('Backup SQLite', backup_sqlite),
        '2': ('Backup JSON (Données)', backup_json),
        '3': ('Restaurer SQLite', lambda: restore_sqlite(input("Fichier backup : "))),
        '4': ('Restaurer JSON', lambda: restore_json(input("Fichier JSON : "))),
        '5': ('Commande Backup MySQL', backup_mysql_command),
        '6': ('Commande Restauration MySQL', lambda: restore_mysql_command(input("Fichier SQL : "))),
        '7': ('Lister les Backups', list_backups),
        '0': ('Quitter', None),
    }
    
    for key, (label, _) in options.items():
        print(f"   {key}. {label}")
    
    print()
    choice = input("Choisissez une option (0-7) : ").strip()
    
    if choice == '0':
        return
    
    if choice in options:
        label, func = options[choice]
        if func:
            print(f"\n▶️  {label}...")
            func()
            print()
    else:
        print("❌ Option invalide")

def main():
    """Fonction principale"""
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == 'backup':
            print("💾 Backup en cours...")
            backup_sqlite()
            backup_json()
            print("✅ Backup complété!")
            
        elif command == 'list':
            list_backups()
            
        elif command == 'help':
            print("Usage :")
            print("   python backup_restore.py             - Menu interactif")
            print("   python backup_restore.py backup      - Backup SQLite + JSON")
            print("   python backup_restore.py list        - Lister les backups")
            print()
        else:
            print(f"❌ Commande inconnue : {command}")
    else:
        interactive_menu()

if __name__ == '__main__':
    main()
