
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Spashscreen from '../Splash/splashscreen';
import Homescreen from '../home/homescreen';
import Map from '../map/Map';
const Stack = createStackNavigator();


const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Spashscreen">
      <Stack.Screen
        name="Spashscreen"
        component={Spashscreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Homescreen"
        component={Homescreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;


