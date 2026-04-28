# Configuration Django pour MySQL (XAMPP)
# Remplacez la section DATABASES dans backend/settings.py par ceci :

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'issatso_db',
        'USER': 'root',
        'PASSWORD': '',  # Laisser vide si pas de mot de passe XAMPP
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES', CHARACTER SET utf8mb4, COLLATE utf8mb4_unicode_ci",
            'charset': 'utf8mb4',
        },
        'CONN_MAX_AGE': 600,  # Pool de connexion
    }
}

# Note: Si vous avez un mot de passe MySQL, modifiez :
# 'PASSWORD': 'votre_mot_de_passe_mysql',
