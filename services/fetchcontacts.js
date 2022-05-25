import axios from 'axios';

console.log('ASYNC no FETCH', axios.defaults.baseURL, '\n----');
const instance = axios.create({});
export default instance;