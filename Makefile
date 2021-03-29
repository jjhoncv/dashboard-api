NETWORK_NAME		= dash-network



define create_network
	$(eval ID_NETWORK := $(shell docker network ls | grep $(NETWORK_NAME) | awk '{print $$1}'))
	@if [ ! $(ID_NETWORK) ]; then docker network create $(NETWORK_NAME); fi
endef

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
	$(call create_network)
	@docker run \
		-it \
		-d \
		--net=${NETWORK_NAME} \
		-v $(PWD):/app \
		--name dash-mysql \
		-u 1000:1000 \
		-v ${PWD}/mysql/data:/var/lib/mysql \
		-p 3306:3306 \
		--env-file ./app/.env.local \
		mysql:5.6.40
	# @docker container logs dash-mysql -f

start:
	$(call create_network)
	$(call network_ip)
	@docker run \
		-d \
		-it \
		--rm \
		--name dash-api \
		--env-file ./app/.env.local \
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
	@docker stop dash-api

env:
	aws s3 cp app/.env s3://config.wdashboard.tk/dashboard.api/
