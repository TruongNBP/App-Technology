import { StyleSheet, Text, View, Pressable, Image, Dimensions } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { favoriteStore } from '../../mobx/favorite';

const FavouriteProduct = (props) => {

    const { navigation } = props;

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

    return (
        <View>
            <Pressable onPress={() => navigation.goBack()} style={styles.appBarContainer}>
                <Entypo style={styles.back} name="chevron-left" size={18} color="black" />
                <Text style={styles.appBar}>Sản phẩm yêu thích</Text>
            </Pressable>
            <View style={styles.container}>
                {
                    favoriteStore.items.map(((e) => {
                        return(
                            <Pressable key ={e.product._id} onPress={() => navigation.navigate('ProductDetail', {id: e.product._id})}>
                                <View style={styles.productContainer} >
                                <Image style={styles.productImage} source={{uri: e.product.image[0]}} resizeMode={'cover'} />
                                <View style={styles.productText}>
                                    <Text numberOfLines={1} style={styles.productName}>{e.product.name}</Text>
                                    <Text style={styles.productPrice}>{formatCash(e.product.price.toString())}đ</Text>
                                </View>
                            </View>
                            </Pressable>
                        )
                        
                    }))
                }
                
                
            </View>
        </View>
    )
}

export default FavouriteProduct

const styles = StyleSheet.create({
    productPrice: {
        paddingTop:8,
        fontFamily:'Montserrat_400Regular',
        fontSize:14
    },
    productName: {
        paddingTop:8,
        fontFamily:'Montserrat_600SemiBold',
        fontSize:14
    },
    productText: {
        paddingLeft:15,
        width: Dimensions.get('window').width - 140
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius:8
    },
    productContainer: {
        flexDirection: 'row',
        paddingHorizontal:15,
        paddingTop:15
    },
    container: {
        height: '100%',
        backgroundColor: 'white'
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
        alignItems: 'center',
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1
    },
})