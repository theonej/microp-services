const aws = require('aws-sdk');
const uuid = require('uuid/v4');
const util = require('util');

const TABLE_NAME = 'profiles';
const REGION = 'us-east-1';

exports.setProfile = async (profile) => {
    const dynamo = initDynamo();

    profile.profileId = profile.profileId || uuid();

    const request = {
        TableName: TABLE_NAME,
        Item: {
            profileId: { S: profile.profileId },
            data: { S: JSON.stringify(profile) }
        },
        ReturnConsumedCapacity: "TOTAL"
    };

    const putItem = util.promisify(dynamo.putItem).bind(dynamo);

    const result = await putItem(request);

    console.info(`put item result: ${JSON.stringify(result)}`);

    return result;
};

exports.getProfile = async (profileId) => {
    const dynamo = initDynamo();

    const request = {
        TableName: TABLE_NAME,
        Key: {
            "profileId": { S: profileId }
        }
    }

    const getItem = util.promisify(dynamo.getItem.bind(dynamo));
    const result = await getItem(request);

    return result;
};

exports.getProfileByEmail = async (email) => {
    const dynamo = initDynamo();


    try {
        const request = {
            TableName: TABLE_NAME,
            FilterExpression: "email=:email",
            ExpressionAttributeValues: {
                ":email": {
                    S: email
                }
            }
        };

        console.info(`request for email profile: ${JSON.stringify(request)}`);
        const getItem = util.promisify(dynamo.scan.bind(dynamo));
        const result = await getItem(request);

        console.info(`result for email profile: ${JSON.stringify(result)}`);

        return {
            email:result.Items[0].email.S,
            password:result.Items[0].password.S
        };
    } catch (e) {
        console.error(e);
    }
};

const initDynamo = () => {
    const dynamo = new aws.DynamoDB({ region: REGION });

    return dynamo;
};