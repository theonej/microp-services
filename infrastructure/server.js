'use strict'

const hapi= require('@hapi/hapi');
const { boomify } = require('@hapi/boom');
const handlers = require('./handlers');

const server =hapi.server({
    port: 9001,
    host: '0.0.0.0'
});

const registerRoutes = async () => {

    server.route({
       method: ['GET', 'POST'],
       path: '/api/infrastructure/{any*}',
       handler: (request, h)=> {
           const accept = request.headers.accept

           if (accept && accept.match(/json/)){
               return boom.notFound('This resource is not available')
           }

           return request.path;
       }
    })

    server.route({
            method: 'GET',
            path: '/api/racks',
            handler: async (request) => {
                try{
                    const devices = await handlers.getRacks();

                    return devices;
                } catch (e){
                    console.error(e);
                    return e;;
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