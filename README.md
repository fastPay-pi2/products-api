# Products-api

Api de produtos do grupo FastPay da disciplina de Projeto Integrador do 2º segundo semestre de 2019.

## Executando a API localmente
#### Pré-requisitos
##### Instale o Docker
Seguindo as instruções dos links a seguir, instale o docker conforme seu sistema operacional.

* [docker](https://docs.docker.com/install/)
* [docker-compose](https://docs.docker.com/compose/install/#install-compose) (já incluído na instalação do Docker Desktop para MacOS)

## Comandos Make

Para maior facilidade foram feitos comandos em um `Makefile`, isso foi feito para o banco de dados não ser populado todas as vezes que os serviços fossem levantados. Os comandos são:

- Comando utilizado para subir a API junto com o banco de dados
```sh
make up
```

- Comando utilizado para deletar todas as tabelas existentes no banco de dados
```sh
make drop-db
```

- Comando utilizado para criar todas as tabelas necessárias para a API no banco de dados
```sh
make create-db
```

- Comando utilizado para popular o banco de dados com os dados obtidos através do serviço de `Web Scrapping`
```sh
make popula-db
```
