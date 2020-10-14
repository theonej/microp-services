'use strict'

const hapi = require('@hapi/hapi');
const { boomify } = require('@hapi/boom');
const handlers = require('./handlers');

const server = hapi.server({
    port: 9001,
    host: '0.0.0.0'
});

const registerRoutes = async () => {

    server.route({
        method: 'GET',
        path: '/api/profile/{email}/devices',
        handler: async (request) => {
            try {
                const { email } = request.params;
                const devices =  await handlers.getDevices(decodeURIComponent(email));
                
                return devices;
            } catch (e) {
                console.error(e);
                return e;;
            }
        }
    });            

    server.route({
        method: 'GET',
        path: '/api/profile/{profileId}/{deviceType}',
        handler: async (request) => {
            try {
                return handlers.getDevices();
            } catch (e) {
                return e;
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/devices/{deviceId}/status',
        handler: async (request) => {
            try {
                const { deviceId } = request.params;
                const { children } = request.payload;
                const token = request.headers['microp-api-token'];
                
                /*
                    children:[
                        {
                            id:'',
                            status:1/0
                        }
                    ]
                */

                return handlers.setChildStatuses(deviceId, children, token);
            } catch (e) {
                console.error(e);
                return e;
            }
        }
    });
};

const init = async () => {

    await registerRoutes();

    await server.start();

    console.info(`server running at ${server.info.uri}`);
};

init();