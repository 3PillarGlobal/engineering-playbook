# About
Lambda to start EMR and run a map reduce job

## Initialization & Set up
1) Upload files to s3: Upload your mapper, reducer, input and initialization script to S3
2) Update bucket name, files names and other variables in `emr_lambda.py`
3) Create a Lambda in AWS Console and upload `emr_lambda.py`
4) Create an s3 trigger in the created lambda and set the trigger path to input.csv
5) Upload input csv again to trigger path to trigger the Lambda

# EMR Attributes

## Instances
In this section, you can specify EMR cluster configurations
* InstanceRole - MASTER or CORE
* InstanceType - The size of the server
* InstanceCount - Number of respective instances to be launched
* Ec2KeyName - An existing key pair name without extension. This allows us to ssh into the cluster

## BootstrapActions
BootstrapActions is to setup environment for your mapper and reducer scripts.
Here you can optionally specify a script which will install software, library, packages which your files need.
This script will be executed on all the nodes of you cluster whether master or core

## Steps
This is where you define a step which executes after EMR is ready.
The current script has a step to run a hadoop-streaming command which is our map reduce job.
In the current script, there is only one step but you can add more if needed.
