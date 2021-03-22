NETWORK_NAME		= dash-network

MYSQL_USER			= root		
MYSQL_ROOT_PASSWORD	= my-secret-pw
MYSQL_DATABASE		= dashboard

define network_ip
	$(eval MYSQL_HOST := $(shell docker inspect -f '{{range .IPAM.Config}}{{.Gateway}}{{end}}' ${NETWORK_NAME} ))
endef

install:
	@docker run \
		-it \
		--rm \
		-v $(PWD)/app:/app \
		-w /app \
		node:11-slim \
		npm install

db:
	@docker run \
		-it \
		-d \
		--net=${NETWORK_NAME} \
		--name dash-mysql \
		-u 1000:1000 \
		-v ${PWD}/mysql/data:/var/lib/mysql \
		-p 3306:3306 \
		-e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} \
		mysql:5.6.40
	@docker container logs dash-mysql -f

start:
	$(call network_ip)
	@docker run \
		-d \
		-it \
		--rm \
		--name dash-api \
		-e MYSQL_HOST=${MYSQL_HOST} \
		-e MYSQL_USER=${MYSQL_USER} \
		-e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} \
		-e MYSQL_DATABASE=${MYSQL_DATABASE} \
		-u 1000:1000 \
		-p 7000:7000 \
		--net=${NETWORK_NAME} \
		-v $(PWD)/app:/app \
		-w /app \
		node:11-slim \
		npm start
	@make logs

logs:
	@docker container logs dash-api -f --tail=10

stop:
	@docker rm -f dash-api

deploy:
	