import React, {useContext, useState} from 'react'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { ProductNavigation } from '../product/ProductNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserNavigation } from '../user/UserNavigation';
import { UserContext } from '../user/UserContext';

export const Navigation =  () => {
  const { isLoggedIn } = useContext(UserContext);
    return ( 
        <NavigationContainer >
        {
             isLoggedIn ?
            <ProductNavigation/>:
            <UserNavigation/>
        }
        </NavigationContainer>
    )
}


