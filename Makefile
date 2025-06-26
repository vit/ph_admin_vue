

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
	# docker build \
	# 	-t my_clojure \
	# 	-f clojure/Dockerfile_Clojure \
	# 	clojure/

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


# clojure:
# 	docker run --rm -it \
# 		-v ./app/lib:/usr/src/app \
# 		--expose 8080 -p 8080:8080 \
# 		my_clojure


# backup:
# 	docker exec ph_system_mongo_$(ENV_NAME) bash -c 'mongodump --username=root --password=example --archive | gzip -c | cat' > ./data/export/mongo_dump_$(ENV_NAME)_`date +%Y-%m-%d"_"%H_%M_%S`.gz

	# cd pg && make backup && cd ..
	# cd php && make backup && cd ..


# backup_export:
# 	docker run -it \
# 		-v ph_system_$(ENV_NAME)_backup:/data/backup \
# 		-v $(DATA_EXPORT_DIR):/data/export \
# 		alpine \
# 		/bin/sh -c 'if [ `ls /data/backup/* | wc -l` -gt 0 ]; then mv -n /data/backup/* /data/export/; fi'



# restore: ## cat archive.gz | make restore
# 	docker exec -i ph_system_mongo_$(ENV_NAME) bash -c 'gunzip -c | mongorestore --username=root --password=example --archive'


# import_papers:
# 	docker cp $(DATA_IMPORT_DIR)/papers/. ph_system_php_$(ENV_NAME):/data/papers/



