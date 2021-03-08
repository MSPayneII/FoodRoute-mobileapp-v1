import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './LoginScreen';
import { MainScreenHelpee } from './MainScreenHelpee';
import { MainScreenHelper } from './MainScreenHelper';
import { ProfileScreen } from './ProfileScreen';

import { ListHomeScreen } from './ListHomeScreen';
import { ListEnterScreen } from './ListHomeScreen';
import { ListItemsScreen } from './ListHomeScreen';

import { MessageScreen } from './MessageScreen';
import { PeopleScreen } from './PeopleScreen';
import { CameraScreen } from './CameraScreen';
import { AvailableHelpersScreen } from './AvailableHelpersScreen';




const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"   
        screenOptions={{
          headerShown: true
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreenHelpee} />
        <Stack.Screen name="Main*" component={MainScreenHelper} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ListHome" component={ListHomeScreen} />
        <Stack.Screen name="ListEnter" component={ListEnterScreen} />
        <Stack.Screen name="ListItems" component={ListItemsScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="People" component={PeopleScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Available Helpers" component={AvailableHelpersScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;