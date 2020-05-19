import React from 'react';
import { StyleSheet, View } from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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
    <AppContainer/>  
  );
}


const StackNav = createStackNavigator( 
  {
      HomeScreen: {
          screen: Home,
          // navigationOptions: 
          // {
          //     title: 'Home',
          //     headerStyle: {
          //         backgroundColor: '#f4511e',
          //     },
          //     headerTintColor: '#fff',
          //     headerTitleStyle: {
          //         fontWeight: 'bold',
          //     },
          // }
      }
  },
  {
      initialRouteName: 'HomeScreen'
  }
);


const SwitchNav = createSwitchNavigator(
  {
  LoadingScreen: Loading,
  LoginScreen: Login,
  CreateAccountScreen: CreateAccount,
  VerifyAccountScreen: VerifyAccount,
  ForgotPasswordScreen: ForgotPassword,
  CreateProfileScreen: CreateProfile,
  HomeScreen: StackNav,
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
