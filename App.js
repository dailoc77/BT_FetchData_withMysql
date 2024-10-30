import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import Screen_01 from './screens/Screen_01';
import SignupScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Ẩn header cho màn hình đăng nhập
        />
        <Stack.Screen 
          name="SignUpScreen" 
          component={SignupScreen} 
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name="Screen_01" 
          component={Screen_01} 
          options={{ 
            headerTitle: '',
            headerBackTitleVisible: false, 
            headerStyle: {
              elevation: 0, 
              shadowOpacity: 0, 
              borderBottomWidth: 0, 
            },
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}