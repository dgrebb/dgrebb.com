#!/usr/bin/env bash
source $DGPATH/_scripts/functions.sh
env=$1
CLUSTER_NAME=$(pass dg/aws/${env}/cluster/name)
SERVICE_ARN="$(pass dg/aws/${env}/cluster/service)"

echo "AWS CLIing in ${env}"
while test "$2" != --; do
  case $2 in
  k | kill | stop)
    echo "stopping ECS for ${env}"
    echo
    aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_ARN --desired-count 0
    break
    ;;
  s | start)
    aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_ARN --desired-count 1
    break
    ;;
  esac
done
