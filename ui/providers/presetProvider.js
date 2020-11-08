exports.presetStatuses = {
    'flood-top':{
        deviceStatus:[
            1,
            0,
            0,
            0,
            1,
            1
        ]
    },
    'drain-top':{
        deviceStatus:[
            1,
            1,
            0,
            1,
            0,
            1
        ]
    },
    'flood-bottom':{
        deviceStatus:[
            0,
            1,
            1,
            0,
            1,
            1
        ]
    },
    'drain-bottom':{
        deviceStatus:[
            0,
            1,
            1,
            1,
            0,
            1
        ]
    },
    'all-off':{
        deviceStatus:[
            0,
            0,
            0,
            0,
            0,
            0
        ]
    }
};

exports.topDrainIndex = 1;
exports.bottomDrainIndex = 3;
exports.pumpIndex = 4;
