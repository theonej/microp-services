const profileRepo = require('./repository/dynamoProfileRepository');

exports.getProfile = async (profileId)=>{
    return profileRepo.getProfile(profileId);
};