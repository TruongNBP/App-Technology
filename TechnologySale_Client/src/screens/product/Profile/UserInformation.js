import { StyleSheet, Text, View, Pressable, ScrollView, Image, TextInput, Alert, TouchableOpacity,Modal } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Entypo, AntDesign } from '@expo/vector-icons';
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile, updateProfile } from '../../user/UserService';
import { height } from '../Home/DetailNews';

const UserInformation = (props) => {
    const { navigation } = props;
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        onGetProfile()
      }, [refreshKey]);

    const onGetProfile = async () => {
        getProfile()
            .then(res => {
            let data = res;
            setProfile(data);
            setName(data.name)
            setPhone(data.phone)
            
            })
            .catch(err => {
            });
      };


      const updateUser = async () => {
        try {
            if (
                !name ||
                !phone ||
                name.trim().length == 0 ||
                phone.trim().length == 0 
              ) {
                  Alert('Vui lòng nhập đầy đủ thông tin')
                return;
              }else{
                const res = await updateProfile(name,phone)
                showModal()
                setRefreshKey(oldKey => oldKey +1)
                console.log(res)
              }
          

        } catch (error) {
            console.log("onUpdateProfile error", error);
            }
      };

      const showModal = () => {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      };


    let [fontsLoaded, error] = useFonts({
        Montserrat_600SemiBold,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_400Regular
    });

    if (!fontsLoaded) {
        return null;
    };

    if(!profile) return null


    console.log(profile)
    // console.log(profile.order.map((e) => e.id))
    return (
        <View style={styles.inforContainer}>
            <Pressable onPress={() => navigation.goBack()} style={styles.appBarContainer}>
                <Entypo style={styles.back} name="chevron-left" size={18} color="black" />
                <Text style={styles.appBar}>Cập nhật thông tin</Text>
            </Pressable>

            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require('../../../assets/IphoneHi.png')} resizeMode={'cover'} />
                    </View>
                    <TextInput style={styles.input}
                        placeholder="Nhập họ tên"
                        onChangeText={setName}
                        value ={name}
                    />
                    <TextInput style={styles.input}
                        placeholder="Nhập số điện thoại"
                        onChangeText={setPhone}
                        keyboardType = 'number-pad'
                        value ={phone}
                    />

                    {/* <TextInput style={styles.input}
                        keyboardType = 'number-pad'
                        placeholder="Nhập tuổi"
                        onChange={setAge}
                        
                        value ={age}
                    /> */}

                    {/* <TextInput editable={false} style={styles.disableInput}>thucmien2002@gmail.com</TextInput>
                    <Pressable style={[styles.disableInput, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <TextInput style={{
                            fontFamily: 'Montserrat_400Regular',
                            fontSize: 14
                        }} editable={false}>08/01/2002</TextInput>
                        <Entypo name="calendar" size={18} color="grey" />
                    </Pressable>
                    <View style={styles.pickerContainer}>
                        <RNPickerSelect
                            style={pickerSelectStyles}
                            placeholder={{ label: "Giới tính của bạn?", value: null }}
                            onValueChange={(value) => console.log(value)}
                            items={[
                                { label: "Nam", value: "Nam" },
                                { label: "Nữ", value: "Nữ" },
                                { label: "Khác", value: "Khác" },
                            ]}
                        />
                        <Entypo style={styles.icon} name="chevron-down" size={18} color="gray" />
                    </View> */}
                    <TouchableOpacity style={styles.updateButton} onPress={()=> updateUser()}> 
                        <Text style={styles.updateText}>Cập nhật tài khoản</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                animationType="fade"
                transparent ={true}
                visible={modalVisible}
                transparent={true}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop:45}}>
                    <View></View>
                    <View
                    style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 200,
                        height: 50,
                        borderRadius: 7,
                        elevation: 10,
                        flexDirection: 'row'
                    }}>
                    <Image style= {{width:20,height:20}} source={require("../../../assets/success-image.png")} />
                    <Text style={{fontSize: 14, fontFamily:'Montserrat_500Medium'}}>
                        Cập nhật thành công
                    </Text>
                    </View>
                    <View></View>
                </View>
            </Modal>
            </ScrollView>
            {/* <View style={styles.deleteAccount}>
                <AntDesign name="delete" size={18} color="gray" />
                <Text style={styles.deleteText}>Xóa tài khoản</Text>
            </View> */}
        </View>
    )
}

export default UserInformation

const styles = StyleSheet.create({
    deleteText: {
        marginLeft: 10,
        fontFamily:'Montserrat_400Regular',
        fontSize:14
    },
    deleteAccount: {
        position: 'absolute',
        bottom: 75,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15
    },
    inforContainer: {
        position: 'relative',
        backgroundColor: 'white',
        height: '100%'
    },
    updateText: {
        color: 'white',
        fontFamily:'Montserrat_400Regular',
        fontSize:14
    },
    updateButton: {
        backgroundColor: '#CD6600',
        padding: 15,
        marginHorizontal: 15,
        marginTop: 30,
        borderRadius: 10,
        alignItems: 'center'
    },
    pickerContainer: {
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        right: 30,
        bottom: 15
    },
    disableInput: {
        backgroundColor: '#d9d9d9',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginHorizontal: 15,
        marginBottom: 15,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14
    },
    input: {
        borderColor: '#d9d9d9',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginHorizontal: 15,
        marginBottom: 15,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 60
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingBottom: 200
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
        alignItems: 'center',
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginHorizontal: 15,
        fontSize: 14,
        padding: 15,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        fontFamily:'Montserrat_400Regular',
        fontSize:14 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginHorizontal: 15,
        fontSize: 14,
        padding: 15,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        fontFamily:'Montserrat_400Regular',
        fontSize:14 // to ensure the text is never behind the icon
    }
});