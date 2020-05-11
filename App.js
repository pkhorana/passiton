import React from 'react';
import { StyleSheet, View } from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Loading from './components/Loading';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import VerifyAccount from './components/VerifyAccount';
import ForgotPassword from './components/ForgotPassword';
import CreateProfile from './components/CreateProfile';
import Home from './components/Home';

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
  LoadingScreen: Loading,
  LoginScreen: Login,
  CreateAccountScreen: CreateAccount,
  VerifyAccountScreen: VerifyAccount,
  ForgotPasswordScreen: ForgotPassword,
  CreateProfileScreen: CreateProfile,
  HomeScreen: Home,
  },
  {
    initialRouteName: 'LoadingScreen',
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
