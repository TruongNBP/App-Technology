import { StyleSheet, Text, View,TouchableOpacity, Image, FlatList,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { cartStore,CartItem } from '../../mobx/cart_store';
import { observer } from 'mobx-react';
import { ListRenderItemInfo } from "react-native";
const CartProduct = (props) => {
    const {navigation} = props
    const [quantity, setQuatity] = useState(1);
    const formatCash = (str) => {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        })
      }

      const onNumberChange = (isAdd: boolean) => {
        if (isAdd == true) {
            setQuatity(quantity + 1);
        } else if (isAdd == false && quantity > 1) {
            setQuatity(quantity - 1)
        }
    }

  return (
    <View style = {styles.container}>
        <View style = {styles.headerContainer}>
            <View style= {styles.itemHeaderContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Giỏ hàng</Text>
                <View></View>
            </View>
        </View>
        <ScrollView
        style={{ paddingTop:3}}
        >
           <View style = {styles.titleCartContainer}>
                <View style = {{flexDirection: 'row', alignItems: 'center',}}>
                    <Image source={require("../../../assets/shopping-cart_01.png")} style = {styles.imageTitle}/>
                    <Text style = {styles.titleText}>Sản phẩm đã chọn</Text>
                </View>
                <View></View>
                {/* {
                    cartStore.count>0 ?
                    <TouchableOpacity onPress={()=> cartStore.removeItem}>
                        <Text>Xóa tất cả</Text>
                    </TouchableOpacity>
                    : null
                } */}
            </View>

            <View style ={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10,}}>
                    {/* <View style={styles.listcartContainer}>
                    <FlatList
                        data={cartStore.items}
                        keyExtractor={(item:CartItem) => item.product.id.toString()}
                        renderItem={renderItemCart}
                        showsVerticalScrollIndicator = {false}
                    />
                    </View> */}
                    {
                        cartStore.items.map(((e) => {
                            return(
                                <View key = {e.product._id} style ={{paddingTop: 10}}>
                                    <View style={styles.cartContainer}>
                                        <View style={[styles.textQuantityContainer, {height: 100,paddingLeft: 10, flexDirection: 'row', paddingTop: 10}]}>
                                            <View>
                                                <Image source={{uri: e.product.image[0]}} style = {{width: 70, height: 70, borderRadius: 7}}/>
                                            </View>
                                            <View style = {{paddingLeft: 10}}>
                                                <Text numberOfLines={2} style={styles.textName}>{e.product.name}</Text>
                                                <Text style={styles.textPrice}>{formatCash(e.price.toString())}đ</Text>
                                                {/* {
                                                    e.price == 39000 ? <Text style={styles.textPrice}>Lớn</Text> :
                                                    e.price == 35000 ? <Text style={styles.textPrice}>Vừa</Text> :
                                                    <Text style={styles.textPrice}>Nhỏ</Text>
                                                } */}
                                            </View>
                                        </View>
                                        <View style = {styles.quantityContainer}>
                                            <TouchableOpacity onPress={() => {
                                                if(e.quantity == 1){
                                                    cartStore.delteteQuantity(e.product, e.quantity)
                                                }else{
                                                    cartStore.updateQuantity(e.product, e.quantity - 1)
                                                }
                                            }}>
                                                <View style = {styles.truQuantity}>
                                                    <Text style = {styles.textTru}>-</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style = {styles.quantity}>
                                                <Text style = {styles.textQuantity}>{e.quantity}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => cartStore.updateQuantity(e.product, e.quantity + 1)}>
                                                <View style = {styles.congQuantity}>
                                                    <Text style = {styles.textCong}>+</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }))
                    }
            </View>
        </ScrollView>
      
      <View style = {{backgroundColor: 'white'}}>
        
        <View style ={{ paddingTop: 10, }}>
           <View style ={{paddingLeft: 10, paddingRight: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style ={{color: 'black', fontSize: 18, fontWeight: '700'}}>Tổng tạm tính</Text>
                <Text style ={{color: '#CD6600', fontSize: 18, fontWeight: '700'}}>{formatCash(cartStore.CalculateTotal.toString())}đ</Text>
           </View>
        </View>
        <View style={styles.buttonOrderContainer}>
            {
                cartStore.count > 0 ?
                <TouchableOpacity onPress={() => navigation.navigate('PaymentAddress')}>
                <View style={[ styles.buttonOrder]}>
                    <View></View>
                    <View><Text style={styles.textButton}>Thanh toán</Text></View>
                    <View>
                    <MaterialIcons name="navigate-next" size={24} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity>
                <View style={[ styles.buttonOrder,{backgroundColor: '#AAAAAA'}]}>
                    <View></View>
                    <View><Text style={styles.textButton}>Thanh toán</Text></View>
                    <View>
                    <MaterialIcons name="navigate-next" size={24} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
            }
        </View>
      </View>
    </View>
  )
}

export default observer(CartProduct)

const styles = StyleSheet.create({
    listcartContainer: {
        paddingTop: 10,
        paddingBottom: 30,
        // backgroundColor: 'red'

     },

    textButton:{
        color: "white",
        fontSize: 16,
        fontStyle: "normal",
        flexGrow: 0,
        fontWeight: '700'
    },

    buttonOrder:{
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        width: 374,
        height: 50,
        backgroundColor: "#CD6600",
        borderRadius: 7,
        justifyContent: 'space-between',
        alignItems: "center",
    },

    buttonOrderNull:{
        width: 374,
        height: 50,
        backgroundColor: "#9E9E9E",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
    },
 
    buttonOrderContainer:{
        paddingTop:20,
        alignItems: "center",
        paddingBottom: 20,
    },

    textPrice:{
        marginTop: 5,
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: '600',
        lineHeight: 16.41,
        color: '#581B00',
        // backgroundColor: 'red'
    },

    textName:{
        width: 150,
        color: "black",
        fontWeight: "700",
        lineHeight: 24,
        fontSize: 16,
        fontStyle: "normal",
    },

    textQuantity:{
        color: "black",
        fontWeight: "700",
        lineHeight: 24,
        fontSize: 16,
        fontStyle: "normal",
    },
    textTru:{
        color: "white",
        fontWeight: "700",
        fontSize: 16,
        fontStyle: "normal",
    },
    
    textCong:{
        fontSize: 16,
        color: "white",
        fontWeight: "700",
        fontStyle: "normal",
    },
    
    quantity:{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        width: 25,
    },

    truQuantity:{
        width: 25,
        height: 25,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CD6600'
    },
    congQuantity:{
        width: 25,
        height: 25,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CD6600'
    },

    quantityContainer:{
        width: 110,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight:10,
        paddingLeft: 10,
    },

    cartContainer:{
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.15,
          shadowRadius: 7,
          elevation: 1
    },

    titleText:{
        marginLeft: 10,
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "700",
        color: "#231F20",
        lineHeight: 24,
    },

    imageTitle:{
        width: 25,
        height: 25,
    },

    titleCartContainer:{
        paddingTop: 20,
        paddingRight: 10,
        paddingLeft: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    textTitle:{
        fontSize: 16,
        fontWeight: '600'
    },
    
    itemHeaderContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    
    headerContainer:{
        width: '100%',
        height: 85, 
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowOpacity: 0.15,
        elevation: 2,
        justifyContent: 'center',
    },

    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "#F9F6F6",
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

})