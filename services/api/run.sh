#! /bin/bash
# Run the docker container
set -e
set -a; source .env; set +a

BUILD_ARGS=$(cat .env | awk -F= '{printf("--build-arg %s=%s ", $1, $2)}')
docker build $BUILD_ARGS -t lambda-docker-image .

PARAMS=$(cat .env | awk -F= '{printf("ParameterKey=%s,ParameterValue=%s ", $1, $2)}')

sam build --use-container
sam local start-api --debug --parameter-overrides $PARAMS
