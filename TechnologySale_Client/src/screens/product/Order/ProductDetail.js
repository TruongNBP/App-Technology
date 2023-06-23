import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, Pressable, Button, TouchableWithoutFeedback, TextInput, Modal,ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import('../../mobx/cart_store')
import ModalView from "react-native-modal";
import { cartStore,CartItem } from '../../mobx/cart_store';
import { favoriteStore,FavoriteItem } from '../../mobx/favorite';
import { AntDesign } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { getProductId } from '../ProductSevice';


const ProductDetail = (props,route) => {
    const {navigation,route:{params: {id},},} = props
    const [mood, setMood] = useState('Vừa')
    const [finalPrice, setFinalPrice] = useState(35000)
    const [productDetail, setProductDetail] = useState();
    const [heart, setHeart] = useState(false)
    const [qwe, setQwe] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCart, setModalVisibleCart] = useState(false);
    const [modalVisibleFavorite, setModalVisibleFavorite] = useState(false);
    const [quantity, setQuatity] = useState(1);
    const [recordInput, setRecordIput] = useState('');
    const [recordInputUpdate, setRecordIputUpdate] = useState('');
    const [textLength, setTextLength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

        const toggleModal = () => {
            setModalVisible(!modalVisible);
        };

        useEffect(() => {
            setIsLoading(true)  
            onGetDetail();
          }, []);
    
        const onGetDetail = async () => {
        getProductId(id)
            .then(res => {
            let data = res;
            setProductDetail(data);
            setIsLoading(false)  
            })
            .catch(err => {
            });
        }

        if(!productDetail){
            return null
        }
        // console.log('===> detail', productDetail)
        // console.log('===> id', id)


      const formatCash = (str) => {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        })
      }

      const showModal = () => {
        setModalVisibleCart(true);
        setTimeout(() => {
          setModalVisibleCart(false);
        }, 1000);
      };

      const showModalFavorite = () => {
        setModalVisibleFavorite(true);
        setTimeout(() => {
            setModalVisibleFavorite(false);
        }, 1000);
      };


    const addToCart = (items:CartItem) => {
        if(productDetail){
        cartStore.addItem(items)
        }
    }

    const addToFavorite = (items:FavoriteItem) => {
        if(productDetail){
        favoriteStore.addItem(items)
        }
   }



    //   console.log('=====>', qwe)
    //  const renderGalleries = (e) =>{
    //     console.log(e.thumbnail)
    //     return(
    //        <TouchableOpacity onPress={()=> setQwe(e.thumbnail)}>
    //             <View>
    //                 <Text>{e.id}</Text>
    //                 <Image style={{width:300, height: 400}} source = {{uri: e.thumbnail}} resizeMode={"cover"}/>
    //                 </View>
    //        </TouchableOpacity>
    //     )
    //  }

        // console.log(data)
        // console.log('.....: ', recordInput)
         const renderRecord = (items) =>{
            return(
               <TouchableOpacity onPress={()=> setRecordIput(items.item.record)}>
                    <View style = {styles.goiY1Container}>
                        <Text style = {styles.textGoiY1}>{items.item.record}</Text>
                    </View>
               </TouchableOpacity>
            )
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
                <Text style={styles.textTitle}>Chi tiết sản phẩm</Text>
                {
                    cartStore.count > 0 ?
                    <View style={styles.iconCartContainer}>
                        <TouchableOpacity onPress={()=> navigation.navigate('CartProduct')}>
                            <View style={{paddingRight: 20}}>
                                <View style={styles.countCartContainer}>
                                    <Text style ={styles.textCountCart}>{cartStore.count.toString()}</Text>
                                </View>
                            </View>
                            <AntDesign name="shoppingcart" size={25} color="black" />
                        </TouchableOpacity>
                    </View> :
                    <View style={styles.iconCartContainer}>
                        <TouchableOpacity onPress={()=> navigation.navigate('CartProduct')}>
                        <AntDesign name="shoppingcart" size={25} color="black" />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
        <ScrollView>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    {
                        productDetail.image.map(((e) => {
                            // console.log('====>',e)
                            return(
                                <View key={e}>
                                    <Image style={{width:300, height: 400}} source = {{uri: e}} resizeMode={"cover"}/>
                                </View>
                            )
                        }))
                    }
                </View>
            </ScrollView>
                        
        <View style = {styles.deltaiContainer}>
            <View style = {styles.textNameContainer}>
                <Text numberOfLines={2} style = {styles.textName}>{productDetail.name}</Text>
                <View>
                    {
                        heart == false ?
                        <View>
                            <TouchableOpacity onPress={()=> {
                                setHeart(true)
                                    if(productDetail){
                                        const itemDetail: FavoriteItem = {
                                            product: productDetail,
                                            quantity: quantity
                                        }
                                        addToFavorite(itemDetail)
                                        showModalFavorite()
                                    }
                            }}>
                            <Ionicons name="ios-heart-outline" size={24} color="black" />
                        </TouchableOpacity>
                        </View>
                        :
                        <View>
                        <TouchableOpacity onPress={()=>setHeart(false)}>
                            <Ionicons name="ios-heart-sharp" size={24} color="red" />
                        </TouchableOpacity>
                        </View>
                        
                    
                    }
                </View>
                
            </View>

            <View style = {styles.textPriceContainer}>
            <Text style = {styles.textPrice}>{formatCash(productDetail.price.toString())}đ</Text>
            </View>

            <View style = {styles.describeContainer}>
                <Text style = {styles.textDescribe}>{productDetail.description}</Text>
            </View>
            
        </View>

        {/* <View style = {styles.SizeContainer}>
            <View style = {styles.textSizeContainer}>
                <View style = {{flexDirection: 'row'}}>
                  <Text style = {styles.textSize}>Size</Text>
                  <Text style = {{color:'red'}}>*</Text>
                </View>
                <View>
                    <Text>Chọn 1 loại size</Text>
                </View>

                <View style={styles.wrapper}>
                {item.size.map(fleeling => (
                    <TouchableOpacity key={fleeling.id}  onPress={()=> {
                        setMood(fleeling.title)
                        setFinalPrice(fleeling.price)
                        }}>
                        <View style ={{flexDirection: 'column', justifyContent: 'space-between'}}>
                            <View style = {styles.mood}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.outter}>
                                        {mood === fleeling.title && <View style={styles.innter}/>}
                                    </View>
                                    {
                                        <Text style={styles.fleeling}>{fleeling.title}</Text>
                                    }
                                </View>
                                <Text style={styles.fleeling}>{formatCash(fleeling.price.toString())}đ</Text>
                            </View>
                            <View style = {{paddingRight: 10, height: 8,}}>
                                <View style ={styles.lineStyle}></View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    ))}
                </View>
            </View>
        </View> */}
        <View style = {styles.recordContainer}>
            <View style = {styles.titleRecordContainer}>
                <View style = {styles.textTitleContainer}>
                    <Text style = {styles.textTitle}>Yêu cầu khác</Text>
                    <Text style = {styles.textTyChon}>Những tùy chọn khác</Text>
                </View>
               <View style = {{paddingTop: 20,paddingRight: 20,}}>
                <Pressable onPress={()=>setModalVisible(true)} >
                    <View style = {styles.recordTextContainer}>
                        {
                            recordInputUpdate == '' ?
                            <Text style = {styles.recordText}>Thêm ghi chú</Text>
                            :
                            <Text style = {styles.recordText}>{recordInputUpdate}</Text>
                        }
                    </View>
                </Pressable>
               </View>
            </View>
        </View>      
        <View style={{height: 100,}}></View>
        </ScrollView>

        <View>
            <ModalView
            animationIn={'fadeIn'}
            animationOut={'fadeOutDown'}
            transparent={true}
            onBackdropPress = {()=> setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection= {'down'}
             isVisible={modalVisible}
             >
                <View style={styles.modalContainer}>
                    <View style={styles.modelRecordContainer}>
                        <View style = {styles.modelTitleContainer}>
                            <Text style = {styles.textModelTitle}>Ghi chú</Text>
                        </View>

                        <View style = {styles.recordEditContainer}>
                        <TextInput
                            placeholder="Thêm ghi chú" style={styles.TextInput} 
                            multiline={true}
                            maxLength={50}
                            value= {recordInput}
                            onChangeText={text=>{
                                setRecordIput(text)
                                setTextLength(text.length)
                            }}
                            />
                        </View>

                        <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View></View>
                            <Text>{textLength}/50</Text>
                        </View>

                        {/* <View style ={styles.goiYContainer}>
                            <Text style = {styles.textTitleGoiY}>Gợi ý</Text>
                            <View style ={{flexDirection: 'row', paddingRight:10,alignItems:'center'}}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                >
                                    <FlatList
                                        data={data}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={renderRecord}
                                        showsHorizontalScrollIndicator={false}
                                        numColumns={8/2}
                                />
                                </ScrollView>
                            </View>
                        </View> */}
                        <View style = {styles.lineStyle}></View>
                        <View style = {{flexDirection: 'row', justifyContent: 'space-between',}}>
                            <View></View>
                           <TouchableOpacity onPress={() => {
                            setModalVisible(false)
                            setRecordIputUpdate(recordInput)
                           }}>
                           <View style = {{paddingRight: 10}}>
                                <Text style = {{color: '#CD6600', fontWeight: '600'}}>Xong</Text>
                            </View>
                           </TouchableOpacity>
                        </View>
                    </View>
                   
                </View>
                
            </ModalView>
        </View>

        <Modal
                animationType="fade"
                transparent
                visible ={modalVisibleCart}
                >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingTop: 55}}>
                    <View></View>
                    <View
                    style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 220,
                        height: 50,
                        borderRadius: 7,
                        elevation: 3,
                        flexDirection: 'row'
                    }}>
                    <Image style= {{width:20,height:20}} source={require("../../../assets/success-image.png")} />
                        <Text style={{fontSize: 14, fontFamily:'Montserrat_500Medium'}}>
                        Đã thêm vào giỏ hàng
                        </Text>
                    </View>
                    <View></View>
                </View>
        </Modal>

        <View>
        <Modal
                animationType="fade"
                transparent
                visible ={modalVisibleFavorite}
                >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingTop: 55}}>
                    <View></View>
                    <View
                    style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 220,
                        height: 50,
                        borderRadius: 7,
                        elevation: 3,
                        flexDirection: 'row'
                    }}>
                    <Image style= {{width:20,height:20}} source={require("../../../assets/success-image.png")} />
                    <Text style={{fontSize: 14, fontFamily:'Montserrat_500Medium'}}>
                    Đã thêm vào yêu thích
                    </Text>
                    </View>
                    <View></View>
                </View>
        </Modal>
        </View>
  
        <View style = {styles.footerContainer}>
            <View style = {styles.buttonContainer}>
                <View style = {styles.quantityContainer}>
                    <TouchableOpacity onPress={() => onNumberChange(false)}>
                        <View style = {styles.truQuantity}>
                            <Text style = {styles.textTru}>-</Text>
                        </View>
                    </TouchableOpacity>
                    <View style = {styles.quantity}>
                        <Text style = {styles.textQuantity}>{quantity}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onNumberChange(true)}>
                        <View style = {styles.congQuantity}>
                            <Text style = {styles.textCong}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    onPress={ () =>  {
                        if(productDetail){
                            const itemDetail: CartItem = {
                                product: productDetail,
                                quantity: quantity,
                                price: productDetail.price,
                                note: recordInput
                            }
                            addToCart(itemDetail)
                            showModal()
                        }
                    }}
                >
                <View style = {styles.button}>
                    <Text style = {styles.textButton}>Chọn {formatCash((quantity*productDetail.price).toString())}đ</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )

}

