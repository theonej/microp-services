const aws = require('aws-sdk');
const uuid = require('uuid/v4');
const util = require('util');

const TABLE_NAME = 'locations';
const REGION = 'us-east-1';

exports.setLocation = async (location) => {
    const dynamo = initDynamo();

    location.locationId = location.locationId || uuid();

    const request = {
        TableName: TABLE_NAME,
        Item: {
            locationId: { S: location.locationId },
            data: { S: JSON.stringify(location) }
        },
        ReturnConsumedCapacity: "TOTAL"
    };

    const putItem = util.promisify(dynamo.putItem).bind(dynamo);

    const result = await putItem(request);

    return result;
};

exports.getLocations = async () => {
    const dynamo = initDynamo();


    try {
        const request = {
            TableName: TABLE_NAME
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