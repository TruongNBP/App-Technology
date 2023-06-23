import { action, observable, computed, autorun, toJS, getDependencyTree, trace, makeAutoObservable, remove, runInAction } from 'mobx';
import { Alert, ToastAndroid } from 'react-native';
import { Product } from '../types/product';
import { useState } from 'react';

export interface FavoriteItem {
  product:Product,
  quantity:number,
}


export class FavoriteProduct {
  constructor() {
    makeAutoObservable(this, {

  })}
 

   items: FavoriteItem [] = [];
  

  @action addItem(item:FavoriteItem) {
    const findProduct = this.items.find(e => e.product._id === item.product._id )
    if (findProduct) {
        findProduct.quantity += item.quantity
    //   console.log('Update cart', this.items)
    }
     else {
      this.items.push(item)
      console.log('Add favorite quantity', this.items)
    }
  }

  @computed updateQuantity(product:Product, quantity:number) {
    const findProduct = this.items.find(e => e.product._id === product._id)
    if (findProduct) {
        findProduct.quantity = quantity
    }
  }

}




const favoriteStore = new FavoriteProduct();
export {favoriteStore}
