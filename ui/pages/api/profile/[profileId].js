const fetch = require('node-fetch');

export default (req, res) => {

  const {profileId} = req.params;
  console.info(profileId);
  
  res.statusCode = 200
  res.json({ profile })
}
