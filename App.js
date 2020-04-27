import React from 'react';
import { StyleSheet, View } from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

import Home from './navigation/Home';
import * as firebase from 'firebase';
import {firebaseConfig} from './config';


firebase.initializeApp(firebaseConfig);



export default function App() {
  return (
   <View style = {styles.container}>
    <AppContainer/>
   </View>
  );
}


const SwitchNav = createSwitchNavigator(
  {
  LoginScreen: Login,
  CreateAccountScreen: CreateAccount
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

const AppContainer = createAppContainer(SwitchNav);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
