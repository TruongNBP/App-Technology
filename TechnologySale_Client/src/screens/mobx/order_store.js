import { action, observable, computed, autorun, toJS, getDependencyTree, trace, makeAutoObservable } from 'mobx';
import { ToastAndroid } from 'react-native';
import { useState } from 'react';

interface OrderInfo {
  name: string,
  phone: string,
  address: string,
  addressCity:  string,
  addressDistrict: string,
  addressWard: string,
  feeDelivery: number, // tiền shiper
  moneyDiscount: number, // Tien giam gia
  moneyFinal: number, // tien cuoi cung
  moneyTotal: number, // tong cong
}

export class OrderStore {
  constructor() {
    makeAutoObservable(this, {

  })}

  @observable itemInfo: OrderInfo[] = [];


    @action orderInfoArray(items:OrderInfo) {
     this.itemInfo.push(items)
     console.log('saveInfo====>', this.itemInfo)
  }

}


const orderStore = new OrderStore();
export {orderStore}