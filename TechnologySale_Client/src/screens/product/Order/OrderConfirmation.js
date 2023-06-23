import { StyleSheet, Text, View,TouchableOpacity, Image, FlatList,ScrollView,TextInput, Pressable,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { observer } from 'mobx-react';
import { orderStore } from '../../mobx/order_store';
import { cartStore } from '../../mobx/cart_store';
import { getVoucher, order } from '../ProductSevice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const dataPay = [
    {
        image: "https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg",
        title: "Tiền mặt",
        status: "CASH"
    },
    {
        image: "https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png",
        title: "MoMo",
        status: "MOMO"
    },
    {
        image: "https://minio.thecoffeehouse.com/image/tchmobileapp/388_ic_zalo@3x.png",
        title: "ZaloPay",
        status: "ZALO"
    }
]

const OrderConfirmation = (props) => {
    const {navigation} = props
    const [mood, setMood] = useState('CASH')
    const [codeDiscount, setCodeDiscount] = useState("")
    const [discount, setDiscount] = useState(0)
    const [address, setAddress] = useState()
    const [endow, setEndow] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    useEffect(() => {
        onGetEndow()
      }, [refreshKey]);

      const onGetEndow = async () => {
        getVoucher()
          .then(res => {
            let data = res;
            setEndow(data);
            data.find((e) => {
                if(e.code == codeDiscount){
                  // console.log('sadsad',e)
                  setDiscount(e.discount)
                } 
              }) 
            console.log(data)
          })
          .catch(err => {
            console.log('ErorrGetVoucher: ', err)
          });
     }

     const onDiscount =  () => {
        endow.find((dist) =>{
          if(dist.code == codeDiscount){
            setDiscount(dist.discount)
            console.log("logggg", dist.discount)
          }
         
        })
        setDiscount(0)
      }

      console.log(">>>>", codeDiscount)

    const formatCash = (str) => {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        })
      }
    //   console.log(mood)

    const onOrder = async () => {
        const id = await AsyncStorage.getItem('userId');
        if(mood != 'CASH'){
            Alert.alert('Xác nhận đơn hàng', 'Chức năng chưa hoàn thành', [
                {text: 'Xác nhận',}
              ])
        }else{
            try {
                const res = await order(
                  {
                    name: orderStore.itemInfo[orderStore.itemInfo.length-1].name.toString(),
                    phone: orderStore.itemInfo[orderStore.itemInfo.length-1].phone.toString(),
                    address: orderStore.itemInfo[orderStore.itemInfo.length-1].address + ' ' + orderStore.itemInfo[orderStore.itemInfo.length-1].addressWard + ' ' + orderStore.itemInfo[orderStore.itemInfo.length-1].addressDistrict + ' ' + orderStore.itemInfo[orderStore.itemInfo.length-1].addressCity ,
                    paymentType: mood,
                    details: cartStore.items,
                    status: "WAITING",
                    code: "",
                    feeDelivery: orderStore.itemInfo[orderStore.itemInfo.length-1].feeDelivery,
                    moneyTotal: orderStore.itemInfo[orderStore.itemInfo.length-1].moneyTotal,
                    moneyDiscount: discount,
                    moneyFinal: orderStore.itemInfo[orderStore.itemInfo.length-1].moneyFinal - discount,
                    user_id: id,
                    released: new Date()
                    }
                );
                navigation.navigate('OrderSuccess')
                console.log('order3>>>>>>',res);
                
              } catch (error) {
                console.log("onOrderStep3 error", error.data);
                }
        }
        
          
      };

  return (
    <View style={styles.container}>
      <View style = {styles.headerContainer}>
            <View style= {styles.itemHeaderContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Xác nhận đơn hàng</Text>
                <View></View>
            </View>
        </View>

        <ScrollView>
            <View style = {styles.deltaiOrderContainer}>
                <View style = {styles.textAddressContainer}>
                    <Text style = {styles.textAddress}>Địa chỉ giao hàng</Text>  
                </View>

                <View style = {{alignItems: 'center',flexDirection: 'row',paddingRight: 20,paddingLeft: 10,}}>
                    <Text style = {styles.texInfo}>{orderStore.itemInfo[orderStore.itemInfo.length-1].name}</Text>
                    <View style ={{width: 6, height: 6, backgroundColor: '#9E9E9E', borderRadius: 10,marginLeft:5, marginTop: 10}}></View>
                    <Text style = {[styles.texInfo,{marginLeft: 5}]}>{orderStore.itemInfo[orderStore.itemInfo.length-1].phone}</Text>
                    </View>
                <View style = {styles.describeContainer}>
                    <Text style = {styles.textDescribe}>
                    {orderStore.itemInfo[orderStore.itemInfo.length-1].address} {orderStore.itemInfo[orderStore.itemInfo.length-1].addressWard} {orderStore.itemInfo[orderStore.itemInfo.length-1].addressDistrict} {orderStore.itemInfo[orderStore.itemInfo.length-1].addressCity}
                    </Text>
                </View>
                
            </View>

            <View style = {styles.deltaiCartContainer}>
                <View style = {styles.textCartContainer}>
                    <Text style = {styles.textCart}>Sản phẩm đã chọn</Text>  
                </View>
                <View>
                    {cartStore.items.map((e) => {
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
                            <Text>{formatCash(cartStore.CalculateTotal.toString())}đ</Text>
                        </View>
                        <View style={styles.lineStyle}></View>
                    </View>

                    <View style = {styles.textInfoContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10}}>
                            <Text style = {styles.textThanhTien}>Phí vận chuyển</Text>
                            <Text>{formatCash(orderStore.itemInfo[orderStore.itemInfo.length-1].feeDelivery.toString())}đ</Text>
                        </View>
                        <View style={styles.lineStyle}></View>
                    </View>

                    <View style = {styles.describeContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10}}>
                        <Text style = {{ fontSize: 14,fontWeight: '400',color: 'black'}}>Khuyến mãi</Text>
                        <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TextInput
                                placeholder="Nhập mã"
                                style={styles.TextInput}
                                value={codeDiscount}
                                onChangeText={setCodeDiscount}
                            />
                            <TouchableOpacity onPress={()=> {
                                onDiscount();
                                setRefreshKey(oldKey => oldKey +1)
                            }}>
                            <View style={styles.buttonCode}>
                                <Text style ={styles.textCode}>Áp dụng</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>

                    <View style = {styles.textInfoContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10}}>
                            <Text style = {styles.textThanhTien}>Tiền khuyến mãi</Text>
                            <Text>- {formatCash(discount.toString())}đ</Text>
                        </View>
                        <View style={styles.lineStyle}></View>
                    </View>

                    <View style = {styles.textInfoContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style = {[styles.textThanhTien, {fontWeight: '700'}]}>Số tiền thanh toán</Text>
                            <Text style = {{fontWeight: '700'}}>{formatCash((orderStore.itemInfo[orderStore.itemInfo.length-1].moneyFinal - discount).toString())}đ</Text>
                        </View>
                    </View>
            </View>

            <View style = {styles.deltaiOrderContainer}>
                <View style = {styles.textAddressContainer}>
                    <Text style = {styles.textAddress}>Thanh toán</Text>  
                </View>
                <View style={styles.wrapper}>
                {dataPay.map(fleeling => (
                    <TouchableOpacity key={fleeling.status}  onPress={()=> {
                        setMood(fleeling.status)
                        }}>
                        <View style ={{flexDirection: 'column', justifyContent: 'space-between', paddingTop: 5}}>
                            <View style = {styles.mood}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.outter}>
                                        {mood === fleeling.status && <View style={styles.innter}/>}
                                    </View>
                                    <Image style={{width:20, height: 20, marginLeft: 10}} source = {{uri: fleeling.image}} resizeMode={"cover"}/>
                                    {
                                        <Text style={styles.fleeling}>{fleeling.title}</Text>
                                    }
                                </View>
                                {/* <Text style={styles.fleeling}>{formatCash(fleeling.price.toString())}đ</Text> */}
                            </View>
                            <View style ={{opacity: 0.5, marginTop: 10,borderWidth: 0.3,borderColor:'#9E9E9E',}}></View>
                        </View>
                    </TouchableOpacity>

                    ))}
                </View>
            </View>

            <View style={{height: 50}}></View>
        </ScrollView>

        <View style={styles.payContainer}>
            <View style ={styles.payView}>
                <View style ={{}}>
                    <View style ={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color:'white'}}>Giao hàng</Text>
                        <View style ={{width: 5, height: 5, backgroundColor: 'white', borderRadius: 10,marginLeft:5}}></View>
                        <Text style={{color:'white',marginLeft: 5}}>{cartStore.count} sản phẩm</Text>
                    </View>
                    <Text style ={styles.textCode}>{formatCash((orderStore.itemInfo[orderStore.itemInfo.length-1].moneyFinal - discount).toString()) }đ</Text>
                </View>
                <Pressable onPress={() => onOrder()}>
                    <View style ={{paddingRight: 20, paddingLeft: 20, paddingBottom: 5, paddingTop: 5, backgroundColor: 'white', borderRadius: 12, elevation: 2}}>
                        <Text style ={{color: '#CD6600'}}>ĐẶT HÀNG</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    </View>
  )
}

export default observer(OrderConfirmation)

const styles = StyleSheet.create({
    payView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 20,
        alignItems: 'center',
        },

    payContainer: {
        paddingTop: 20,
        paddingBottom: 20,
         backgroundColor: '#CD6600',
        },

    fleeling:{
        marginLeft: 10,
        fontSize: 16,
        color: '#231F20',
    },

    innter:{
        width: 7,
        height: 7,
        backgroundColor: '#CD6600',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },

    outter:{
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: '#CD6600',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    mood:{
        marginTop: 7,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        height: 40,
        // backgroundColor: 'red',
    },
    wrapper:{
        paddingLeft: 10,
        paddingRight: 10,
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
        paddingTop: 10,
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