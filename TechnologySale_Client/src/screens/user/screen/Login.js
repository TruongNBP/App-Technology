import React, { useState, useContext, createContext } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, ToastAndroid, TouchableOpacity, Dimensions,Modal,Alert } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { navigation } = props;
    const { onLogin } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);

    let [fontsLoaded, error] = useFonts({
        Montserrat_600SemiBold,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_400Regular
    });

    if (!fontsLoaded) {
        return null;
    };

     const showModal = () => {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1500);
      };

    const login = async () => {
        if (
          !email ||
          !password ||
          email.trim().length == 0 ||
          password.trim().length == 0
        ) {
          //ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.CENTER);
          Alert.alert('Đăng nhập', 'Vui lòng nhập đầy đủ thông tin', [
            {text: 'Xác nhận',}
          ])
          return;
        }else{
            // const token = await AsyncStorage.getItem('token');
            const res = onLogin(email, password);
            // console.log('dsasad', token)
            // if(token != null) return showModal();
        }
      };
    return (
        <ScrollView
            bounces={false}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Image style={styles.loginBanner} source={require('../../../assets/loginBanner.png')} resizeMode={"contain"}  />
                <View style={styles.loginContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Chào mừng bạn đến với</Text>
                        <Image style={styles.welcomeLogo} source={require('../../../assets/logo.png')} resizeMode={"contain"} />
                    </View>
                    <Pressable style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập username"
                            onChangeText={setEmail}
                            value ={email}
                             />
                    </Pressable>
                    <Pressable style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập mật khẩu"
                            onChangeText={setPassword}
                            value ={password}
                            secureTextEntry={visible}
                        />
                        <TouchableOpacity onPress={() => {
                            setShow(!show)
                            setVisible(!visible)
                        }}>
                            <MaterialCommunityIcons
                                name={show == false ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color={'#d9d9d9'} />
                        </TouchableOpacity>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                    </Pressable>
                    <TouchableOpacity style={styles.loginButton} onPress={()=> login()}>
                        <Text style={styles.loginButtonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
                        <Pressable onPress={() => navigation.navigate('Register')}>
                            <Text style={[styles.registerText, { color: '#1776d4' }]}>Đăng ký</Text>
                        </Pressable>
                    </View>
                    {/* <View style={styles.orContainer}>
                        <View style={styles.orLine}></View>
                        <Text style={styles.orText}>HOẶC</Text>
                        <View style={styles.orLine}></View>
                    </View>
                    <Pressable style={[styles.loginButton, { backgroundColor: '#1776d4' }]}>
                        <FontAwesome5 style={styles.loginIcon} name="facebook" size={18} color="white" />
                        <Text style={styles.loginButtonText}>Tiếp tục bằng Facebook</Text>
                    </Pressable>
                    <Pressable style={[styles.loginButton, { backgroundColor: 'white', borderColor: 'grey', borderWidth: 1 }]}>
                        <Image style={[{ width: 18, height: 18 }, styles.loginIcon]} source={require('../../assets/logogoogle.png')} />
                        <Text style={[styles.loginButtonText, { color: 'black' }]}>Tiếp tục bằng Google</Text>
                    </Pressable> */}
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop:660}}>
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
                        Đăng nhập thành công
                    </Text>
                    </View>
                    <View></View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default Login

const styles = StyleSheet.create({
    registerText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    forgotPassword: {
        marginHorizontal: 30,
        marginTop: 10,
        color: '#1776d4',
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14
    },
    loginIcon: {
        marginRight: 5
    },
    orText: {
        color: 'grey',
        marginHorizontal: 15,
        fontFamily: 'Montserrat_500Medium',
        fontSize: 12
    },
    orLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        width: 100,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 25
    },
    loginButtonText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: 'white'
    },
    loginButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#CD6600',
        padding: 15,
        marginHorizontal: 30,
        marginTop: 30,
        borderRadius: 8
    },
    inputText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        width: 250,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        padding: 15,
        marginHorizontal: 30,
        marginTop: 10,
        borderRadius: 8
    },
    welcomeLogo: {
        width: 150,
        height: 75,
        marginTop: 15,
    },
    welcomeText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14
    },
    welcomeContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    loginContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        marginTop: ((Dimensions.get('window').height / 10) * 3) - 20
    },
    loginBanner: {
        width: '100%',
        height: '35%'
    },
    container: {
        width: '100%',
        height: '100%',
        position: 'relative'
    }
});
