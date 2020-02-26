#!/bin/bash
echo "APP_NAME                ENV_NAME     BRANCH_NAME COMMIT_ID BUILD_NUMBER CLUSTER_NAME ECR_REPO_URL"
echo "$1       $2       $3          $4        $5           $6                  $7"
APP_NAME="${1}"
ENV_NAME="${2}"
BRANCH_NAME="${3}"
COMMIT_ID="${4}"
BUILD_NUMBER="${5}"
CLUSTER_NAME="${6}"
ECR_REPO_URL="${7}"
TASK_FAMILY="${APP_NAME}-${ENV_NAME}"
SERVICE_NAME="${APP_NAME}"
CAPS_SERVICE_NAME="$(echo $SERVICE_NAME | tr 'a-z' 'A-Z')"
NEW_DOCKER_IMAGE="${ECR_REPO_URL}/${1}:${3}_${4}_${5}"
#COUNT RUNNING REPLICA
TGN_ID=$(aws ecs describe-services --services $SERVICE_NAME --cluster $CLUSTER_NAME | jq .'services[].loadBalancers[].targetGroupArn' | cut -d '"' -f2)
TG_SYS=$(aws elbv2 describe-target-health --target-group-arn $TGN_ID |grep -w -c healthy)
if [ $TGN_ID == 'null' ]; then
ALB_ID=$(aws ecs describe-services --services $SERVICE_NAME --cluster $CLUSTER_NAME  | jq .'services[].loadBalancers[].loadBalancerName' | cut -d '"' -f2)
ALB_SYS=$(aws elb describe-instance-health --load-balancer-name $ALB_ID | grep -w -c InService)
echo $ALB_SYS
fi
#UPDATION TASK DEF
OLD_TASK_DEF=$(aws ecs describe-task-definition --task-definition $TASK_FAMILY --output json)
NEW_TASK_DEF=$(echo $OLD_TASK_DEF | jq --arg NDI $NEW_DOCKER_IMAGE '.taskDefinition.containerDefinitions[0].image=$NDI')
echo "*****************************TEST0"
FINAL_TASK=$(echo $NEW_TASK_DEF | jq '.taskDefinition|{requiresCompatibilities: .requiresCompatibilities, memory: .memory, networkMode: .networkMode, cpu: .cpu, family: .family, volumes: .volumes, containerDefinitions: .containerDefinitions}')
aws ecs register-task-definition --family $TASK_FAMILY --cli-input-json "$(echo $FINAL_TASK)"
aws ecs update-service --service $SERVICE_NAME --task-definition $TASK_FAMILY --cluster $CLUSTER_NAME
sleep 120
#GET LATEST TASK
echo "*****************************TEST1"
LATEST_TASK_DEF=$(aws ecs describe-services --services $SERVICE_NAME --cluster $CLUSTER_NAME | jq .'services[].taskDefinition' | cut -d '"' -f2)
aws ecs describe-task-definition --task-definition $LATEST_TASK_DEF | grep -i $NEW_DOCKER_IMAGE
if [ $? -eq 0 ]; then
    a=1
    echo "*****************************TEST3"
    echo $TG_SYS
    echo $ALB_SYS

   if [ $TGN_ID == 'null' ]; then
    until [ $a -ge $ALB_SYS ]
    do
   a=$(aws elb describe-instance-health --load-balancer-name $ALB_ID | grep -w -c InService)
   echo $a
   sleep 30
   done
  else
    until [ $a -ge $TG_SYS ]
    do
    a=$(aws elbv2 describe-target-health --target-group-arn $TGN_ID |grep -w -c healthy)
    echo $a
    sleep 30
   done
   fi
    echo "*****************************TEST4"
    echo -e '{"text":"*'$CAPS_SERVICE_NAME'* has updated with docker image tag: *'$3_$4_$5'* on MSA *'$CLUSTER_NAME'* cluster at '`date +%d-%B-%Y_%H.%M_%Z`.'"}' | curl -X POST -H 'Content-type: application/json' --data-binary @- https://franconnect.ryver.com/application/webhook/DKMc5TUn3ACLpL7
    echo -e '{"text":"*'$CAPS_SERVICE_NAME'* has updated with docker image tag: *'$3_$4_$5'* on MSA *'$CLUSTER_NAME'* cluster at '`date +%d-%B-%Y_%H.%M_%Z`.'"}' | curl -X POST -H 'Content-type: application/json' --data-binary @- https://outlook.office.com/webhook/81ae8c9e-117c-4623-81c5-8d6c65fe548b@864c302d-1eff-4f58-8e04-318cf78a18ac/IncomingWebhook/520e716a2cab45be9fc10201c40bb550/aefc0d3f-cbaa-41d2-86a0-1fa2a14227f4
else
    echo "FAIL************************************************************************"
fi


