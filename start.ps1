#!/usr/bin/env pwsh
# ============================================================
# 🚀 Script PowerShell - Démarrage ISSATSO + XAMPP
# ============================================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   🚀 Lancement du Projet ISSATSO + XAMPP     " -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$xamppPath = "C:\xampp"
$mysqlBin = "$xamppPath\mysql\bin\mysql.exe"
$controlPanel = "$xamppPath\xampp-control-panel.exe"

# 1. Vérifier XAMPP
Write-Host "1️⃣  Vérification de XAMPP..." -ForegroundColor Yellow
if (-Not (Test-Path $xamppPath)) {
    Write-Host "❌ XAMPP n'est pas installé!" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 Téléchargez XAMPP: https://www.apachefriends.org/download.html" -ForegroundColor Cyan
    Write-Host "📍 Installez-le dans: C:\xampp\" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}
Write-Host "✅ XAMPP trouvé!" -ForegroundColor Green

# 2. Lancer XAMPP Control Panel
Write-Host ""
Write-Host "2️⃣  Lancement de XAMPP Control Panel..." -ForegroundColor Yellow
Start-Process $controlPanel

# 3. Attendre que MySQL démarre
Write-Host "3️⃣  Attente du démarrage de MySQL..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# 4. Vérifier la connexion MySQL
$maxAttempts = 10
$connected = $false

for ($i = 0; $i -lt $maxAttempts; $i++) {
    Write-Host "   Tentative $($i+1)/$maxAttempts..." -ForegroundColor Gray
    
    try {
        # Essayer de se connecter à MySQL
        $output = & $mysqlBin -u root -e "SELECT VERSION();" 2>&1
        if ($output) {
            $connected = $true
            Write-Host "✅ MySQL connecté! Version: $output" -ForegroundColor Green
            break
        }
    } catch {
        # Attendre et réessayer
        Start-Sleep -Seconds 1
    }
}

if (-Not $connected) {
    Write-Host "⚠️  MySQL n'est pas encore prêt..." -ForegroundColor Yellow
    Write-Host "   Assurez-vous que XAMPP est en cours d'exécution!" -ForegroundColor Yellow
}

# 5. Lancer Django
Write-Host ""
Write-Host "4️⃣  Lancement du serveur Django..." -ForegroundColor Yellow
Write-Host ""

# Vérifier l'environnement virtuel
if (Test-Path "venv\Scripts\Activate.ps1") {
    Write-Host "✅ Environnement virtuel trouvé" -ForegroundColor Green
    & "venv\Scripts\Activate.ps1"
}

# Lancer Django
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "   ✅ Django démarre..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📍 API: http://localhost:8000/api/" -ForegroundColor Cyan
Write-Host "📍 Admin: http://localhost:8000/admin/" -ForegroundColor Cyan
Write-Host "📍 PhpMyAdmin: http://localhost/phpmyadmin" -ForegroundColor Cyan
Write-Host ""

python manage.py runserver

Read-Host "Appuyez sur Entrée pour quitter"