export default observer(ProductDetail)

const styles = StyleSheet.create({
    
    textGoiY1:{
        fontSize: 12,
        fontWeight: '400'
    },

    goiY1Container:{
       marginTop: 10,
       paddingTop: 3,
       paddingBottom: 3,
       paddingLeft: 10,
       paddingRight: 10,
       backgroundColor: '#EEEEEE',
       borderRadius: 7,
       marginLeft: 10,
    },

    textTitleGoiY:{
        fontWeight: '500',
        fontSize: 16,
    },

    goiYContainer:{

    },

    TextInput:{
        paddingRight:10,
        paddingLeft:10,
    },

    recordEditContainer:{
        paddingTop: 5,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 7,
        height: 60,
        borderColor: '#9E9E9E'
    },

    textModelTitle:{
        fontSize: 18,
        fontWeight: '400'
    },

    modelTitleContainer:{
        alignItems: 'center'
    },

    modelRecordContainer:{
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white'
    },

    modalContainer:{
         flex: 1,
         justifyContent: 'center' 
    },

    recordText:{
        color: '#9E9E9E'
    },

    recordTextContainer:{
        justifyContent: 'center',
        paddingLeft: 20,
        borderRadius: 7,
        height: 39,
        borderWidth: 1,
        borderColor: '#9E9E9E'
    },

    textTyChon:{
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.8)'
    },

    textTitle:{
        fontSize: 18,
        fontWeight: '500'
    },
    

    textTitleContainer:{
        
    },
    
    

    titleRecordContainer:{
        paddingLeft: 10,
    },  

    recordContainer:{
        marginTop: 10,
        paddingTop: 20,
        height: 140,
        backgroundColor: 'white'
    },

    textQuantity:{
        color: "#581B00",
        fontWeight: "700",
        lineHeight: 24,
        fontSize: 16,
        fontStyle: "normal",
    },
    textTru:{
        color: "white",
        fontWeight: "700",
        lineHeight: 24,
        fontSize: 16,
        fontStyle: "normal",
    },
    
    textCong:{
        color: "white",
        fontWeight: "700",
        lineHeight: 24,
        fontSize: 16,
        fontStyle: "normal",
    },
    
    quantity:{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        width: 30,
    },

    truQuantity:{
        width: 30,
        height: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CD6600'
    },
    congQuantity:{
        width: 30,
        height: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CD6600'
    },

    textButton:{
        color: "white",
        fontWeight: "700",
        lineHeight: 24,
        fontSize: 16,
        fontStyle: "normal",
    },

    button:{
        width: 189,
        height: 50,
        backgroundColor: '#CD6600',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityContainer:{
        width: 130,
        // backgroundColor: 'red',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight:10,
        paddingLeft: 10,
    },

    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 20,
    },

    footerContainer:{
        elevation: 5,
        height: 70,
       justifyContent: 'center',
        backgroundColor: 'white',
    },

    lineStyle:{
        opacity: 0.5,
        bottom: 25,
        marginTop: 40,
        borderWidth: 0.3,
        borderColor:'#9E9E9E',
    },
    fleeling:{
        marginLeft: 10,
        fontSize: 16,
        color: '#231F20',
    },

    innter:{
        width: 7,
        height: 7,
        backgroundColor: '#F7C33C',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },

    outter:{
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: '#F7C33C',
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
        marginTop: 10,
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

    textDescribe:{
        textTransform: 'lowercase',
        paddingTop: 10,
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.8)'
    },

    describeContainer:{
        paddingTop: 5,
        paddingRight: 20,
        paddingLeft: 10,
        paddingBottom: 10,
    },

    textPrice:{
        paddingTop: 10,
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.8)'
    },
    textPriceContainer:{
        paddingRight: 20,
        paddingLeft: 10,
    },
    textName:{
        width: 300,
        fontSize: 26,
        fontWeight: '500'
    },

    textNameContainer:{
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 10,
    },

    deltaiContainer:{
        height:210,
        backgroundColor:'white'
    },
    imageContainer:{
        flexDirection: 'row'
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

    textCountCart:{
        color: 'white',
        fontSize:10,
        fontWeight: '900'
    },

    countCartContainer:{
        width: 15,
        height: 15,
        borderRadius: 20,
        position: 'absolute',
        alignItems: 'center',
        bottom: -4,
        left: 15,
        backgroundColor: 'red'  
    },
    
    iconCartContainer:{
        justifyContent: 'center',
        alignItems: 'center',
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
        flexDirection: 'column', 
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: '#F9F6F6',
    },
})