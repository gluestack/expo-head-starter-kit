// test-setup.js
import 'react-native-gesture-handler'; // Required for navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from '@testing-library/react-native';
import React from 'react';

const Stack = createNativeStackNavigator();

export function renderWithNavigation(component) {
  return render(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={() => component} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
