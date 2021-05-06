const fetch = require('node-fetch');

export default async (req, res) => {

    const uri = `${process.env.BASE_API_URL}/racks`;
    console.info(`email uri: ${uri}`);

    const result = await fetch (uri,{
        method: 'GET',
        headers: {'Content-type': 'application/json' }
    });

    const racks = await result.json();

    res.statusCode= 200
    res.json(racks)
    
};