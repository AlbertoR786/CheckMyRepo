
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home';
import DataEntry from './components/data-entry';

const backImage = require('./assets/img/back.png');

const Stack = createNativeStackNavigator();

const getOptions = ({ route }) => ({
  title:                 route.params.name,
  headerBackImageSource: backImage
});

const noHeader  = { headerShown: false };
const noSHhadow = { headerShadowVisible: false };

const WelcomeScreen = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={noSHhadow}>
      <Stack.Screen name="Home" component={Home} options={noHeader} />
      <Stack.Screen name="DataEntry" component={DataEntry} options={getOptions} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default WelcomeScreen;
