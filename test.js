const uuid = require("uuid");
const {login} = require("tplink-cloud-api");

const main =  async()=>{

    const instance = await login("j.henry@n-dexed.com", "T@1nsDaytplink", uuid.v4());
    const devices = await instance.getDeviceList();

    console.info(devices);

    const plug = await instance.getHS100(devices[0].deviceId);
    console.info(plug);

    plug.powerOn();
    plug.powerOff();
}


main();