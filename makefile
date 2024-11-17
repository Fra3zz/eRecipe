# !/bin/bash

DJANGO_MANAGE = server/manage.py
DEV_VITE_DOMAIN = http://0.0.0.0
SERVER_DEBUG_TRUE = 1

# Variables for setting the backend server url that the frontend should make requests to. 
DOMAIN ?= https://example.com
BUILD_VITE_DOMAIN_PORT = 80




#Runs docker build to make the client and the server container images
build:
	VITE_DOMAIN=${DOMAIN}:${BUILD_VITE_DOMAIN_PORT}
	docker build -t erecipe-frontend ./client/
	docker build -t erecipe-backend ./server/

#Runs django dev with dev env
ddev:
	DEBUG=${SERVER_DEBUG_TRUE}
	python ${DJANGO_MANAGE} makemigrations
	python ${DJANGO_MANAGE} migrate
	python ${DJANGO_MANAGE} runserver 81

#Runs vite dev server with localhost env
ndev:
	VITE_DOMAIN=${DEV_VITE_DOMAIN}
	npm --prefix ./client/ run dev

#Builds the container images user docker-compose with localhost in dev env
dev-compose:
	docker-compose up -d



