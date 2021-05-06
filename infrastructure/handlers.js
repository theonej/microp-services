const getRacks = async ()=>{
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
                    plantTypes: [' Iceberg Lettuce']
                },

                {
                    name: `Bottom Tray`,
                    plantTypes: ['Red Romaine Lettuce']
                }
            ]
                    },
                
        {   name: 'Rack 2',
            location: `j's Garage`,
            trays: [
                {
                    name: `top Tray`,
                    plantTypes:[] 
                },

                {
                    name: `middle Tray`,
                    plantTypes:[]
                },

                {
                    name:`bottom Tray`,
                    plantTypes:[]
                }
            ]

                },
        {
            name:'Rack 3 ',
            location: `J's Garage`,
            trays: [
                {
                    name: `Top Rack`,
                    plantTypes: ['Iceberg Lettuce']
                },

                {
                    name:`Middle Rack`,
                    plantTypes: ['Cilantro', 'Green onion']
                },

                {
                    name:`Bottom Rack`,
                    plantTypes:['Iceberg Lettuce']
                }

            ]
        },
        {
            name: 'Rack 4',
            location: `J's Garage`,
            trays: [
                {
                    name: `Top Rack`,
                    plantTypes: ['Iceberg Lettuce']
                },

                {
                    name: `Middle Rack`,
                    plantTypes: ['Thai Basil']
                },

                {
                    name:`Bottom Rack`,
                    plantTypes:[]
                }

            ]

        }

     ];
};

module.exports= {
    getRacks
}