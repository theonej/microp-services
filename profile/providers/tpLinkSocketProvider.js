const uuid = require("uuid");
const {login} = require("tplink-cloud-api");

exports.getSockets =  async(profileId)=>{

    return getAllSockets(profileId);
};

exports.toggleDevice = async(deviceId)=>{
    const instance = await getInstance();

    const plug = await instance.getHS100(deviceId);
    plug.toggle();
};

exports.turnPlugOff = async(deviceId)=>{
    const instance = await getInstance();

    const plug = await instance.getHS100(deviceId);
    plug.powerOff();
};

exports.turnPlugOn = async(deviceId)=>{
    const instance = await getInstance();

    const plug = await instance.getHS100(deviceId);
    plug.powerOn();
};

const getAllSockets = async(profileId)=>{
    const instance = await getInstance();

    const devices = await instance.getDeviceList();

    const profileAlias = profileId.substring(0, 5);

    return devices.filter(device=>{
        return device.alias.indexOf(profileAlias) >= 0;
    });
};

const getInstance = async()=>{
    return login(process.env.TPLINK_USER_NAME, process.env.TPLINK_PASSWORD, uuid.v4());
};