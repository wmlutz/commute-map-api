'use strict';
const Hapi = require('hapi');
const Joi = require('joi');
import Posit from './models/posit';

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'POST',
  path: '/',
  handler: (request, h) => {
    const {lat, long} = request.query;
    let posit = new Posit({lat, long});
    console.log('Posit', posit.toJSON());
    
    return h.response({
      publicTransit: '',
      driving: '',
      combined: ''
    }).code(200);
  },
  options: {
    validate:  {
      query: {
				lat: Joi.number().min(-90).max(90).required(),
				long: Joi.number().min(-180).max(180).required()
      }
    }
  }
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();