import waitOn from 'wait-on';
import { hostingPort } from './getHostingPort';
import './loadEnv'; // Load environment variables

const api = process.env.GET_PRIME_URL;
const api_check = api ? `${api}/primes/2` : undefined;

const isStaging = process.env.NODE_ENV === 'staging';

const port = hostingPort; // get the port set in firebase.json
const baseUrl = isStaging ? process.env.baseUrl : `http://127.0.0.1:${port}`;

console.log('api_check', api_check);
console.log('baseUrl', baseUrl);

const resources = [api_check, baseUrl].filter(
  (resource): resource is string => typeof resource === 'string',
);

waitOn({ resources })
  .then(() => {
    console.log('Env is ready');
  })
  .catch(error => {
    console.error('Error waiting for env:', error);
  });
