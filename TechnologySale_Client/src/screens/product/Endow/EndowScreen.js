import { StyleSheet, Text, View, Pressable, Image, ScrollView, Dimensions, FlatList ,RefreshControl, ActivityIndicator} from 'react-native';
import React,{useState,useEffect,useContext} from 'react'
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { getVoucher } from '../ProductSevice';
import { Feather } from '@expo/vector-icons'; 
const EndowScreen = (props) => {

  const { navigation } = props;
  const [endow, setEndow] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    onGetEndow()
  }, []);
  const onGetEndow = async () => {
    getVoucher()
      .then(res => {
        let data = res;
        setEndow(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('ErorrGetVoucher: ', err)
      });
 }
 const onRefresh = () =>{
  setIsLoading(true);
  onGetEndow();
}

 console.log(endow)

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
  console.log(endow)

  const renderItem = ({item}) => {
    return (
        <Pressable style={{marginTop: 10}} onPress={()=> navigation.navigate("DetailEndow",{id: item._id})}>
            <Image style={{position: 'absolute'}} source={require('../../../assets/group_endow01.png')}/>
            <View style={styles.endowContainer}>
            
            <View style={styles.endowTextContainer}>
              <View>
                <View style= {{flexDirection: 'row'}}>
                  <Feather name="clock" size={20} color="black" />
                  <Text style={styles.endowText}>Hết hạn: {item.end_date}</Text>
                </View>
                <Text style={styles.endowTextPrice}>{formatCash(item.discount.toString())}đ</Text>
              </View>
              <Text style={styles.endowText}>{item.body}</Text>
            </View>
            {/* <Image style={styles.endowImage} source={{ uri: item.image ? item.image : null}} resizeMode={'cover'} /> */}
          </View>
          </Pressable>
    )
  }

  return (
    <View>
      <View style={styles.appBarContainer}>
        <Text style={styles.appBar}>Phiếu ưu đãi của bạn</Text>
      </View>
      <View style={styles.container}>
      <View style ={{paddingLeft: 20}}>
       <Text style={styles.readyText}>Sẵn sàng sử dụng</Text>
      </View>
        {
           isLoading ? 
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <ActivityIndicator size="large" color="#CD6600" />
           </View> :
           <View style ={{alignItems: 'center'}}>
              <FlatList
                   bounces={false}
                   keyExtractor={(item) => item._id.toString()}
                   renderItem={renderItem}
                   data={endow}
                   showsVerticalScrollIndicator={false}
                   refreshControl={
                     <RefreshControl
                       refreshing={refresh}
                       onRefresh={onRefresh}
                     />
                   }
                 />
            </View>
        }
{/* 
          <Pressable >
            <Image style={{position: 'absolute'}} source={require('../../../assets/group_endow01.png')}/>
            <View style={styles.endowContainer}>
            
            <View style={styles.endowTextContainer}>
              <View>
                <View style= {{flexDirection: 'row'}}>
                  <Feather name="clock" size={20} color="black" />
                  <Text style={styles.endowText}>Hết hạn 17/01/2002</Text>
                </View>
                <Text style={styles.endowTextPrice}>{formatCash(611125+"")}đ</Text>
              </View>
              <Text style={styles.endowText}>dsafdsass</Text>
            </View>
            <Image style={styles.endowImage} source={require('../../../assets/tra_dao.jpg')} resizeMode={'cover'} />
          </View>
          </Pressable> */}
      </View>
    </View>
  )
}

export default EndowScreen

const styles = StyleSheet.create({
  endowTextPrice:{
    marginTop: 10,
    marginLeft: 5,
    fontFamily: 'Montserrat_500Medium',
    fontSize: 20
  },

  endowText: {
    marginLeft: 5,
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14
  },
  endowTextContainer: {
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  endowImage: {
    width: 70,
    height: 70
  },
  endowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'white',
    height: 150,
    width: 305,
    borderRadius: 10,
    padding: 20
  },
  readyText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 15
  },
  container: {
    width: '100%',
    // backgroundColor: 'red'
  },
  appBar: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
  },
  appBarContainer: {
    position: 'relative',
    backgroundColor: 'white',
    width: '100%',
    height: 75
  },
})