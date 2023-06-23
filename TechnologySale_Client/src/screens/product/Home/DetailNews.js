import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { WebView } from 'react-native-webview';
export const height = Dimensions.get('window').height;
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getNewsId } from '../../user/UserService';
const DetailNews = (props,route) => {
    const {navigation,route:{params: {id},},} = props
    const [newskDetail, setNewsDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true)  
        onGetDetailNews();
      }, []);

      const onGetDetailNews = async () => {
        getNewsId(id)
          .then(res => {
            let data = res;
            setNewsDetail(data);
            setIsLoading(false)  
          })
          .catch(err => {
          });
     }

     if(!newskDetail) return null;
    //  console.log('>>>>> deitail news', newskDetail);
    
  return (
        <View style = {styles.container}>
           <View style = {styles.headerContainer}>
            <View style= {styles.itemHeaderContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Ưu đãi đặt biệt</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="share-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
           </View>
           {
                isLoading ? 
                <View style={{justifyContent: 'center', alignItems: 'center' , paddingTop: 20}}>
                <ActivityIndicator size="large" color="#CD6600" />
                </View> :
                <View>
                    <ScrollView
                    style={{ paddingTop:3}}
                    >
                    <WebView style={{height: height}} source={{ uri: newskDetail.body }}/>
                    </ScrollView>
                </View>
            }

           <View>
           </View>
        </View>
    
  )
}

export default DetailNews

const styles = StyleSheet.create({
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
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent:'space-between',
        backgroundColor: 'white',
    },
})