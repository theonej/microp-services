export default async(req, res)=>{

    const uri = `${process.env.BASE_API_URL}/locations`;
    console.info(`locations uri: ${uri}`);

    const result = await fetch(uri, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const locations = await result.json();

    res.statusCode = 200
    res.json(locations);
};