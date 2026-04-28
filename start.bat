@echo off
REM ============================================================
REM Script de démarrage complet pour le projet ISSATSO
REM Démarre XAMPP + Django
REM ============================================================

setlocal enabledelayedexpansion

echo.
echo ================================================
echo   🚀 Lancement du Projet ISSATSO + XAMPP
echo ================================================
echo.

REM Vérifier si XAMPP existe
if not exist "C:\xampp\xampp-control-panel.exe" (
    echo.
    echo ❌ XAMPP n'est pas installé!
    echo.
    echo 📥 Téléchargez XAMPP: https://www.apachefriends.org/download.html
    echo 📍 Installez-le dans: C:\xampp\
    echo.
    pause
    exit /b 1
)

REM Lancer XAMPP (en arrière-plan)
echo 1️⃣  Lancement de XAMPP...
start "" "C:\xampp\xampp-control-panel.exe"
timeout /t 3 /nobreak

REM Démarrer MySQL
echo 2️⃣  Vérification de MySQL...
cd /d C:\xampp\mysql\bin
start cmd /k "mysqld.exe"
timeout /t 2 /nobreak

REM Retourner au dossier du projet
echo 3️⃣  Lancement du serveur Django...
cd /d "%~dp0"

REM Activer l'environnement virtuel (si existe)
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    echo ✅ Environnement virtuel activé
)

REM Lancer Django
python manage.py runserver

pause
