const repo = require('../../repository/dynamoProfileRepository');
const uuid = require('uuid/v4');

it('creates a new profile in dynamo', async()=>{
    const profile = {
        profileId:uuid(),
        lights:[
            {
                status:"off",
                startTime:"09:00:00",
                endTime:"23:00:00"
            }
        ]
    };

    const saveStatus = await repo.setProfile(profile);
    expect(saveStatus.ConsumedCapacity).not.toBe(undefined);
    expect(saveStatus.ConsumedCapacity.CapacityUnits).toBe(1);
}, 30000);