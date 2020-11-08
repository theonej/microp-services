const fetch = require('node-fetch');
const presets = require('../../../providers/presetProvider');
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

export default async (req, res) => {
    console.info(`raw request data: ${JSON.stringify(req.body)}`);
    const { email, presetId, deviceId } = req.query;

    console.info(`${email}:${deviceId}:${presetId}`)
    let children = getPresetDeviceStatuses(presetId, req.body);

    const uri = `${process.env.BASE_API_URL}/profile/${encodeURIComponent(email)}/devices/${deviceId}/status`;
    console.info(`email uri: ${uri}`);

    const request = {
        children: children
    };

    const result = await fetch(uri, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    });

    let devices = await result.json();

    //queue call to turn pump off
    turnOffPump(uri, children);

    if(children[presets.bottomDrainIndex].state == 1 || children.topDrainIndex == 1){
        turnOffDrains(uri, children);
    }
    res.statusCode = 200
    res.json(request);
}

const turnOffPump = async (uri, children) => {
    setTimeoutPromise(1000 * 60 * 3, {}).then((value) => {
        children[presets.pumpIndex].state = 0;

        const request = {
            children: [children[presets.pumpIndex]]
        };

        console.info('turning pump off');

        fetch(uri, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
    });
};


const turnOffDrains = async (uri, children) => {
    setTimeoutPromise(1000 * 60 * 3, {}).then((value) => {
        children[presets.topDrainIndex].state = 0;
        children[presets.bottomDrainIndex].state = 0;

        const request = {
            children: [
                children[presets.topDrainIndex], 
                children[presets.bottomDrainIndex]
            ]
        };

        console.info('turning drains off');

        fetch(uri, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
    });
};

const getPresetDeviceStatuses = (presetId, children) => {

    console.info(`preset children before update: ${JSON.stringify(children)}`);
    console.info(presets.presetStatuses);

    const presetStatuses = presets.presetStatuses[presetId];

    for (var index = 0; index < children.length; index++) {
        children[index].state = presetStatuses.deviceStatus[index];
    }

    console.info(`preset children: ${JSON.stringify(children)}`);
    return children;
}
