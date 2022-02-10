/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskLisk';
import TaskDetails from './components/TaskDetails';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={TaskList} />
        <Stack.Screen name="Add" component={TaskForm} />
        <Stack.Screen name="Details" component={TaskDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
