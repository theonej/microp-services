const repo = require('../../repository/dynamoLocationRepository');
const uuid = require('uuid/v4');

it('creates a new location in dynamo', async()=>{
    const location = {
        locationId:'00000000-0000-0000-0000-000000000000',
        name:'MiCrop Prime',
        numberOfRacks:5
    };

    const saveStatus = await repo.setLocation(location);
    expect(saveStatus.ConsumedCapacity).not.toBe(undefined);
    expect(saveStatus.ConsumedCapacity.CapacityUnits).toBe(1);
}, 30000);

it('gets a list of locations', async()=>{
    const locations = await repo.getLocations();
    console.info(JSON.stringify(locations));
    expect(locations.length).toBe(1);
});
