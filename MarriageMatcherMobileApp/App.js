// MarriageMatcherMobileApp/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar } from 'react-native';

import ProfileListScreen from './screens/ProfileListScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProfileList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Adjust header height for Android status bar
          ...(Platform.OS === 'android' && {
            headerStatusBarHeight: StatusBar.currentHeight,
          }),
        }}
      >
        <Stack.Screen
          name="ProfileList"
          component={ProfileListScreen}
          options={{ title: 'Bandhaanveshana' }}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={ProfileDetailScreen}
          options={({ route }) => ({ title: route.params.profileName || 'Profile Details' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}