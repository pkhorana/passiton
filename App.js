import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Loading from './components/Loading';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import VerifyAccount from './components/VerifyAccount';
import ForgotPassword from './components/ForgotPassword';
import CreateProfile from './components/CreateProfile';
import Home from './components/Home';
import ViewProfile from './components/ViewProfile';

import * as firebase from 'firebase';
import {firebaseConfig} from './config';



firebase.initializeApp(firebaseConfig);

const AuthStack = createStackNavigator();
const HomeStack =  createStackNavigator();
const Drawer = createDrawerNavigator();


const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="HomeScreen">
  <HomeStack.Screen name="HomeScreen" component={Home}/>
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Profile">
  <HomeStack.Screen name="Profile" component={ViewProfile}/>
  </HomeStack.Navigator>
);


const DrawerNavigatorScreen = () => (
  <Drawer.Navigator initialRouteName="Home" edgeWidth= {110}>
    <Drawer.Screen name="Home" component={HomeStackScreen}/>
    <Drawer.Screen name="Profile" component={ProfileStackScreen}/>
  </Drawer.Navigator>
);





export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="LoadingScreen" component={Loading} options={{title: ''}}/>
        <AuthStack.Screen name="LoginScreen" component={Login} options={{title: 'Login'}} />
        <AuthStack.Screen name="CreateAccountScreen" component={CreateAccount} options={{title: 'Create Account'}}/>
        <AuthStack.Screen name="VerifyAccountScreen" component={VerifyAccount} options={{title: ''}}/>
        <AuthStack.Screen name="ForgotPasswordScreen" component={ForgotPassword} options={{title: 'Forgot Password'}}/>
        <AuthStack.Screen name="CreateProfileScreen" component={CreateProfile} options={{title: 'Create Profile'}}/>
        <AuthStack.Screen name="HomeScreen" component={DrawerNavigatorScreen} options={{headerShown: false}}/>

      </AuthStack.Navigator>
    </NavigationContainer>

  );
}



