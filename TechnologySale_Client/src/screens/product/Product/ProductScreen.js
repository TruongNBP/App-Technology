import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, Pressable, Button, TouchableWithoutFeedback, TextInput,RefreshControl, ActivityIndicator} from 'react-native'
import React, { useEffect, useState ,useRef} from 'react'
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { getCategories } from '../ProductSevice';
import { cartStore } from '../../mobx/cart_store';
import { observer } from 'mobx-react';

const ProductScreen = (props) => {
  const { navigation } = props;
  const [categories, setCategories] = useState([]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    onGetCategory()
  }, []);

  const onGetCategory = async () => {
    getCategories()
      .then(res => {
        let data = res;
        setCategories(data);
        setIsLoading(false)
      })
      .catch(err => {});
 }

 const onRefresh = () =>{
  setIsLoading(true);
  onGetCategory()
}

 const scrollHandler = () => {
  // console.log(dataSourceCords.length, scrollToIndex);
  if (dataSourceCords.length > scrollToIndex) {
    ref.scrollTo({
      x: 0,
      y: dataSourceCords[scrollToIndex],
      animated: true,
    });
  }
};

//  console.log('cate=>>>' , categories)

  let [fontsLoaded, error] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_500Medium
  });

  if (!fontsLoaded) {
      return null;
  }

  const formatCash = (str) => {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
    })
  }


  // console.log('cofee ne========>', categories)

  const renderItemCategory = ({item,index}) => (
    // console.log('>>>>>>>>>>>', item),
    <TouchableOpacity onPress={()=> {
      setScrollToIndex(index)
      scrollHandler()
    }
    } style ={{paddingTop: 10,paddingBottom: 10,}}>
      <View style={styles.categoriesContainer}>
       <View style ={styles.imageCateContainer}>
        <Image style={styles.imageCategory} source={{ uri: item.image ? item.image : null}}
          resizeMode={"cover"}/>
       </View>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  
  
return (
  <View style = {styles.container}>
    <View style = {styles.headerContainer}>
        <View style= {styles.itemHeaderContainer}>
        <Text style={styles.textTitle}>Đặt hàng</Text>
           
            <View style={styles.iconCartContainer}>
                <View style ={{marginRight: 30}}>
                  <TouchableOpacity onPress={()=> navigation.navigate('SearchProduct')}>
                  <AntDesign name="search1" size={24} color="black" />
                  </TouchableOpacity>
                </View>

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
    </View>

    <ScrollView
    showsVerticalScrollIndicator ={false}
    style ={{backgroundColor: 'white'}}
    refreshControl={
      <RefreshControl
        refreshing={refresh}
        onRefresh={onRefresh}
      />
    }
    ref={(ref) => {
      setRef(ref);
    }}
    >
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        >
          <View>
              <FlatList
              data={categories}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderItemCategory}
              showsHorizontalScrollIndicator={false}
              numColumns={8/2}
            />
          </View>
      </ScrollView>
    </View>

      {
         isLoading ? 
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <ActivityIndicator size="large" color="#CD6600" />
         </View> :
         <View>
          {
            categories.map((e,index) => {
              return(
                <View
                key={index}
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;
                  dataSourceCords[index] = layout.y;
                  setDataSourceCords(dataSourceCords);
                  // console.log(dataSourceCords);
                  // console.log('height:', layout.height);
                  // console.log('width:', layout.width);
                  // console.log('x:', layout.x);
                  // console.log('y:', layout.y);
                }}
                >
                  <View style={styles.coffeTitleContainer}>
                  <Text style={styles.textcoffeTitle}>{e.name}</Text>
                  </View>
                  <View>
                    {
                      e.product.map(((pro) => {
                        if(pro.status == true){
                          return(
                            <Pressable key={pro._id} onPress={() => navigation.navigate('ProductDetail', {id: pro._id})} >
                              <View style ={styles.productContainer}>
                                <View style ={styles.product}>
                                  <View style={{flexDirection: 'row'}}>
                                      <View>
                                        <Image style={styles.imageProduct} source={{ uri: pro.image[0] ? pro.image[0] : null}}
                                        resizeMode={"cover"}/>
                                      </View>
                                      <View style ={styles.textProductContainer}>
                                        <Text numberOfLines={2} style={styles.textName}>{pro.name}</Text>
                                        <Text style={styles.textPrice}>{formatCash(pro.price+"")}đ</Text>
                                      </View>
                                      
                                  </View>
                                  <View></View>
                                </View>
                              </View>
                            </Pressable>
                          )
                        }

                      }))
                    }
                  </View>

                </View>
              )
            })
          }
        </View>
      }


    <View style ={{height: 20}}></View>
    </ScrollView>
  </View>
);
}

export default observer(ProductScreen)

const styles = StyleSheet.create({
  textPrice:{
    marginTop: 10,
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
  paddingTop: 10,
},

  imageProduct:{
    width: 120,
    height: 120,
    borderRadius: 15
  },

  product:{
  flexDirection: 'row',
  justifyContent: 'space-between'
  },

  productContainer:{
    paddingTop:20,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },

  textcoffeTitle:{
    fontSize:18,
    fontFamily: 'Montserrat_600SemiBold'
  },

  coffeTitleContainer:{
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },

  imageCateContainer:{
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    },

  imageCategory:{
    width: 45,
    height: 45,
    },

    text: {
      marginTop: 12.5,
      width: 86,
      textAlign: 'center',
      fontFamily: 'Montserrat_500Medium',
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "400",
      color: '#231F20'
  },

  categoriesContainer:{
      marginLeft: 10,
      // backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center'
  },

  titleText:{
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
    flexDirection :'row',
    alignItems: 'center',
    // backgroundColor: 'red'
},

textTitle:{
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
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
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
},
})