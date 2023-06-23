import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React from 'react'
import { cartStore } from "../../mobx/cart_store";

const OrderSuccess = (props) => {
    const {navigation} = props;
  return (
    <View style = {styles.container}>
       <View style = {styles.headerContainer}>
        </View>
      <View style={styles.successContainer}>
        <Image style={styles.imageSuccess} source={require("../../../assets/datHang1.png")} />
        <Text style={styles.textSuccess}>Đặt hàng thành công</Text>
        <View style={styles.textContentContainer}>
            <Text style={styles.textContent}>Hệ thống đã lưu đơn của bạn</Text>
            <Text style={styles.textContent}>Cảm ơn bạn đã sử dụng dịch vụ của Technology.</Text>
            <Text style={styles.textContent}>Để theo dõi trạng thái đơn, bạn có thể xem tại trang</Text>
            <Text style={styles.textContent}>lịch sử mua hàng.</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("CartProduct")
              cartStore.delteteItem();
              }}>
                <View style={styles.buttonBack}>
                <Text style={styles.textBack}>Về giỏ hàng</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate("BuyingHistory")
              cartStore.delteteItem();
              }}>
                <View style={styles.buttonNext}>
                <Text style={styles.textNext}>Xem lịch sử mua hàng</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default OrderSuccess

const styles = StyleSheet.create({

    textNext: {
        color: "white",
        fontWeight: "700",
        lineHeight: 24,
        fontSize: 16,
        fontStyle: "normal",
        display: "flex",
        flexGrow: 0,
    },

    textBack: {
          color: "#CD6600",
          fontWeight: "700",
          lineHeight: 24,
          fontSize: 16,
          fontStyle: "normal",
          display: "flex",
          flexGrow: 0,
      },
      buttonNext:{
        marginTop: 20,
        width: 364,
        height: 50,
        backgroundColor: "#CD6600",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
      },
      
      buttonBack:{
        width: 364,
        height: 50,
        backgroundColor: "white",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#CD6600',
        borderWidth: 1
      },
      buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 90,

      },

    textContent:{
        textAlign: 'center',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 23.45,
        color: 'black',
    },

    textContentContainer:{
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textSuccess:{
        marginTop: 25,
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 23.45,
        color: 'black'
    },

    imageSuccess:{
        width: 100,
        height: 100,
    },

    successContainer:{
        marginTop: 120,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    
    // headerContainer:{
    //     width: '100%',
    //     height: 35, 
    //     backgroundColor: '#FFA500',
    //     shadowColor: "#000",
    //     shadowOffset: {
    //     width: 0,
    //     height: 1
    //     },
    //     shadowOpacity: 0.15,
    //     elevation: 1,
    //     justifyContent: 'center',
    // },
    container: {
        width: '100%',
        height: '100%',
    },
})