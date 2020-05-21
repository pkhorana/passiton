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
import QuestionScreen from './components/QuestionScreen';

import * as firebase from 'firebase';
import {firebaseConfig} from './config';



firebase.initializeApp(firebaseConfig);

const MainStack = createStackNavigator();
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
    {/* <Drawer.Screen name="Sign Out" component={Login}/> */}
  </Drawer.Navigator>
);





export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="LoadingScreen" component={Loading} options={{title: ''}}/>
        <MainStack.Screen name="LoginScreen" component={Login} options={{title: 'Login'}} />
        <MainStack.Screen name="CreateAccountScreen" component={CreateAccount} options={{title: 'Create Account'}}/>
        <MainStack.Screen name="VerifyAccountScreen" component={VerifyAccount} options={{title: ''}}/>
        <MainStack.Screen name="ForgotPasswordScreen" component={ForgotPassword} options={{title: 'Forgot Password'}}/>
        <MainStack.Screen name="CreateProfileScreen" component={CreateProfile} options={{title: 'Create Profile'}}/>
        <MainStack.Screen name="HomeScreen" component={DrawerNavigatorScreen} options={{headerShown: false}}/>
        <MainStack.Screen name="Question" component={QuestionScreen}/>
      </MainStack.Navigator>
    </NavigationContainer>

  );
}



