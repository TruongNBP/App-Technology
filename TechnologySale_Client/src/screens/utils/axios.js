import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import constants from "./constants";
const axiosInstance = axios.create({
    baseURL: constants.BASSE_URL
});

axiosInstance.interceptors.request.use(
    async config => {
        // console.log('aaa',config)
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('userId');
        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        // console.log('check token',token);
        return config;
    },
    
    err => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
    res => {
        // console.log('check axios ', res.data)
        return res.data
    },
    err => {
        // console.log('reponse err ne',err.response);
       return Promise.reject(err)
    } 
    
)

export default axiosInstance;