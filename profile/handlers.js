const profileRepo = require('./repository/dynamoProfileRepository');
const tpLink = require('./providers/tpLinkProvider');

exports.getProfile = async (profileId)=>{
    return profileRepo.getProfile(profileId);
};

exports.getDevices = async(email)=>{
    const profile = await profileRepo.getProfileByEmail(email);
    const user = {
        tpLinkUserName:profile.email,
        tpLinkPassword:profile.password
    };

    const loginInfo = await tpLink.login(user);

    const devices = await tpLink.getDevices(loginInfo.token);

    const smartSwitch = devices.find(device=>{
        return device.deviceName = 'Wi-Fi Smart Power Strip';
    });

    const deviceDetails = await tpLink.getDeviceDetails(smartSwitch.deviceId, loginInfo.token);
    
    return deviceDetails;
};

exports.setChildStatuses = async(deviceId, children, token)=>{
    const status = await tpLink.setChildDeviceStatuses(deviceId, children, token);
    console.info(status);

    return status;
};