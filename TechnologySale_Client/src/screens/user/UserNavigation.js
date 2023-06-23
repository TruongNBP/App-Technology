import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import  Login  from './screen/Login';
import  Register  from './screen/Register';
import ForgotPassword from './screen/ForgotPassword';

export const UserNavigation = (props) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component ={Login} />
            <Stack.Screen name="Register" component ={Register} />
            <Stack.Screen name="ForgotPassword" component ={ForgotPassword} />
        </Stack.Navigator>
       
    )
}

