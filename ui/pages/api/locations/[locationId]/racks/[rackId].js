const fetch = require('node-fetch');

export default async (req, res)=>{
    const methods = {
        'GET':get,
        'PUT':put
    };

    console.info(req);

    const handler = methods[req.method];

    return handler(req, res);
};

const get = async (req, res) => {

    const { locationId, rackId } = req.query;

    const uri = `${process.env.BASE_API_URL}/locations/${locationId}/racks/${rackId}`;
    console.info(`rack uri: ${uri}`);

    const result = await fetch(uri, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const racks = await result.json();

    res.statusCode = 200
    res.json(racks)
};

const put = async (req, res) => {
    const { locationId, rackId } = req.query;
    const rack = req.body;

    const uri = `${process.env.BASE_API_URL}/locations/${locationId}/racks/${rackId}`;
    console.info(`rack uri: ${uri}`);

    const result = await fetch(uri, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rack)
    });

    const racks = await result.json();

    res.statusCode = 200
    res.json(racks)
};