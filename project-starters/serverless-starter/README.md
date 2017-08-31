#Serverless Starter

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This project contains the following:

- API gateway rest endpoints
- Lambda functions
- DynamoDB integration
- Local offline dev env

##Prerequisites

- [Serverless Framework](https://serverless.com/)
- [Nodejs v6.10.3](https://nodejs.org/)
- [Setup your AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

##Installation

Install node 6.10.3

```
https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/
```

Install Serverless

```
npm install serverless
```

Install project and run offline:(https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb-and-offline)

```
npm install
serverless dynamodb install
```

##Run locally:

```
serverless offline start
```

##Testing with Curl

Use the following commands to test your newly created endpoints.

Note: You must replace the URLs in the examples below with those which are displayed after deploying. You can use the `serverless info` command to display the URLs if they are no longer on your screen.

Call get reports endpoint

```
curl -X GET http://localhost:3000/reports
```

Create new report

```
curl -X POST -H "Content-Type:application/json" http://localhost:3000/reports --data '{ "text": "Learn Serverless" }'
```

##Deploy in AWS

https://serverless.com/framework/docs/providers/aws/guide/credentials/
https://serverless.com/framework/docs/providers/aws/guide/deploying/

```
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>

Feature branch testing
serverless deploy --stage <username> 

Dev stage deployment
serverless deploy
```

##Removal

Once you're all done with the serverless-starter project, use the following command to remove the project from AWS completely.

```
serverless remove --stage <username> 
```