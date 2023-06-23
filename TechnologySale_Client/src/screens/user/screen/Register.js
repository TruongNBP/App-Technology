import React, { useState, useContext, createContext } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, ToastAndroid, TouchableOpacity, Dimensions, Alert, Modal } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { register } from "../UserService";
import { UserContext } from "../UserContext";

const Register = (props) => {

    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [visible, setVisible] = useState(true);
    const [visible2, setVisible2] = useState(true);

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
        }, 2500);
      };


    const onRegister = async () => {
        if (
          !email ||
          !password ||
          email.trim().length == 0 ||
          password.trim().length == 0 ||
          confirm_password.trim().length == 0
        ) {
            Alert.alert('Đăng kí', 'Vui lòng nhập đầy đủ thông tin', [
                {text: 'Xác nhận',}
              ])
          return;
        }else if (password != confirm_password) {
            Alert.alert('Đăng kí', 'Mật khẩu không khớp', [
                {text: 'Xác nhận',}
              ])
          return;
        }else{
            try {
                const res = await register(email, password, confirm_password);
                // ToastAndroid.show("Đăng kí thành công", ToastAndroid.CENTER);
                setConfirm_password('');
                setEmail('');
                setPassword('');
                showModal();
                navigation.navigate('Login')
                
            } catch (error) {
                
            }
            
        }
      };

    return (
        <ScrollView
            bounces={false}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Image style={styles.loginBanner} source={require('../../../assets/loginBanner.png')} resizeMode={"contain"} />
                <View style={styles.loginContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Đăng ký thành viên với</Text>
                        <Image style={styles.welcomeLogo} source={require('../../../assets/logo.png')} resizeMode={"contain"} />
                    </View>
                    <Pressable style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập username" 
                            value={email}
                            onChangeText={setEmail}
                            />
                    </Pressable>
                    <Pressable style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChangeText={setPassword}
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
                    <Pressable style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Xác nhận mật khẩu"
                            value={confirm_password}
                            onChangeText={setConfirm_password}
                            secureTextEntry={visible2}
                        />
                        <TouchableOpacity onPress={() => {
                            setShow2(!show2)
                            setVisible2(!visible2)
                        }}>
                            <MaterialCommunityIcons
                                name={show2 == false ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color={'#d9d9d9'} />
                        </TouchableOpacity>
                    </Pressable>
                    <TouchableOpacity style={styles.loginButton} onPress={()=> onRegister()}>
                        <Text style={styles.loginButtonText}>Đăng ký</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Bạn đã có tài khoản? </Text>
                        <Pressable onPress={() => navigation.goBack()} >
                            <Text style={[styles.registerText, { color: '#1776d4' }]}>Đăng nhập ngay</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop:45}}>
                    <View></View>
                    <View
                    style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 255,
                        height: 50,
                        borderRadius: 7,
                        elevation: 10,
                        flexDirection: 'row'
                    }}>
                    <Image style= {{width:20,height:20}} source={require("../../../assets/success-image.png")} />
                    <Text style={{fontSize: 14, fontFamily:'Montserrat_500Medium'}}>
                        Thêm tài khoản thành công
                    </Text>
                    </View>
                    <View></View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default Register

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
    loginIcon: {
        marginRight: 5
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
        marginTop: 15
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
