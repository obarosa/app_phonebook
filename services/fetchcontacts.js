import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
        var value = await AsyncStorage.getItem("MyApi");
        return value;
    } catch (e) {
        console.log('CATCH do GET no FETCH', e);
    }
}

(async function () {
    let api = await getData();
    axios.defaults.baseURL = api;
    console.log('ASYNC no FETCH', axios.defaults.baseURL);
})();

const instance = axios.create({});
export default instance;