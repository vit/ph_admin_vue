

##
##
##


-include .env_default
-include .env
export


help:	## Show this help
	@sed -ne '/@sed/!s/## //p' $(MAKEFILE_LIST)


config:

	# cp .env ./nginx/.env
	# cd nginx && make config && cd ..

	# cp .env ./php/.env
	# cd php && make config && cd ..

	# cd pg && make config && cd ..

run: up

stop: down


build:
	docker compose build



debug:	## Start docker compose with debug output
	docker compose up

up:	## Start docker compose detouched
	docker compose up -d

down:	## Stop docker compose
	docker compose down

ps:	## List docker compose containers
	docker compose ps

c:
	docker compose config



prod_build:
	docker compose -f compose-prod.yaml build 	# --no-cache

prod_run: prod_up
prod_stop: prod_down

prod_up:
	docker compose -f compose-prod.yaml up -d
prod_down:
	docker compose -f compose-prod.yaml down
prod_debug:
	docker compose -f compose-prod.yaml up



