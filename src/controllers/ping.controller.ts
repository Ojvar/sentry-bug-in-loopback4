import {inject} from '@loopback/core';
import axios from 'axios';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
  HttpErrors,
  post,
} from '@loopback/rest';

import * as Sentry from '@sentry/node';
import {Keycloak} from '../services';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @post('/ping')
  @response(200, PING_RESPONSE)
  ping_post(): object {
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  // Map to `GET /ping`
  @get('/ping-get')
  @response(200, PING_RESPONSE)
  async ping_get(
    @inject('datasources.Keycloak') keycloak: Keycloak,
  ): Promise<object> {
    return keycloak.ping();
  }

  // Map to `GET /ping`
  @get('/ping-get-axios')
  @response(200, PING_RESPONSE)
  async ping_get_axios(
  ): Promise<object> {
    const res = await axios.post('http://localhost:3000/ping');
    console.log(res);
    return res.data;
  }
}
