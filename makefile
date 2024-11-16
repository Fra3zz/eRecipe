
DJANGO_MANAGE = server/manage.py
VITE_DOMAIN = http://127.0.0.1:88
SERVER_DEBUG = 1
BUILD_DOMAIN = https://example.com

ddev:
	set DEBUG = ${SERVER_DEBUG}
	python ${DJANGO_MANAGE} makemigrations
	python ${DJANGO_MANAGE} migrate
	python ${DJANGO_MANAGE} runserver 88

ndev:
	set VITE_DOMAIN = ${VITE_DOMAIN}
	npm --prefix ./client/ run dev

build:
	set VITE_DOMAIN = ${BUILD_DOMAIN}
	docker build -t erecipe-frontend ./client/
	docker build -t erecipe-backend ./server/
