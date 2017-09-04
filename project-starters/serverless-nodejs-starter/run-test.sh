serverless offline start --stage test --exec "npm test"

#kill dynamoDB
PORT_NUMBER=8000
lsof -i tcp:${PORT_NUMBER} | awk 'NR!=1 {print $2}' | xargs kill 