#!/bin/bash

# Installation of pip3 to install boto3 for python3

sudo yum install -y python34-setuptools
sudo easy_install-3.4 pip
sudo env 'PATH=$PATH:/usr/local/bin' pip3 install boto3

