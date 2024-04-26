.PHONY: init clean login-ecr build deploy run down mig test-watch test mig-gen mig-run mig-revert

STAGE ?= prod
SERVICE_PORT ?= 3000
DB_HOST ?= localhost
DB_PORT ?= 5439
DB_USER ?= postgres
DB_NAME ?= hhplusServer
DB_PW ?= local_postgres
DB_URL ?= postgres://$(DB_USER):$(DB_PW)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?schema=public
REDIS_HOST ?= redis
REDIS_PORT ?= 6386
AWS_PROFILE_OPT ?= --profile sik --region ap-northeast-2

ECR_REGISTRY ?= $(shell aws $(AWS_PROFILE_OPT) ssm get-parameter --name \
	"/hhplus/$(STAGE)/ecr/registry" | jq '.Parameter | .Value')
ECR_REPOSITORY ?= $(shell aws $(AWS_PROFILE_OPT) ssm get-parameter --name \
	"/hhplus/$(STAGE)/ecr/repository" | jq '.Parameter | .Value')
ECS_CLUSTER_NAME ?= $(shell aws $(AWS_PROFILE_OPT) ssm get-parameter --name \
	"/hhplus/$(STAGE)/ecs/cluster" | jq '.Parameter | .Value')
ECS_SERVICE_NAME ?= $(shell aws $(AWS_PROFILE_OPT) ssm get-parameter --name \
	"/hhplus/$(STAGE)/ecs/service" | jq '.Parameter | .Value')


AWS_USER_ID ?= $(shell aws $(AWS_PROFILE_OPT) sts get-caller-identity --query Account --output text)

login-ecr:
	@aws $(AWS_PROFILE_OPT) ecr get-login-password | docker login --username AWS --password-stdin "$(AWS_USER_ID).dkr.ecr.ap-northeast-2.amazonaws.com"

build: login-ecr clean
	npm run build
	docker buildx build --platform linux/amd64 -t $(ECR_REGISTRY)/$(ECR_REPOSITORY):$(STAGE) .
	docker push $(ECR_REGISTRY)/$(ECR_REPOSITORY):$(STAGE)

deploy:
	@aws $(AWS_PROFILE_OPT) ecs update-service --cluster $(ECS_CLUSTER_NAME) --service $(ECS_SERVICE_NAME) --force-new-deployment
ifeq ($(STAGE), prod)
	@aws $(AWS_PROFILE_OPT) ecs update-service --cluster $(ECS_CLUSTER_NAME) --service $(ECS_SCHEDULER_NAME) --force-new-deployment
endif

init:
	npm install --force
	docker-compose rm -f backend
	@PORT=$(SERVICE_PORT) \
	DB_USER=$(DB_USER) \
	DB_PW=$(DB_PW) \
	DB_NAME=$(DB_NAME) \
	STAGE=$(STAGE) \
		docker-compose build backend

clean:
	@rm -rf ./dist

run-db:
	docker-compose up -d postgres redis

run: clean run-db
	@PORT=$(SERVICE_PORT) \
	DB_USER=$(DB_USER) \
	DB_PW=$(DB_PW) \
	DB_NAME=$(DB_NAME) \
	STAGE=$(STAGE) \
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
