import { StyleSheet, Text, View,TouchableOpacity, Image, FlatList,ScrollView,TextInput, Pressable,Alert} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { observer } from 'mobx-react';
import { orderStore } from '../../mobx/order_store';
import { cartStore } from '../../mobx/cart_store';
import { order } from '../ProductSevice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrderId, orderCancelId } from '../../user/UserService';
const DetailHistory = ( props,route) => {
    const { navigation,route: {params: { id },},} = props;
    const [orderDetails, setOrderDetails] = useState();
    const [statusCancel, setStatusCancel] = useState('CANCEL');
    const [refreshKey, setRefreshKey] = useState(0);
    useEffect(() => {
        onGetOrderDetail();
      }, [refreshKey]);

    const onGetOrderDetail = async () => {
    getOrderId(id)
        .then(res => {
        let data = res;
        setOrderDetails(data);
        
        })
        .catch(err => {
        });
    }

    
    if(!orderDetails){
        return null
    }

    const formatCash = (str) => {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        })
      }

    // console.log('>>>>',orderDetails)

    const onOrderCancel = () => {
        Alert.alert('Hủy đơn hàng', 'Có chắc bạn muốn hủy đơn hàng?', [
            {text: 'Không', style: 'cancel' },
    
            {text: 'Có', onPress: async () => {
                try {
                    const res = await orderCancelId(id,statusCancel);
                    setRefreshKey(oldKey => oldKey +1)
                    navigation.navigate('ProfileScreen')
                    } catch (error) {
                    console.log("onOrderCancel ne error", error);
                    }
            }}
          ])
        
      };
    console.log('>>>>>', orderDetails.status)
    
  return (
    <View style={styles.container}>
    <View style = {styles.headerContainer}>
          <View style= {styles.itemHeaderContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.textTitle}>Chi tiết đơn hàng</Text>
              <View></View>
          </View>
      </View>

      <ScrollView>
      <View style = {styles.deltaiOrderContainer}>
              <View style = {styles.textAddressContainer}>
                  <Text style = {styles.textAddress}>Trạng thái đơn</Text>  
              </View>

              <View style = {{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',paddingRight: 20,paddingLeft: 10,paddingBottom: 10}}>
                  <Text style = {styles.texInfo}>Trạng thái</Text>
                    {
                        
                        orderDetails.status == 'CANCEL' ? <Text style={[styles.texInfo, {marginLeft: 5, color: 'red'}]}>Đã hủy</Text> 
                        : orderDetails.status == 'PROCESSING'? <Text style={[styles.texInfo,{marginLeft: 5, color: '#CD6600'}]}>Đang thực hiện</Text>
                        : orderDetails.status == 'WAITING'? <Text style={[styles.texInfo,{marginLeft: 5, color: '#CD6600'}]}>Chờ xác nhận</Text>
                        : orderDetails.status == 'COMPLETE'? <Text style={[styles.texInfo,{marginLeft: 5, color: '#CD6600'}]}>Hoàn thành</Text>
                        : <Text style={[styles.texInfo,{marginLeft: 5, color: '#CD6600'}]}>Đang vận chuyển</Text>
                    }
                </View>

          </View>

          <View style = {styles.deltaiOrderContainer}>
              <View style = {styles.textAddressContainer}>
                  <Text style = {styles.textAddress}>Địa chỉ giao hàng</Text>  
              </View>

              <View style = {{alignItems: 'center',flexDirection: 'row',paddingRight: 20,paddingLeft: 10,}}>
                  <Text style = {styles.texInfo}>{orderDetails.name}</Text>
                  <View style ={{width: 6, height: 6, backgroundColor: '#9E9E9E', borderRadius: 10,marginLeft:5, marginTop: 10}}></View>
                  <Text style = {[styles.texInfo,{marginLeft: 5}]}>{orderDetails.phone}</Text>
                  </View>
              <View style = {styles.describeContainer}>
                  <Text style = {styles.textDescribe}>{orderDetails.address}</Text>
              </View>
              
          </View>

          <View style = {styles.deltaiCartContainer}>
              <View style = {styles.textCartContainer}>
                  <Text style = {styles.textCart}>Sản phẩm đã chọn</Text>  
              </View>
              <View>
                  {orderDetails.details.map((e) => {
                      return(
                          <View style ={styles.productContainer} key ={e.product._id}>
                          <View style ={styles.product}>
                              <View style={{flexDirection: 'row'}}>
                                  <View>
                                  <Feather name="download" size={20} color="#CD853F" />
                                  </View>
                                  <View style ={styles.textProductContainer}>
                                      <Text numberOfLines={2} style={styles.textName}>{e.quantity}x {e.product.name}</Text>
                                      <Text style={styles.textNote}>{e.note}</Text>
                                  </View>
                                  
                                  </View>
                                  <View>
                                  <Text style={styles.textPrice}>{formatCash(e.price.toString())}đ</Text>
                                  </View>
                              </View>
                              <View style={styles.lineStyle}></View>
                          </View>
                      )
                  })}
              </View>
          </View>
          
          <View style = {styles.OrderFinalContainer}>
                  <View style = {styles.textAddressContainer}>
                      <Text style = {styles.textAddress}>Tổng cộng</Text>  
                  </View>

                  <View style = {styles.textInfoContainer}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10}}>
                          <Text style = {styles.textThanhTien}>Thành tiền</Text>
                          <Text>{formatCash(orderDetails.moneyTotal.toString())}đ</Text>
                      </View>
                      <View style={styles.lineStyle}></View>
                  </View>

                  <View style = {styles.textInfoContainer}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10}}>
                          <Text style = {styles.textThanhTien}>Phí vận chuyển</Text>
                          <Text>{formatCash(orderDetails.feeDelivery.toString())}đ</Text>
                      </View>
                      <View style={styles.lineStyle}></View>
                  </View>

                  <View style = {styles.textInfoContainer}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10}}>
                          <Text style = {styles.textThanhTien}>Tiền khuyến mãi</Text>
                          <Text>{formatCash(orderDetails.moneyDiscount.toString())}đ</Text>
                      </View>
                      <View style={styles.lineStyle}></View>
                  </View>

                  <View style = {styles.textInfoContainer}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10}}>
                          <Text style = {[styles.textThanhTien, {fontWeight: '700'}]}>Số tiền thanh toán</Text>
                          <Text style = {{fontWeight: '700'}}>{formatCash(orderDetails.moneyFinal.toString())}đ</Text>
                      </View>
                  </View>

                  <View style = {styles.textAddressContainer}>
                      <View style ={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                          <Text style = {styles.textAddress}>Hình thức thanh toán</Text>  
                            <View style={styles.buttonHinhThuc}>
                                <Text style={styles.textHinhThuc}>Tiền mặt</Text>
                            </View>
                      </View>
                  </View>
          </View>

          <View style={{height: 50}}></View>
      </ScrollView>
        <View style ={{  paddingTop: 10, paddingBottom: 20}}>
            <View style={styles.totalContainer}>
                <Text style={styles.textAddress}>TỔNG CỘNG</Text>
                <Text style={styles.textAddress}>{formatCash(orderDetails.moneyFinal.toString())}đ</Text>
            </View>

            <View style={{paddingTop: 10, paddingLeft: 10, paddingRight: 20}}>
            {
                        orderDetails.status == 'WAITING' ? 
                        <TouchableOpacity onPress={onOrderCancel}>
                        <View style={styles.buttonOrder}>
                            <Text style={styles.textButton}>HỦY ĐƠN</Text>
                        </View>
                        </TouchableOpacity>
                        : 
                        <Pressable>
                        <View style={[styles.buttonOrder,{backgroundColor: '#AAAAAA'}]}>
                            <Text style={styles.textButton}>HỦY ĐƠN</Text>
                        </View>
                        </Pressable>
                    }
            </View>
        </View>
  </View>
  )
}

