import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/home';
import DetailsScreen from './screens/details';
import CreateScreen from './screens/create';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'PhoneBook' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
          name='Create'
          component={CreateScreen}
          options={{title:'Criar Contacto'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;