const tpLink = require('../../../providers/tpLinkProvider');

const user = {
    tpLinkUserName:"putzke@gmail.com",
    tpLinkPassword:"lauren143"
};

it('logs into tpLink', async()=>{
    const loginInfo = await tpLink.login(user);

    expect(loginInfo.accountId).toBe('19310036');
});


it('logs into tpLink and gets devices', async()=>{
    const loginInfo = await tpLink.login(user);

    expect(loginInfo.accountId).toBe('19310036');

    const devices = await tpLink.getDevices(loginInfo.token);

    expect(devices.length).toBe(5);
});


it('logs into tpLink and gets device details', async()=>{
    const loginInfo = await tpLink.login(user);

    expect(loginInfo.accountId).toBe('19310036');

    const devices = await tpLink.getDevices(loginInfo.token);

    expect(devices.length).toBe(5);

    const smartSwitch = devices.find(device=>{
        return device.deviceName = 'Wi-Fi Smart Power Strip';
    });

    expect(smartSwitch).not.toBe(undefined);

    const deviceDetails = await tpLink.getDeviceDetails(smartSwitch.deviceId, loginInfo.token);
    console.info(deviceDetails);
});

it('logs into tpLink and turn on all children', async()=>{
    const loginInfo = await tpLink.login(user);

    expect(loginInfo.accountId).toBe('19310036');

    const devices = await tpLink.getDevices(loginInfo.token);

    expect(devices.length).toBe(5);

    const smartSwitch = devices.find(device=>{
        return device.deviceName = 'Wi-Fi Smart Power Strip';
    });

    expect(smartSwitch).not.toBe(undefined);

    const deviceDetails = await tpLink.getDeviceDetails(smartSwitch.deviceId, loginInfo.token);
    console.info(deviceDetails);

    const status = await tpLink.turnChildDevicesOn(smartSwitch.deviceId, deviceDetails.children, loginInfo.token);
    console.info(status);
});

it('logs into tpLink and turn off all children', async()=>{
    const loginInfo = await tpLink.login(user);

    expect(loginInfo.accountId).toBe('19310036');

    const devices = await tpLink.getDevices(loginInfo.token);

    expect(devices.length).toBe(5);

    const smartSwitch = devices.find(device=>{
        return device.deviceName = 'Wi-Fi Smart Power Strip';
    });

    expect(smartSwitch).not.toBe(undefined);

    const deviceDetails = await tpLink.getDeviceDetails(smartSwitch.deviceId, loginInfo.token);
    console.info(deviceDetails);

    const status = await tpLink.turnChildDevicesOff(smartSwitch.deviceId, deviceDetails.children, loginInfo.token);
    console.info(status);
});


it('logs into tpLink and turn on all lights', async()=>{
    const loginInfo = await tpLink.login(user);

    expect(loginInfo.accountId).toBe('19310036');

    const devices = await tpLink.getDevices(loginInfo.token);

    expect(devices.length).toBe(5);

    const smartSwitch = devices.find(device=>{
        return device.deviceName = 'Wi-Fi Smart Power Strip';
    });

    expect(smartSwitch).not.toBe(undefined);

    const deviceDetails = await tpLink.getDeviceDetails(smartSwitch.deviceId, loginInfo.token);
    console.info(deviceDetails);

    const lights = deviceDetails.children.filter((child)=>{
        return child.alias.indexOf('Light') >= 0;
    });

    const status = await tpLink.turnChildDevicesOn(smartSwitch.deviceId, lights, loginInfo.token);
    console.info(status);
});

it('logs into tpLink and turn off all lights', async()=>{
    const loginInfo = await tpLink.login(user);

    expect(loginInfo.accountId).toBe('19310036');

    const devices = await tpLink.getDevices(loginInfo.token);

    expect(devices.length).toBe(5);

    const smartSwitch = devices.find(device=>{
        return device.deviceName = 'Wi-Fi Smart Power Strip';
    });

    expect(smartSwitch).not.toBe(undefined);

    const deviceDetails = await tpLink.getDeviceDetails(smartSwitch.deviceId, loginInfo.token);
    console.info(deviceDetails);

    const lights = deviceDetails.children.filter((child)=>{
        return child.alias.indexOf('Light') >= 0;
    });

    const status = await tpLink.turnChildDevicesOff(smartSwitch.deviceId, lights, loginInfo.token);
    console.info(status);
});

it('logs into tpLink and turn on pump', async()=>{
    const loginInfo = await tpLink.login(user);

    expect(loginInfo.accountId).toBe('19310036');

    const devices = await tpLink.getDevices(loginInfo.token);

    expect(devices.length).toBe(5);

    const smartSwitch = devices.find(device=>{
        return device.deviceName = 'Wi-Fi Smart Power Strip';
    });

    expect(smartSwitch).not.toBe(undefined);

    const deviceDetails = await tpLink.getDeviceDetails(smartSwitch.deviceId, loginInfo.token);
    console.info(deviceDetails);

    const pump = deviceDetails.children[5];

    const status = await tpLink.turnChildDevicesOn(smartSwitch.deviceId, [pump], loginInfo.token);
    console.info(status);
});

it('logs into tpLink and turn off pump', async()=>{
    const loginInfo = await tpLink.login(user);

    expect(loginInfo.accountId).toBe('19310036');

    const devices = await tpLink.getDevices(loginInfo.token);

    expect(devices.length).toBe(5);

    const smartSwitch = devices.find(device=>{
        return device.deviceName = 'Wi-Fi Smart Power Strip';
    });

    expect(smartSwitch).not.toBe(undefined);

    const deviceDetails = await tpLink.getDeviceDetails(smartSwitch.deviceId, loginInfo.token);
    console.info(deviceDetails);

    const pump = deviceDetails.children[5];

    const status = await tpLink.turnChildDevicesOff(smartSwitch.deviceId, [pump], loginInfo.token);
    console.info(status);
});