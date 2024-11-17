# !/bin/bash

DJANGO_MANAGE = server/manage.py
DEV_VITE_DOMAIN = http://127.0.0.1:81
SERVER_DEBUG = 1

# Variables for setting the backend server url that the frontend should make requests to. 
BUILD_VITE_DOMAIN = https://0.0.0.0
BUILD_VITE_DOMAIN_PORT = 80

#Runs django dev with dev env
ddev:
	DEBUG = ${SERVER_DEBUG}
	python ${DJANGO_MANAGE} makemigrations
	python ${DJANGO_MANAGE} migrate
	python ${DJANGO_MANAGE} runserver 81

#Runs vite dev server with localhost env
ndev:
	VITE_DOMAIN=${DEV_VITE_DOMAIN}
	npm --prefix ./client/ run dev

#Runs docker build to make the client and the server container images
build:
	VITE_DOMAIN=${BUILD_VITE_DOMAIN}:${BUILD_VITE_DOMAIN_PORT}
	docker build -t erecipe-frontend ./client/
	docker build -t erecipe-backend ./server/

#Builds the container images user docker-compose with localhost in dev env
dev-compose:
	DEBUG=${SERVER_DEBUG}
	VITE_DOMAIN = ${DEV_VITE_DOMAIN}
	docker-compose up -d


production-compose:
	VITE_DOMAIN=${BUILD_VITE_DOMAIN}:${BUILD_VITE_DOMAIN_PORT}
	docker-compose up -d



