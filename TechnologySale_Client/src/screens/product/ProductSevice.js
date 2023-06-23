import { intercept } from "mobx";
import axiosInstance from "../utils/axios";
import constants from "../utils/constants";

interface Order{
  name: string,
  phone: string,
  address: string,
  paymentType: string,
  status: string,
  code: string,
  feeDelivery: number,
  moneyTotal: number,
  moneyDiscount: number,
  moneyFinal: number,
  details: [

  ],
  user_id: string,
  released: date
}
export const getBanner = async () => {
    const res = await axiosInstance.get('/api/banner');
    return res;
}

export const getProducts = async () => {
    const res = await axiosInstance.get('/api/products');
    return res;
}

export const getProductsHighlights  = async () => {
    const res = await axiosInstance.get('/api/products?page=2');
    return res;
}

export const getSearch = async (name) => {
    if(name){
        const res = await axiosInstance.get(`/api/products?search=${name}`);
        return res;
    }else{
        const res = await axiosInstance.get('/api/products');
        return res;
    }
}


export const getProductId = async (id) => {
    const res = await axiosInstance.get(`/api/products/${id}/detail`);
    return res;
  };

export const getCategories = async () => {
    const res = await axiosInstance.get('/api/categories');
    return res;
};

export const order = async (data: Order) => {
    const res = await axiosInstance.post('/api/orders',data);
    return res;
};

export const getVoucher = async () => {
    const res = await axiosInstance.get('api/voucher');
    return res;
};

export const getVoucherId = async (id) => {
    const res = await axiosInstance.get(`api/voucher/${id}/detail`);
    return res;
  };





