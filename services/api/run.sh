#! /bin/bash
# Run the docker container
set -e
set -a; source .env; set +a

# Only include lines that match the format 'KEY=VALUE'
BUILD_ARGS=$(grep '^[A-Za-z_][A-Za-z0-9_]*=.*' .env | awk -F= '{printf("--build-arg %s=%s ", $1, $2)}')
docker build $BUILD_ARGS -t lambda-docker-image .

# The same filtering can be applied for PARAMS if needed
PARAMS=$(grep '^[A-Za-z_][A-Za-z0-9_]*=.*' .env | awk -F= '{printf("ParameterKey=%s,ParameterValue=%s ", $1, $2)}')

sam build --use-container
sam local start-api --debug --parameter-overrides "$PARAMS"
