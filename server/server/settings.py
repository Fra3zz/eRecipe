"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 5.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
from django.utils.crypto import get_random_string
from dotenv import load_dotenv
import os
import hashlib
import json
from datetime import datetime
import time

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
if bool(int(os.environ.get("DEBUG", 0))) == True:
    DEBUG = True
else:
    DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
if DEBUG:
    SECRET_KEY = "I_AM_INSECURE._SERVER_IS_IN_DEBUG_MODE"
else:
    SECRET_KEY = get_random_string(length=240)
    
    
time_date = datetime.now()

SECRET_HASH = hashlib.sha256(bytes(f"{SECRET_KEY}", encoding="utf-8")).hexdigest()


print(f"\n SECRET_KEY: {SECRET_KEY}\n TIME: {time_date}\n SECRET_KEY_SHA256: {SECRET_HASH}\n")


if DEBUG:
    ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
else:
    allowed_hosts = os.environ.get("ALLOWED_HOSTS", "")
    ALLOWED_HOSTS = allowed_hosts.split(",") if allowed_hosts else []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "rest_framework",
    'corsheaders',
    "ingrediant",
    "recipe"
]



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

if DEBUG:
    CORS_ALLOWED_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']
else:
    allowed_hosts = os.environ.get("CORS_ALLOWED_ORIGINS", "")
    CORS_ALLOWED_ORIGINS = allowed_hosts.split(",") if allowed_hosts else []


ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Django REST Framework settings
# Enable Browsable API in development only

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',  # Always use JSONRenderer
    )
}

# Add BrowsableAPIRenderer in development
if DEBUG:
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] += (
        'rest_framework.renderers.BrowsableAPIRenderer',  # Enable in dev mode
    )

