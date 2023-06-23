import { action, observable, computed, autorun, toJS, getDependencyTree, trace, makeAutoObservable, remove, runInAction } from 'mobx';
import { Alert, ToastAndroid } from 'react-native';
import { Product } from '../types/product';
import { useState } from 'react';

export interface CartItem {
  product:Product,
  quantity:number,
  price:number,
  note:String,
}


export class CartProduct {
  constructor() {
    makeAutoObservable(this, {

  })}
 

   items: CartItem [] = [];
  

  @action addItem(item:CartItem) {
    const findProduct = this.items.find(e => e.product._id === item.product._id )
    if (findProduct) {
        findProduct.quantity += item.quantity
    //   console.log('Update cart', this.items)
    }
     else {
      this.items.push(item)
      console.log('Add cart quantity', this.items)
    }
  }

  @computed updateQuantity(product:Product, quantity:number) {
    const findProduct = this.items.find(e => e.product._id === product._id)
    if (findProduct) {
        findProduct.quantity = quantity
    }
  }

  @computed delteteQuantity(product:Product, quantity:number) {

    const findProduct = this.items.find(e => e.product._id === product._id)
    if (findProduct) {
        findProduct.quantity = quantity

        Alert.alert('Xóa sản phẩm', 'Có chắc bạn muốn xóa sản phẩm khỏi giỏ hàng?', [
          {text: 'Không', onPress: () =>{
            runInAction(() => {
                findProduct.quantity = quantity = 1
            })
          }, },
  
          {text: 'Có', onPress: () => {
            runInAction(() => {
              for(var i = 0; i < this.items.length; i++){
                if(this.items[i].product._id == findProduct.product._id)
                this.items.splice(i,1);
               }
            })
          }}
        ])
    }
  }

  @computed delteteItem() {
    for(var i = 0; i < this.items.length; i++){
      this.items.splice(i,this.items.length);
      
  };
}


  

  @computed get CalculateTotal() {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
        total = total + (this.items[i].quantity * this.items[i].price);
    }
    return total;
};


@computed get count() {
  const finalCount = this.items.length;
  console.log('cong', finalCount)
  return finalCount;
}

}




const cartStore = new CartProduct();
export {cartStore}
