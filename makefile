
DJANGO_MANAGE = server/manage.py
DEV_VITE_DOMAIN = http://127.0.0.1:88
SERVER_DEBUG = 1
SERVER_BUILD_DOMAIN = https://example.com


#Runs django dev with dev env
ddev:
	set DEBUG = ${SERVER_DEBUG}
	python ${DJANGO_MANAGE} makemigrations
	python ${DJANGO_MANAGE} migrate
	python ${DJANGO_MANAGE} runserver 88

#Runs vite dev server with localhost env
ndev:
	set VITE_DOMAIN = ${DEV_VITE_DOMAIN}
	npm --prefix ./client/ run dev

#Runs docker build to make the client and the server container images
build:
	set VITE_DOMAIN = ${SERVER_BUILD_DOMAIN}
	docker build -t erecipe-frontend ./client/
	docker build -t erecipe-backend ./server/

#Builds the container images user docker-compose with localhost 
dev-compose:
	set DEBUG = ${SERVER_DEBUG}
	set VITE_DOMAIN = ${DEV_VITE_DOMAIN}
	docker-compose up -d

production-compose:
	set VITE_DOMAIN = ${DEV_VITE_DOMAIN}
	docker-compose up -d



