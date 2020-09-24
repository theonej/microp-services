'use strict'

const hapi = require('@hapi/hapi');
const { boomify } = require('@hapi/boom');

const server = hapi.server({
    port:9001,
    host:'0.0.0.0'
});

const registerRoutes = async()=>{
    
    server.route({
        method: 'GET',
        path: '/api/profile/{profileId}',
        handler:async(request)=>{
            try{
                return handlers.getProfile();
            }catch(e){
                return boomify.badRequest(e);
            }
        }
    });    
};

const init = async()=>{

    await registerRoutes();

    await server.start();

    console.info(`server running at ${server.info.uri}`);
};

init();