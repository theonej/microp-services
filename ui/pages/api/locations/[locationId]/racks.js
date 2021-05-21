const fetch = require('node-fetch');

export default async (req, res) => {

    console.info(req.query);

    const {locationId} = req.query;
    
    const uri = `${process.env.BASE_API_URL}/locations/${locationId}/racks`;
    console.info(`rack uri: ${uri}`);

    const result = await fetch(uri, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const racks = await result.json();

    res.statusCode = 200
    res.json(racks);
};