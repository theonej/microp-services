const aws = require('aws-sdk');
const uuid = require('uuid/v4');
const util = require('util');

const TABLE_NAME = 'racks';
const REGION = 'us-east-1';

exports.setRack = async (rack) => {
    const dynamo = initDynamo();

    rack.rackId = rack.rackId || uuid();

    const request = {
        TableName: TABLE_NAME,
        Item: {
            rackId: { S: rack.rackId },
            locationId: { S: rack.locationId },
            data: { S: JSON.stringify(rack) }
        },
        ReturnConsumedCapacity: "TOTAL"
    };

    console.info(JSON.stringify(request));
    
    const putItem = util.promisify(dynamo.putItem).bind(dynamo);

    const result = await putItem(request);

    return result;
};

exports.getRack = async (locationId, rackId) => {
    const dynamo = initDynamo();

    const request = {
        TableName: TABLE_NAME,
        Key: {
            "locationId": { S: locationId },
            "rackId": { S: rackId }
        }
    }

    const getItem = util.promisify(dynamo.getItem.bind(dynamo));
    const result = await getItem(request);

    return JSON.parse(result.Item.data.S);
};

exports.getRacks = async (locationId) => {
    const dynamo = initDynamo();


    try {
        const request = {
            TableName: TABLE_NAME,
            FilterExpression: "locationId=:locationId",
            ExpressionAttributeValues: {
                ":locationId": {
                    S: locationId
                }
            }
        };

        const getItem = util.promisify(dynamo.scan.bind(dynamo));
        const result = await getItem(request);

        return result.Items.map(item=>{
            return JSON.parse(item.data.S);
        });
    } catch (e) {
        console.error(e);
    }
};

const initDynamo = () => {
    const dynamo = new aws.DynamoDB({ region: REGION });

    return dynamo;
};