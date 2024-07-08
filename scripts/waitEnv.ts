import waitOn from 'wait-on';
import './loadEnv'; // Load environment variables

const api = process.env.GET_PRIME_URL;
const api_check = api ? `${api}/primes/2` : undefined;
const baseUrl = process.env.BASE_URL;

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
