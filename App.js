import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Provider as BusProvider } from 'react-bus'

import HomeScreen from './screens/home';
import DetailsScreen from './screens/details';
import CreateScreen from './screens/create';
import EditScreen from './screens/edit';
import ScannerScreen from './screens/scanner';
import CreateVcard from './screens/qrcode/vcard';
import CreateMecard from './screens/qrcode/mecard';

import ModalHeader from './components/modal_header';

const Stack = createNativeStackNavigator();

const getData = async () => {
  try {
    axios.defaults.baseURL = await AsyncStorage.getItem("MyApi")
  } catch (e) {
    console.log(e)
  }
}

getData()

const MyStack = () => {
  return (
    <BusProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Phone Book',
              headerRight: () => (<ModalHeader />),
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: 'Detalhes' }}
          />
          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{ title: 'Editar Contacto' }}
          />
          <Stack.Screen
            name='Create'
            component={CreateScreen}
            options={{ title: 'Criar Contacto' }}
          />
          <Stack.Screen
            name="Scanner"
            component={ScannerScreen}
            options={{ title: 'Scanner' }}
          />
          <Stack.Screen
            name='Vcard'
            component={CreateVcard}
            options={{ title: 'Vcard' }}
          />
          <Stack.Screen
            name='Mecard'
            component={CreateMecard}
            options={{ title: 'Mecard' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BusProvider>
  );
};

export default MyStack;