
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home';
import DataEntry from './components/data-entry';

const Stack = createNativeStackNavigator();

const getOptions = ({ route }) => ({ title: route.params.name });

const WelcomeScreen = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DataEntry" component={DataEntry} options={getOptions} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default WelcomeScreen;
