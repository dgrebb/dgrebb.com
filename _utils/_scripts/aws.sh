#!/usr/bin/env bash
source $DGPATH/_scripts/functions.sh
env=$1
CLUSTER_NAME=$(pass dg/aws/${env}/cluster/name)
SERVICE_ARN="$(pass dg/aws/${env}/cluster/service)"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "AWS CLIing in ${env}"
while test "$2" != --; do
  case $2 in
  k | kill | stop)
    echo "stopping ECS for ${env}"
    echo
    aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_ARN --desired-count 0 >/dev/null
    if [ $? -eq 0 ]; then
      echo -e "${RED}STOPPED${NC}"
    else
      echo "Failed to stop the service."
    fi
    break
    ;;
  s | start)
    aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_ARN --desired-count 1 >/dev/null
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}STARTING...${NC}"
    else
      echo "Failed to start the service."
    fi
    break
    ;;
  esac
done
