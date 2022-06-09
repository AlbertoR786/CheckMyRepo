
import React from 'react';
import {Text, View} from 'react-native';
import Style from './style/main';

const WelcomeScreen = () => (
  <View style={Style.container}>
    <Text style={Style.whiteText}>
      Hello world!
    </Text>
   </View>
);

export default WelcomeScreen;