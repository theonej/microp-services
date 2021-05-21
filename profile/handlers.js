const profileRepo = require('./repository/dynamoProfileRepository');
const rackRepo = require('./repository/dynamoRackRepository');
const locationRepo = require('./repository/dynamoLocationRepository');
const tpLink = require('./providers/tpLinkProvider');

exports.getProfile = async (profileId) => {

    return profileRepo.getProfile(profileId);
};

exports.getDevices = async (email) => {
    const profile = await profileRepo.getProfileByEmail(email);

    const user = {
        tpLinkUserName: profile.deviceUserName,
        tpLinkPassword: profile.password
    };

    const loginInfo = await tpLink.login(user);
    console.info(`\n\nloginInfo: ${loginInfo}`);

    const devices = await tpLink.getDevices(loginInfo.token);

    const smartSwitch = devices.find(device => {
        return device.deviceName = 'Wi-Fi Smart Power Strip';
    });

    const deviceDetails = await tpLink.getDeviceDetails(smartSwitch.deviceId, loginInfo.token);

    return [deviceDetails];
};

exports.setChildStatuses = async (email, deviceId, children) => {
    const profile = await profileRepo.getProfileByEmail(email);

    const user = {
        tpLinkUserName: profile.deviceUserName,
        tpLinkPassword: profile.password
    };

    const loginInfo = await tpLink.login(user);
    console.info(`\n\nloginInfo: ${loginInfo}`);

    const status = await tpLink.setChildDeviceStatuses(deviceId, children, loginInfo.token);
    console.info(status);

    return status;
};

exports.getLocations = async () => {
    const locations = await locationRepo.getLocations();

    return locations;
};

exports.getRacks = async (locationId) => {
    const racks = await rackRepo.getRacks(locationId);

    return racks;
};

exports.getRack = async (locationId, rackId) => {
    const rack = await rackRepo.getRack(locationId, rackId);

    return rack;
};

exports.saveRack = async (rack) => {
    return await rackRepo.setRack(rack);
};