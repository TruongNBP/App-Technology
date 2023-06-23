import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../utils/axios";

export const login = async (email, password) => {
    const data = { email, password };
    const res = await axiosInstance.post('/api/login', data);
  // try {
  //   const res = await  fetch(constants.BASSE_URL + '/v1/customer/auth/login',{
  //     method:'post',
  
  //   } )
  //   console.log('data',res)
    return res;
  };

  export const register = async (email, password, confirm_password) => {
    const data = { email, password, confirm_password };
    const res = await axiosInstance.post('/api/register', data);
    return res;
  };

  export const logout = async () => {
    const res = await axiosInstance.post('/api/logout');
    return res;
  };

  export const getNews = async () => {
    const res = await axiosInstance.get('/api/news');
    return res;
}

export const getNewsId = async (id) => {
  const res = await axiosInstance.get(`/api/news/${id}/detail`);
  return res;
};

export const getProfile = async () => {
  const id = await AsyncStorage.getItem('userId');
  const res = await axiosInstance.get(`/api/users/${id}/deitai`);
  return res;
}

export const updateProfile = async (name,phone) => {
  const data = { name, phone };
  const id = await AsyncStorage.getItem('userId');
  const res = await axiosInstance.post(`/api/users/${id}/update`,data);
  return res;
}

export const updatePass = async (password) => {
  const data = { password };
  const id = await AsyncStorage.getItem('userId');
  const res = await axiosInstance.post(`/api/users/${id}/update`,data);
  return res;
}

export const getAddress = async () => {
  const res = await axiosInstance.get('https://provinces.open-api.vn/api/?depth=3');
  return res;
}

export const getOrder =  async () => {
  const id = await AsyncStorage.getItem('userId');
  const res = await axiosInstance.get(`/api/users/${id}/deitai`);
  return res;
}

export const getOrderId =  async (id) => {
  const res = await axiosInstance.get(`api/orders/${id}/detail`);
  return res;
}
export const orderCancelId =  async (id,status) => {
  const data = {status}
  const res = await axiosInstance.post(`api/orders/${id}/update`,data);
  return res;
}


  