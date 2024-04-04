.PHONY: init clean login-ecr build deploy run down mig test-watch test mig-gen mig-run mig-revert

STAGE ?= dev
SERVICE_PORT ?= 3000
DB_HOST ?= localhost
DB_PORT ?= 5439
DB_USER ?= postgres
DB_NAME ?= hhplusClean
DB_PW ?= local_postgres
DB_URL ?= postgres://$(DB_USER):$(DB_PW)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?schema=public

init:
	npm install --force
	docker-compose rm -f backend
	@PORT=$(SERVICE_PORT) \
	DB_USER=$(DB_USER) \
	DB_PW=$(DB_PW) \
	DB_NAME=$(DB_NAME) \
	STAGE=$(STAGE) \
	SCHEDULER=$(SCHEDULER) \
		docker-compose build backend

clean:
	@rm -rf ./dist

run-db:
	docker-compose up -d postgres

run: clean run-db
	@PORT=$(SERVICE_PORT) \
	DB_USER=$(DB_USER) \
	DB_PW=$(DB_PW) \
	DB_NAME=$(DB_NAME) \
	STAGE=$(STAGE) \
	SCHEDULER=$(SCHEDULER) \
		docker-compose up backend

down: clean
	@docker-compose down

test-watch:
	@npm run test:watch

test:
	@npm run test

test-watch:
	@npm run test:watch

test-cov:
	@npm run test:cov

mig-gen: clean run-db
	@npm run build
	@DB_HOST=$(DB_HOST) \
	DB_PORT=$(DB_PORT) \
	DB_USER=$(DB_USER) \
	DB_PW=$(DB_PW) \
	DB_NAME=$(DB_NAME) \
	IS_LOCAL_ENV=1 \
		npm run migration:generate src/migrations/$(mname)

mig-run: clean run-db
	@npm run build
	@DB_HOST=$(DB_HOST) \
	DB_PORT=$(DB_PORT) \
	DB_USER=$(DB_USER) \
	DB_PW=$(DB_PW) \
	DB_NAME=$(DB_NAME) \
	IS_LOCAL_ENV=1 \
		npm run migration:run

mig-revert: clean run-db
	@npm run build
	@DB_HOST=$(DB_HOST) \
	DB_PORT=$(DB_PORT) \
	DB_USER=$(DB_USER) \
	DB_PW=$(DB_PW) \
	DB_NAME=$(DB_NAME) \
	IS_LOCAL_ENV=1 \
		npm run migration:revert
