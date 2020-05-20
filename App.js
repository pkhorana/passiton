import React from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import {createDrawerNavigator} from 'react-navigation-drawer';



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

const AuthStack = createStackNavigator();
const HomeStack =  createStackNavigator();
const Drawer = createDrawerNavigator();





const HomeStackScreen = () => (
  <HomeStack.Navigator >
  <HomeStack.Screen name="HomeScreen" component={Home}/>
  </HomeStack.Navigator>
);


const DrawerNavigatorScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeStackScreen} />
  </Drawer.Navigator>
);





export default function App() {
  return (
    // <AppContainer/> 
    
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


// const DrawerNav = createDrawerNavigator(
//   {
//     Home: Home,
//   },
//   {
//     initialRouteName: 'Home',
//     drawerPosition: 'left',
//   }
// );


// const StackNav = createStackNavigator( 
//   {
//       HomeScreen: Home,
//       DrawerToggle: DrawerNav
          
//   },
//   {
//       initialRouteName: 'HomeScreen'
//   }
// );


// const SwitchNav = createSwitchNavigator(
//   {
//   LoadingScreen: Loading,
//   LoginScreen: Login,
//   DrawerToggle: DrawerNav,
//   CreateAccountScreen: CreateAccount,
//   VerifyAccountScreen: VerifyAccount,
//   ForgotPasswordScreen: ForgotPassword,
//   CreateProfileScreen: CreateProfile,
//   HomeScreen: StackNav,
//   },
//   {
//     initialRouteName: 'LoadingScreen',
//   }
// );

// const AppContainer = createAppContainer(SwitchNav);


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },


// });
