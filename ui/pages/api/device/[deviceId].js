const fetch = require('node-fetch');

export default async (req, res) => {
   console.info(`raw request data: ${JSON.stringify(req.body)}`);
   const {email, deviceId} = req.query;
   const child = req.body;

   console.info(`child to service: ${child}`);

   console.info(`the motherfucking email: ${email}`);
   const uri = `${process.env.BASE_API_URL}/profile/${encodeURIComponent(email)}/devices/${deviceId}/status`;
    console.info(`email uri: ${uri}`);

    const request = {
       children:[child]
    };

    const result = await fetch(uri, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    });

    console.info(JSON.stringify(`headers: ${JSON.stringify(result.headers)}`));

    const devices = await result.json();
    console.info(devices);

    res.statusCode = 200
    res.json(request);

}
