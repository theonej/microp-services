const getRacks = async()=>{
    return [
        {
            name: 'Rack 1',
            location: `J's Garage`,
            trays: [
                {
                    name: `Top Tray`,
                    plantTypes: ['Iceberg Lettuce']
                },
                {
                    name: `Middle Tray`,
                    plantTypes: ['Iceberg Lettuce']
                },
                {
                    name: `Bottom Tray`,
                    plantTypes: ['Red Romaine Lettuce']
                }
            ]
        },
        {
            name: 'Rack 2',
            location: `J's Garage`,
            trays: [{
                name: `Top Tray`,
                plantTypes: []
            },
            {
                name: `Middle Tray`,
                plantTypes: []
            },
            {
                name: `Bottom Tray`,
                plantTypes: []
            }]
        },
        {
            name: 'Rack 3',
            location: `J's Garage`,
            trays: [
                {
                    name: `Top Tray`,
                    plantTypes: ['Iceberg Lettuce']
                },
                {
                    name: `Middle Tray`,
                    plantTypes: ['Cilantro', 'Green Onion']
                },
                {
                    name: `Bottom Tray`,
                    plantTypes: ['Iceberg Lettuce']
                }
            ]
        },
        {
            name: 'Rack 4',
            location: `J's Garage`,
            trays: [
                {
                    name: `Top Tray`,
                    plantTypes: ['Iceberg Lettuce']
                },
                {
                    name: `Middle Tray`,
                    plantTypes: ['Thai Basil']
                },
                {
                    name: `Bottom Tray`,
                    plantTypes: []
                }
            ]
        }
    ];
};

module.exports = {
    getRacks
}