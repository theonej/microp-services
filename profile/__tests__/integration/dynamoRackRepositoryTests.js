const repo = require('../../repository/dynamoRackRepository');
const uuid = require('uuid/v4');

it('creates a new rack in dynamo', async()=>{
    const rack = {
        name:'R1',
        rackId:'00000000-0000-0000-0000-000000000000-1',
        locationId:'00000000-0000-0000-0000-000000000000',
        trays:[
            {
                id:'00000000-0000-0000-0000-00000000000-1-1', 
                name:'top',
                plants:['arugula']
            },
            {
                id:'00000000-0000-0000-0000-00000000000-1-2',
                name:'middle',
                plants:['green iceless onion']
            },
            {
                id:'00000000-0000-0000-0000-00000000000-1-3',
                name:'bottom',
                plants:['red romaine']
            }
        ],
        readings:[
            {
                date:'05/21/2021', 
                ph:6.5,
                notes:'this is a test'
            }
        ]
    };

    let saveStatus = await repo.setRack(rack);
    expect(saveStatus.ConsumedCapacity).not.toBe(undefined);
    expect(saveStatus.ConsumedCapacity.CapacityUnits).toBe(1);
    
    const rack2 = {
        name:'R2',
        rackId:'00000000-0000-0000-0000-000000000000-2',
        locationId:'00000000-0000-0000-0000-000000000000',
        trays:[
            {
                id:'00000000-0000-0000-0000-00000000000-2-1', 
                name:'top',
                plants:[]
            },
            {
                id:'00000000-0000-0000-0000-00000000000-2-2',
                name:'bottom',
                plants:[]
            }
        ],
        readings:[
        ]
    };

    saveStatus = await repo.setRack(rack2);

    const rack3 = {
        name:'R3',
        rackId:'00000000-0000-0000-0000-000000000000-3',
        locationId:'00000000-0000-0000-0000-000000000000',
        trays:[
            {
                id:'00000000-0000-0000-0000-00000000000-3-1', 
                name:'top',
                plants:[]
            },
            {
                id:'00000000-0000-0000-0000-00000000000-3-2', 
                name:'middle',
                plants:['cilantro']
            },
            {
                id:'00000000-0000-0000-0000-00000000000-4-3',
                name:'bottom',
                plants:['cilantro']
            }
        ],
        readings:[
        ]
    };

    saveStatus = await repo.setRack(rack3);

    const rack4 = {
        name:'R4',
        rackId:'00000000-0000-0000-0000-000000000000-4',
        locationId:'00000000-0000-0000-0000-000000000000',
        trays:[
            {
                id:'00000000-0000-0000-0000-00000000000-4-1', 
                name:'top',
                plants:['sweet basil']
            },
            {
                id:'00000000-0000-0000-0000-00000000000-4-2',
                name:'middle',
                plants:['thai basil']
            },
            {
                id:'00000000-0000-0000-0000-00000000000-4-3',
                name:'bottom',
                plants:['micro greens']
            }
        ],
        readings:[
        ]
    };

    saveStatus = await repo.setRack(rack4);
}, 30000);

it('gets a list of racks by location id', async()=>{
    const locationId = '00000000-0000-0000-0000-000000000000';

    const racks = await repo.getRacks(locationId);
    console.info(JSON.stringify(racks));
    expect(racks.length).toBe(4);
});

it('gets a single rack by id', async()=>{
    const locationId = '00000000-0000-0000-0000-000000000000';
    const rackId = '00000000-0000-0000-0000-000000000000-1';

    const rack = await repo.getRack(locationId, rackId);

    console.info(rack);
    expect(rack.locationId).toBe('00000000-0000-0000-0000-000000000000');
    expect(rack.readings.length).toBe(1);
    expect(rack.trays.length).toBe(3);
});