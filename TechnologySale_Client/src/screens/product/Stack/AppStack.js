import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import DetailNews from '../Home/DetailNews';
import HomeScreen from '../Home/HomeScreen';
import ProductDetail from '../Order/ProductDetail';
import CartProduct from '../Order/CartProduct';
import ProductScreen from '../Product/ProductScreen';
import OrderConfirmation from '../Order/OrderConfirmation';
import Contact from '../Profile/Contact';
import Feedback from '../Profile/Feedback';
import BuyingHistory from '../Profile/BuyingHistory';
import FavouriteProduct from '../Profile/FavouriteProduct';
import UserInformation from '../Profile/UserInformation';
import ProfileScreen from '../Profile/ProfileScreen';
import SearchProduct from '../Product/SearchProduct';
import PaymentAddress from '../Order/PaymentAddress';
import OrderSuccess from '../Order/OrderSuccess';
import DetailHistory from '../Profile/DetailHistory';
import UserConfirm from '../Profile/UserConfirm';
import EndowScreen from '../Endow/EndowScreen';
import DetailEndow from '../Endow/DetailEndow';
const RootStack = createStackNavigator();

export const HomeStack = () => {
    return (
            <RootStack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeScreen">
                <RootStack.Screen name="HomeScreen" component={HomeScreen} />
                <RootStack.Screen name="DetailNews" component={DetailNews} />
                <RootStack.Screen name="ProductDetail" component={ProductDetail} />
                <RootStack.Screen name="CartProduct" component={CartProduct} />
                <RootStack.Screen name="OrderConfirmation" component={OrderConfirmation} />
                <RootStack.Screen name="PaymentAddress" component={PaymentAddress} />
                <RootStack.Screen name="OrderSuccess" component={OrderSuccess} />
                <RootStack.Screen name='BuyingHistory' component={BuyingHistory} />
                <RootStack.Screen name="DetailHistory" component={DetailHistory} />
                
            </RootStack.Navigator>
    )
}

export const ProductStack = () => {
    return (
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                <RootStack.Screen name="ProductScreen" component={ProductScreen} />
                <RootStack.Screen name="ProductDetail" component={ProductDetail} />
                <RootStack.Screen name="CartProduct" component={CartProduct} />
                <RootStack.Screen name="SearchProduct" component={SearchProduct} />
                <RootStack.Screen name="OrderConfirmation" component={OrderConfirmation} />
                <RootStack.Screen name="PaymentAddress" component={PaymentAddress} />
                <RootStack.Screen name="OrderSuccess" component={OrderSuccess} />
                <RootStack.Screen name='BuyingHistory' component={BuyingHistory} />
                <RootStack.Screen name="DetailHistory" component={DetailHistory} />
            </RootStack.Navigator>
    )
}

export const AccountStack = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }} >
            <RootStack.Screen name='ProfileScreen' component={ProfileScreen} />
            <RootStack.Screen name='Contact' component={Contact} />
            <RootStack.Screen name='Feedback' component={Feedback} />
            <RootStack.Screen name='BuyingHistory' component={BuyingHistory} />
            <RootStack.Screen name='UserConfirm' component={UserConfirm} />
            <RootStack.Screen name='FavouriteProduct' component={FavouriteProduct} />
            <RootStack.Screen name='UserInformation' component={UserInformation} />
            <RootStack.Screen name="OrderSuccess" component={OrderSuccess} />
            <RootStack.Screen name="DetailHistory" component={DetailHistory} />
            <RootStack.Screen name="ProductDetail" component={ProductDetail} />
            <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        </RootStack.Navigator>
    )
}

export const EndowStack = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }} >
            <RootStack.Screen name='EndowScreen' component={EndowScreen} />
            <RootStack.Screen name='DetailEndow' component={DetailEndow} />
        </RootStack.Navigator>
    )
}



