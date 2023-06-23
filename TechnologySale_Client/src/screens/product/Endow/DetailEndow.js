import { StyleSheet, Text, View,TouchableOpacity, Image, FlatList,ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { observer } from 'mobx-react';
import { cartStore } from '../../mobx/cart_store';
import { getVoucherId } from '../ProductSevice';

const DetailEndow = (props,route) => {
  const {navigation,route:{params: {id},},} = props
  const [endowDetail, setEndowtDetail] = useState();
  useEffect(() => {
    // setIsLoading(true)  
    onGetDetail();
  }, []);

const onGetDetail = async () => {
getVoucherId(id)
    .then(res => {
    let data = res;
    setEndowtDetail(data);
    // setIsLoading(false)  
    })
    .catch(err => {
    });
}

const formatCash = (str) => {
  return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
  })
}

let [fontsLoaded, error] = useFonts({
  Montserrat_600SemiBold,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_400Regular
});

if (!fontsLoaded) {
  return null;
};

if(!endowDetail){
    return null
}
  return (
    <View style ={ styles.container}>
      <View style = {styles.headerContainer}>
          <View style= {styles.itemHeaderContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.textTitle}>Chi tiết ưu đãi</Text>
              <View>
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
        </View>

        <View style={{alignItems: 'center', marginTop: 70, justifyContent: 'space-between', height: 383, paddingBottom: 10, paddingTop: 20}}>
            <Image style={{position: 'absolute',}} source={require('../../../assets/group_endow02.png')}/>
            <View>
              <View style={{alignItems: 'center'}}>
                <Image style={{width: 250, height: 130, borderRadius: 7}} source={{ uri: endowDetail.image }}
                resizeMode={'cover'} />
              </View>

              <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center'}}>
                  <Text style ={{fontSize: 12, fontFamily: 'Montserrat_500Medium', marginTop: 16}}>{endowDetail.body}</Text>
                  <View style ={{marginTop: 10,borderWidth: 0.3,borderColor:'white',}}></View>
                  <Text style ={{fontSize: 15, fontFamily: 'Montserrat_600SemiBold', marginTop: 0,  }}>Ưu đãi: {formatCash(endowDetail.discount.toString())}đ</Text>
                  <Text style ={{fontSize: 18,  fontFamily:'Montserrat_700Bold', marginTop: 40,  }}>CODE: {endowDetail.code}</Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                <Text style={{fontWeight: '500'}}>Ngày hết hạn: </Text>
                <Text style={{color: 'red', fontFamily:'Montserrat_600SemiBold'}}>{endowDetail.end_date}</Text>
            </View>
            
        </View>
    </View>
  )
}

export default observer(DetailEndow)

const styles = StyleSheet.create({
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
    width: "100%",
    height: "100%",
    backgroundColor: "#F9F6F6",
    flexDirection: 'column'
},
})