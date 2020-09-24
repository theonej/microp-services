const repo = require('../../repository/dynamoProfileRepository');
const uuid = require('uuid/v4');

jest.mock('../../repository/dynamoProfileRepository');

it('create a new profile in dynamo', async()=>{
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

    console.info(repo.setProfile);

    const saveStatus = await repo.setProfile(profile);
    expect(saveStatus).toBe(true);
});

it('get an existing profile', async()=>{
    const profileId = uuid();

    const profile = await repo.getProfile(profileId);
    expect(profile).not.toBe(undefined);
    expect(profile.profileId).toBe(profileId);
});