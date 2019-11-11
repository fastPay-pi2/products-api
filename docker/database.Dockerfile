FROM postgres:alpine

COPY ./docker/*.sql /scripts/

ADD ./docker/create_db.sql /docker-entrypoint-initdb.d/
