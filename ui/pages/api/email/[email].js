const fetch = require('node-fetch');

export default async (req, res) => {
    const { email } = req.query;
    console.info(email);

    const uri = `${process.env.BASE_API_URL}/profile/${encodeURIComponent(email)}/devices`;
    console.info(`email uri: ${uri}`);

    const result = await fetch(uri, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    console.info(JSON.stringify(`headers: ${JSON.stringify(result.headers)}`));

    const devices = await result.json();
    console.info(devices);

    res.statusCode = 200
    res.json(devices)
}
