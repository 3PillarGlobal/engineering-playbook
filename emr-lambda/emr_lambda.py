"""Lambda to launch EMR and start map reduce for an input"""
from types import SimpleNamespace

import boto3
import logging

DEBUG = False

logger = logging.getLogger()
logger.setLevel(logging.DEBUG if DEBUG else logging.INFO)

BUCKET = 'test-bucket'

LOGS_PATH = 's3://{}/logs/emr_lambda/'.format(BUCKET)

INITIALIZATION_SCRIPT_PATH = 's3://{}/initialize.sh'.format(BUCKET)

MAPPER_FILE = 'mapper.py'
MAPPER_PATH = 's3://{}/code/{}'.format(BUCKET, MAPPER_FILE)

REDUCER_FILE = 'reducer.py'
REDUCER_PATH = 's3://{}/code/{}'.format(BUCKET, REDUCER_FILE)

INPUT_FILE = 'input.csv'
INPUT_PATH = 'data/{}'.format(INPUT_FILE)

OUTPUT_PATH = 'output'

KEY_PAIR = 'key-pair'  # An existing key pair name without extension

REGION_NAME = 'us-east-1'


def get_emr_client():
    """
    Method to create boto3 EMR client object
    :return: boto3 EMR client object
    """
    try:
        return boto3.client('emr', region_name=REGION_NAME)
    except Exception as e:
        logger.info(str(e))
        exit(0)


def get_s3_client():
    """
    Method to create connection to s3
    :return: boto3 client object to access s3
    """
    try:
        return boto3.client('s3', region_name=REGION_NAME)
    except Exception as e:
        logger.info('Unable to connect to S3. ' + str(e))


def get_latest_csv_file_path(bucket, prefix):
    """
    Method to get last modified key of a prefix in a bucket
    directory
    :return: SimpleNamespace object with success flag and error message if any
    """
    logger.info(bucket + prefix)
    try:
        objects = get_s3_client().list_objects(
            Bucket=bucket,
            Prefix=prefix
        )['Contents']
    except Exception as e:
        logging.info('Unable to get latest file. ' + str(e))
        return SimpleNamespace(success=False, error=str(e))

    sorted_keys = [
        obj['Key'] for obj in sorted(objects, key=lambda obj: int(
            obj['LastModified'].strftime('%s')
        ), reverse=True)
    ]

    file_path = sorted_keys[0]

    return SimpleNamespace(success=True, key=file_path)


def lambda_handler(event, context):
    """

    :param event:
    :param context:
    :return:
    """

    # Get the path of latest file to put into EMR
    global INPUT_PATH
    latest_csv = get_latest_csv_file_path(BUCKET, INPUT_PATH)

    if latest_csv.success:
        INPUT_PATH = 's3://{}/{}'.format(BUCKET, latest_csv.key)
    else:
        return 0

    try:

        get_emr_client().run_job_flow(
            Name='EMR Name',
            LogUri=LOGS_PATH,
            ReleaseLabel='emr-5.15.0',  # EMR version

            # Configuration for EMR cluster
            Instances={
                'InstanceGroups': [
                    {'Name': 'master',
                     'InstanceRole': 'MASTER',
                     'InstanceType': 'm3.xlarge',
                     'InstanceCount': 1,
                     },
                    {'Name': 'core',
                     'InstanceRole': 'CORE',
                     'InstanceType': 'm3.xlarge',
                     'InstanceCount': 2,
                     },

                ],
                'Ec2KeyName': KEY_PAIR  # This allows us to ssh with the keypair

                # Other available configurations for the instances

                # 'KeepJobFlowAliveWhenNoSteps': True,
                # 'EmrManagedSlaveSecurityGroup': 'sg-1234',
                # 'EmrManagedMasterSecurityGroup': 'sg-1234',
                # 'Ec2SubnetId': 'subnet-1q234',
            },

            # To install requirements in all nodes of EMR while it is setting up
            BootstrapActions=[
                {
                    'Name': 'Install packages',
                    'ScriptBootstrapAction': {
                        'Path': INITIALIZATION_SCRIPT_PATH
                    }
                }
            ],
            # Hadoop streaming command to start EMR
            Steps=[
                {'Name': 'Name of the Step',
                 'ActionOnFailure': 'TERMINATE_CLUSTER',
                 'HadoopJarStep': {
                     'Jar': 'command-runner.jar',
                     'Args': [
                         'hadoop-streaming',
                         '-files',
                         '{},{},{}'.format(MAPPER_PATH, REDUCER_PATH, INPUT_PATH),
                         '-mapper', MAPPER_FILE,
                         '-input', INPUT_PATH,
                         '-output', OUTPUT_PATH,
                         '-reducer', REDUCER_FILE
                     ]}
                 }
            ],
            VisibleToAllUsers=True,
            JobFlowRole='EMR_EC2_DefaultRole',
            ServiceRole='EMR_DefaultRole',
        )
        return 1
    except Exception as e:
        logger.error(str(e))
        return 0, str(e)
