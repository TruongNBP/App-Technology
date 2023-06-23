import { StyleSheet, Text, View,TouchableOpacity,TextInput,FlatList,Image,Pressable, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { getSearch } from '../ProductSevice'
const SearchProduct = (props) => {
    const [search, setSearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {navigation} = props;

    useEffect(() => {
      setIsLoading(true)  
        onGetSearch();
      }, [searchTerm]);

      const onGetSearch = async () => {  
       getSearch(searchTerm)
       .then(res => {
         let data = res;
           setSearch(data);
           setIsLoading(false)
       })
       .catch(err => {
         setError(err)
         console.log('Error Search ne: ', err)
       });
    }

    const onRefresh = () =>{
      setIsLoading(true);
      onGetSearch()
    }

    const formatCash = (str) => {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        })
      }

    const renderItem = ({item}) => {
        return(
            <View style ={styles.flalistContainer}>
                <Pressable onPress={() => navigation.navigate('ProductDetail', {id: item._id})} >
                    <View style ={styles.productContainer}>
                        <View style ={styles.product}>
                          <View style={{flexDirection: 'row'}}>
                              <View>
                                  <Image style={styles.imageProduct} source={{ uri: item.image[0]}}
                                  resizeMode={"cover"}/>
                              </View>
                              <View style ={styles.textProductContainer}>
                                  <Text numberOfLines={2} style={styles.textName}>{item.name}</Text>
                                  <Text style={styles.textPrice}>{formatCash(item.price+"")}đ</Text>
                              </View>
                          </View>
                          <View></View>
                        </View>
                    </View>
                </Pressable>
            </View>
        )
    }

//   console.log('seachr+++>>>', search)
  return (
    <View style={styles.container}>
        <View style = {styles.headerContainer}>
            <View style={styles.searchContainer}>
                <View style ={{flexDirection: 'row', alignItems: 'center', paddingLeft: 30,
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: "#DDDDDD",
                                width: 320,
                                borderRadius: 7,
                                paddingRight:10,
                                justifyContent: 'space-between'}}>
                   <View style={styles.textInputContainer}>
                        <TouchableOpacity onPress={()=>onGetSearch()}>
                                <View style={styles.searchIcon}>
                                    <AntDesign name="search1" size={18} color="black" />
                                </View>
                            </TouchableOpacity>
                        
                            <TextInput
                                style={styles.textInput}
                                placeholder="Từ khóa tìm kiếm"
                                value={searchTerm}
                                onChangeText={(e) => {
                                    setSearchTerm(e)
                                    console.log(e);
                                }}
                            />
                   </View>
                     {
                        searchTerm == '' ? null :
                        <TouchableOpacity onPress={()=> setSearchTerm("")}>
                         <AntDesign name="closecircle" size={16} color="#AAAAAA" />
                        </TouchableOpacity>
                     }
                </View>
               
                <View>
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Text style={{color: '#CD6600', fontWeight: '600', fontSize: 14}}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
            <View style={{paddingBottom: 20}}>
              {
                isLoading ? 
                <View style={{justifyContent: 'center', alignItems: 'center' , paddingTop: 20}}>
                <ActivityIndicator size="large" color="#CD6600" />
                </View> :
                <FlatList
                bounces={false}
                data={search}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator = {false}
                style={{ marginBottom: 90 }}
                refreshControl={
                  <RefreshControl
                    refreshing={refresh}
                    onRefresh={onRefresh}
                  />
                }
                />
              }
            </View>
    </View>
  )
}

export default SearchProduct

const styles = StyleSheet.create({
    flalistContainer:{
        paddingTop: 10,
        paddingBottom: 10
        // backgroundColor: 'red',
    },

    textPrice:{
        marginTop: 10,
        fontSize:14,
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
        borderRadius: 7
      },
    
      product:{
      flexDirection: 'row',
      justifyContent: 'space-between'
      },
    
      productContainer:{
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        // backgroundColor: 'red'
      },

      searchIcon: {

      },
    
      textInput: {
        marginLeft: 10,
        // backgroundColor: 'red'
      },
    
      textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
        width: 250,
      },

      searchContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center'
      },
    
    headerContainer:{
        width: '100%',
        height: 110, 
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowOpacity: 0.15,
        elevation: 2,
        justifyContent: 'center',
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 20
    },

    container:{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
})