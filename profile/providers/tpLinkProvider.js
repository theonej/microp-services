const uuid = require("uuid");
const fetch = require('node-fetch');

const apiUrl = `https://wap.tplinkcloud.com`;

exports.login = async (userProfile) => {
    var request = {
        method: "login",
        params: {
            appType: "Kasa_Android",
            cloudUserName: userProfile.tpLinkUserName,
            cloudPassword: userProfile.tpLinkPassword,
            terminalUUID: uuid.v4()
        }
    };

    const result = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    });

    const loginInfo = await result.json();
    console.info(loginInfo.result);
    
    return loginInfo.result;
};

exports.getDevices = async (token) => {
    const request = {
        method: "getDeviceList",
        params: {
            "appType": "Kasa_Android",
            "termId": "8006372884D197B80FEE8591AB5AF7731D24FCE700",
            "appVer": "1.4.4.607",
            "ospf": "Android+6.0.1",
            "netType": "wifi",
            "locale": "es_ES",
            "token": token
        }
    };

    const result = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    });

    const deviceInfo = await result.json();

    return deviceInfo.result.deviceList;
};

exports.getDeviceDetails = async (deviceId, token) => {
    const request = {
        method: "passthrough",
        params: {
            "deviceId": deviceId,
            "requestData": "{\"system\":{\"get_sysinfo\":null}}}"
        }
    };

    const uri = `${apiUrl}?token=${token}`;

    const result = await fetch(uri, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    });

    const deviceDetails = await result.json();

    return JSON.parse(deviceDetails.result.responseData).system.get_sysinfo;
};

exports.turnChildDevicesOn = async (deviceId, children, token) => {
    return this.setDeviceRelayState(deviceId, children, 1, token);
};


exports.turnChildDevicesOff = async (deviceId, children, token) => {
    return this.setDeviceRelayState(deviceId, children, 0, token);
};

exports.setChildDeviceStatuses = async (deviceId, children, token) => {
    const onChildren = children.filter((child) => {
        return child.status === 1;
    })

    const offChildren = children.filter((child) => {
        return child.status === 0;
    })

    await this.setDeviceRelayState(deviceId, onChildren, 1, token);
    await this.setDeviceRelayState(deviceId, offChildren, 0, token);

    return true;
};

exports.setDeviceRelayState = async (deviceId, children, relayState, token) => {
    const childIds = children.map((child) => {
        return child.id;
    });

    const requestData = {
        context: {
            child_ids: childIds
        },
        system: {
            set_relay_state: {
                state: relayState
            }
        }
    }

    const request = {
        method: "passthrough",
        params: {
            deviceId: deviceId,
            requestData: JSON.stringify(requestData)
        }
    };

    console.info(JSON.stringify(request));

    const uri = `${apiUrl}?token=${token}`;

    const result = await fetch(uri, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    });

    const statusResponse = await result.json();
    console.info(statusResponse);

    if(statusResponse.error_code && statusResponse.error_code !== 0){
        throw JSON.stringify(statusResponse.msg);
    }

    return JSON.parse(statusResponse.result.responseData);
};