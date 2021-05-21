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
        method: ['GET', 'POST'],
        path: '/api/profile/{any*}',
        handler: (request, h) => {
            const accept = request.headers.accept

            if (accept && accept.match(/json/)) {
                return boom.notFound('This resource is not available.')
            }

            return request.path;
        }
    })

    server.route({
        method: 'GET',
        path: '/api/profile/{email}/devices',
        handler: async (request) => {
            try {
                const { email } = request.params;
                
                console.info(`getting devices for ${email}`);
                
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
        path: '/api/profile/{email}/devices/{deviceId}/status',
        handler: async (request) => {
            try {
                const { deviceId, email } = request.params;
                const { children } = request.payload;
                
                /*
                    children:[
                        {
                            id:'',
                            state:1/0
                        }
                    ]
                */

               console.info(`children in service: ${JSON.stringify(request.payload)}`);
                return handlers.setChildStatuses(email, deviceId, children);
            } catch (e) {
                console.error(e);
                return e;
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/locations',
        handler: async (request) => {
            try {
                const locations =  await handlers.getLocations();
                
                return locations;
            } catch (e) {
                console.error(e);
                return e;
            }
        }
    });  

    server.route({
        method: 'GET',
        path: '/api/locations/{locationId}/racks',
        handler: async (request) => {
            try {
                const { locationId } = request.params;
                const racks =  await handlers.getRacks(locationId);
                
                return racks;
            } catch (e) {
                console.error(e);
                return e;
            }
        }
    });  

    server.route({
        method: 'GET',
        path: '/api/locations/{locationId}/racks/{rackId}',
        handler: async (request) => {
            try {
                const { locationId, rackId } = request.params;
                const rack =  await handlers.getRack(locationId, rackId);
                
                return rack;
            } catch (e) {
                console.error(e);
                return e;
            }
        }
    });  

    server.route({
        method: 'PUT',
        path: '/api/locations/{locationId}/racks/{rackId}',
        handler: async (request) => {
            try {
                
                const { locationId, rackId } = request.params;
                
                const rack = request.payload;
                console.info(request.payload);

                if(rack.rackId !== rackId || rack.locationId !== locationId){
                    throw 'Rack id or location id do not match.  cannot save rack';
                }

                await handlers.saveRack(rack);
                
                return true
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