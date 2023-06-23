import React, {useState, createContext,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, logout, register } from './UserService';
import { Alert, ToastAndroid } from 'react-native';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { children } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = async (email, password) => {
    try {
      const res = await login(email, password);

      if(res.status == false){
        Alert.alert('Đăng nhập', 'Tài khoản hoặc mật khẩu không đúng', [
          {text: 'Xác nhận',}
        ])
      }
      if (res && res.token) {
        await AsyncStorage.setItem('token', res.token);
        await AsyncStorage.setItem('userId', res.result._id);
        const id = await AsyncStorage.getItem('userId');
        setIsLoggedIn(true);
        return;
      }

    } catch (error) {
      console.log("onLogin error", error);
    }
  };

  const onRegister = async (email, password, confirm_password) => {
    try {
      const res = await register(email, password, confirm_password);
      return res.status;
    } catch (error) {
      console.log("onRegister error", error);
    }
  };

  const onPostLogout = async () => {
    try {
      const res = await logout();
       AsyncStorage.removeItem('token')
        const token = await AsyncStorage.getItem('token');
        console.log('Logout----------->',token );
        setIsLoggedIn(false);
        console.log(res)
        return;
    } catch (error) {
      console.log("onLogout error", error);
    }
  };

  const checkLogin = async () =>{
    try {
      if(await AsyncStorage.getItem('token')){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  
  useEffect(() => {
    checkLogin();
  },[]);

  return (
    <UserContext.Provider
      value={{
        onLogin,
        onRegister,
        onPostLogout,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


