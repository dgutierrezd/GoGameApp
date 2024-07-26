/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from './src/screens/AuthScreen';
import ListScreen from './src/screens/ListScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="ListScreen" component={ListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
