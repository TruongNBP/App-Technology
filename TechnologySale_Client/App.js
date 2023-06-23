import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { UserNavigation } from './src/screens/user/UserNavigation';
import { Navigation } from './src/screens/Navigation/Navigation';
import { Provider } from 'mobx-react';
import { UserContextProvider } from './src/screens/user/UserContext';

export default function App() {
  return (
    <Provider>
      <UserContextProvider>
          <Navigation>
            <UserNavigation/>
          </Navigation>
      </UserContextProvider>
    </Provider>
  );
}


