const getLocations = async(ctx)=>{
    var host = ctx.req.headers.host === 'backend' ? '0.0.0.0' : ctx.req.headers.host;

    var uri = `http://${host}/api/locations`;
    console.info(uri);

    const result = await fetch(uri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const locations = await result.json();

    return locations;
};

export{
    getLocations
}