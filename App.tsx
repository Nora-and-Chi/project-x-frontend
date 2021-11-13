import React from 'react';
import Home from './components/Home';
import ActivityPage from './components/ActivityPage';
import CameraComponent from './components/CameraComponent';
import { enableScreens } from 'react-native-screens';
enableScreens();
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ stackAnimation: 'fade' }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ActivityPage" component={ActivityPage} />
        <Stack.Screen name="CameraComponent" component={CameraComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