export default DetailHistory

const styles = StyleSheet.create({

    textButton:{
        color: "white",
        fontWeight: "700",
        lineHeight: 24,
        fontSize: 16,
        fontStyle: "normal",
        flexGrow: 0,
    },

    buttonOrder:{
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#F44336",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    
    totalPrice:{
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 23.45,
        color: '#489620'
    },

    totalText:{
        marginTop: 3,
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 23.45,
        color: '#231F20',
        // backgroundColor: 'red'
    },


    totalContainer:{
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },

    textHinhThuc:{

        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 17,
        color: '#CD6600'
    },

    buttonHinhThuc:{
        marginLeft: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 30,
        backgroundColor: 'white',
        borderColor: '#CD6600',
        borderWidth: 1,
        borderRadius: 7
    },

    textSize:{
        fontSize: 18,
        fontWeight: '500'
    },

    textSizeContainer:{
        backgroundColor: 'white',
        paddingTop: 10, 
        paddingLeft: 10,
        paddingBottom: 10
    },

    SizeContainer:{
        paddingTop: 10,
    },

    textCode:{
        color: "white",
        fontWeight: "700",
        fontSize: 14,
        fontStyle: "normal",
    },

    buttonCode:{
        padding: 10,
        width: 80,
        height: 40,
        backgroundColor: '#CD6600',
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },

    TextInput: {
        padding: 10,
        width: 140,
        height: 40,
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7,
        borderWidth: 1,
        borderColor: '#C9C2C0',
      },

    textThanhTien:{
     fontSize: 14,
     fontWeight: '400',
     color: 'black'
    },

    OrderFinalContainer:{
        marginTop: 20,
        paddingBottom: 20,
        backgroundColor:'white'
    },
    
    lineStyle:{
        opacity: 0.5,
        marginTop: 20,
        borderWidth: 0.3,
        borderColor:'#9E9E9E',
    },

    textPrice:{
        marginTop: 5,
        fontSize:14,
        // backgroundColor: 'red'
      },

      textNote:{
        marginTop: 5,
        fontSize:14,
        // backgroundColor: 'red'
      },
    
      textName:{
        width: 240,
        fontSize:16,
        fontFamily: 'Montserrat_600SemiBold',
      },
    
    textProductContainer:{
      paddingLeft: 10,
    },
    
      imageProduct:{
        width: 120,
        height: 120,
        borderRadius: 7
      },
    
      product:{
      flexDirection: 'row',
      justifyContent: 'space-between'
      },
    
      productContainer:{
        paddingBottom: 2,
        paddingTop:10,
        paddingLeft: 10,
        paddingRight: 20,
        justifyContent: 'center'
      },

    textCart:{
        fontSize: 16,
        fontWeight: '600',
    },

    textCartContainer:{
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 10,
    },

    deltaiCartContainer:{
        marginTop: 20,
        backgroundColor:'white'
    },

    textDescribe:{
        paddingTop: 10,
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.8)'
    },

    describeContainer:{
        paddingRight: 20,
        paddingLeft: 10,
        paddingBottom: 10,
    },

    texInfo:{
        paddingTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: 'black'
    },
    textInfoContainer:{
        paddingRight: 20,
        paddingLeft: 10,
    },
    
    textAddress:{
        fontSize: 16,
        fontWeight: '600',
    },

    textAddressContainer:{
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 10,
    },

    deltaiOrderContainer:{
        marginTop: 20,
        backgroundColor:'white'
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