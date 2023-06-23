import { StyleSheet, Text, View, FlatList, Pressable,RefreshControl, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Entypo } from '@expo/vector-icons';
import history from '../../types/dataBuyingHistory';
import { getOrder, getOrderUser, getProfile } from '../../user/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
const BuyingHistory = (props) => {
    const { navigation } = props;
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState([]);
    useEffect(() => {
        setIsLoading(true)  
        onGetOrder()
      }, []);

    const onGetOrder = async () => {
        getOrder()
            .then(res => {
            let data = res;
            setOrder(data.order)
            setIsLoading(false)
            console.log('<<<<',res)
            })
            .catch(err => {
            });
      };

      const onRefresh = () =>{
      setIsLoading(true);
      onGetOrder()
    }
    //   console.log('>>>>>>>>>>><<<<<',order)

    let [fontsLoaded, error] = useFonts({
        Montserrat_600SemiBold,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_400Regular
    });

    if (!fontsLoaded) {
        return null;
    };

    const formatCash = (str) => {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        })
    }

    const renderItem = ({item}) => {
        return (
            <Pressable onPress={() => navigation.navigate("DetailHistory",{id:item._id})}>
                <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <View style={styles.productDateTime}>
                        <Text style={styles.productTime}>{moment(item.released).format('LT')}</Text>
                        <Text> - </Text>
                        <Text style={styles.productDate}>{moment(item.released).format('L')}</Text>
                    </View>
                    {
                        
                        item.status === "WAITING" ? <Text style={styles.productStatus}>Chờ xác nhận</Text> :
                        item.status === "PROCESSING" ? <Text style={styles.productStatus}>Đang thực hiện</Text> :
                        item.status === "CANCEL" ? <Text style={[styles.productStatus, { color: 'red' }]}>Đã hủy</Text> :
                        item.status === "COMPLETE" ? <Text style={[styles.productStatus]}>Đã hoàn tất</Text> :
                        <Text style={[styles.productStatus]}>Đang vận chuyển</Text>
                    }

                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.productPrice}>{formatCash(item.moneyFinal.toString())}đ</Text>
                </View>

            </View>
            </Pressable>
        )

    }

    return (
        <View>
            <Pressable onPress={() => navigation.goBack()} style={styles.appBarContainer}>
                <Entypo style={styles.back} name="chevron-left" size={18} color="black" />
                <Text style={styles.appBar}>Lịch sử đơn hàng</Text>
            </Pressable>
            <View style={styles.space}></View>
            {
                isLoading ? 
                <View style={{justifyContent: 'center', alignItems: 'center' , paddingTop: 20}}>
                <ActivityIndicator size="large" color="#CD6600" />
                </View> :
                <FlatList
                    bounces={false}
                    data={order}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
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
    )
}

export default BuyingHistory

const styles = StyleSheet.create({
    productPrice: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 15,
        color: 'grey'
    },
    rightContainer: {
        justifyContent: 'center'
    },
    productStatus: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 14,
        color: 'green'
    },
    productDate: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14
    },
    productTime: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14
    },
    productDateTime: {
        flexDirection: 'row',
        marginBottom: 5
    },
    productName: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
        marginBottom: 5
    },
    leftContainer: {
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 15,
        marginHorizontal: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    space: {
        height: 15
    },
    appBar: {
        position: 'absolute',
        bottom: 15,
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
    },
    back: {
        position: 'absolute',
        bottom: 15,
        left: 15
    },
    appBarContainer: {
        position: 'relative',
        backgroundColor: 'white',
        width: '100%',
        height: 75,
        alignItems: 'center'
    },
})