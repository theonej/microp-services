const getRacks = async (ctx) => {
  const { locationId } = ctx.query;

  var host = ctx.req.headers.host === 'backend' ? '0.0.0.0' : ctx.req.headers.host;

  var uri = `http://${host}/api/locations/${locationId}/racks`;
  console.info(uri);

  const result = await fetch(uri, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  const racks = await result.json();

  return racks;
};

const getRack = async (ctx) => {
  const { locationId, rackId } = ctx.query;

  var host = ctx.req.headers.host === 'backend' ? '0.0.0.0' : ctx.req.headers.host;

  var uri = `http://${host}/api/locations/${locationId}/racks/${rackId}`;
  console.info(uri);

  const result = await fetch(uri, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  const racks = await result.json();

  return racks;
};

const saveRack = async (rack) => {
  const { locationId, rackId } = rack;

  var uri = `/api/locations/${locationId}/racks/${rackId}`;
  console.info(uri);

  const result = await fetch(uri, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rack)
  });

  const racks = await result.json();

  return racks;
};

export {
  getRacks,
  getRack,
  saveRack
}