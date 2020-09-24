const aws = require('aws-sdk');
const uuid = require('uuid/v4');
const util = require('util');

const TABLE_NAME = 'profiles';
const REGION = 'us-east-1';

exports.setProfile = async(profile)=>{
    const dynamo = initDynamo();

    profile.profileId = profile.profileId = uuid();

    const request = {
        TableName:TABLE_NAME,
        Item:{
            profileId:{S:profile.profileId},
            data:{S:JSON.stringify(profile)}
        },
        ReturnConsumedCapacity:"TOTAL"
    };

    const putItem = util.promisify(dynamo.putItem).bind(dynamo);

    const result = await putItem(request);

    console.info(`put item result: ${JSON.stringify(result)}`);

    return result;
};

exports.getProfile = async(profileId)=>{
    const dynamo = initDynamo();

    const request = {
        TableName:TABLE_NAME,
        Key:{
            "profileId": {S:profileId}
        }
    }

    const getItem = util.promisify(dynamo.getItem.bind(dynamo));
    const result = await getItem(request);

    return result;
};

const initDynamo = ()=>{
    const dynamo = new aws.DynamoDB({region:REGION});

    return dynamo;
};