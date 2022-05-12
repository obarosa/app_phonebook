import axios from 'axios';

const instance = axios.create({
baseURL:"http://192.168.150.27:9999/",
});

export default instance;