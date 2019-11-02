up:
	sudo docker-compose up products_api

drop-db:
	sudo docker-compose up -d products_db
	sudo docker exec products_db  psql -U user -W db -a -f /scripts/drop_db.sql

create-db:
	sudo docker-compose up -d products_db
	sudo docker exec products_db  psql -U user -W db -a -f /scripts/create_db.sql

popula-db:
	sudo docker-compose up -d database-population
	sudo docker-compose run --rm database-population python items_script.py