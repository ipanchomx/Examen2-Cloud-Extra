const aws = require('aws-sdk');

const dynamoDB = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    try {
        let { curp } = event;
        let params = {
            TableName: process.env.table,
            Key: { "pk": `${curp}` }
        }
        
        const res = await dynamoDB.get(params).promise();

        return {
            statusCode: 200,
            info : res.Item
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
}