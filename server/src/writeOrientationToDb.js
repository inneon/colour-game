const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  if (!canProcess(event, callback)) return;
  const requestBody = JSON.parse(event.body);
  return ddb
    .put({
      TableName: process.env.TABLENAME,
      Item: {
        id: uuidv4(),
        alpha: requestBody.alpha,
        beta: requestBody.beta,
        gamma: requestBody.gamma,
        timestamp: requestBody.timestamp
      }
    })
    .promise()
    .then(() => {
      callback(null, {
        statusCode: 201,
        body: JSON.stringify({
          message: 'success'
        }),
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    })
    .catch(err => {
      console.error(err);
      errorResponse(err.message, context.awsRequestId, callback);
    });
};

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId
    }),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function canProcess(event, callback) {
  if (event.httpMethod !== 'POST') {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({}),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    return false;
  }
  return true;
}
