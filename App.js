import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';

import Loading from './components/Loading';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import VerifyAccount from './components/VerifyAccount';
import ForgotPassword from './components/ForgotPassword';
import CreateProfile from './components/CreateProfile';
import Home from './components/Home';
import ViewProfile from './components/ViewProfile';
import QuestionScreen from './components/QuestionScreen';
import FinishSurvey from './components/FinishSurvey';
import Tutorial from './components/Tutorial';
import SurveysScreen from './components/SurveysScreen';


import * as firebase from 'firebase';
import {firebaseConfig} from './config';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);


firebase.initializeApp(firebaseConfig);

const MainStack = createStackNavigator();
const HomeStack =  createStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign Out" onPress={() => {
        signOut();
        props.navigation.navigate('LoginScreen');
        props.navigation.closeDrawer();
      }} />
    </DrawerContentScrollView>
  );
}


const Drawer = createDrawerNavigator();


function signOut() {
  firebase
  .auth()
  .signOut();
}


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
  <Drawer.Navigator initialRouteName="Home" edgeWidth= {110} drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeStackScreen}/>
    <Drawer.Screen name="Profile" component={ProfileStackScreen}/>
  </Drawer.Navigator>
);





export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="LoadingScreen" component={Loading} options={{title: ''}}/>
        <MainStack.Screen name="LoginScreen" component={Login}  options={{headerShown: false}} />
        <MainStack.Screen name="CreateAccountScreen" component={CreateAccount} options={{title: 'Create Account'}}/>
        <MainStack.Screen name="VerifyAccountScreen" component={VerifyAccount} options={{headerShown: false}}/>
        <MainStack.Screen name="ForgotPasswordScreen" component={ForgotPassword} options={{title: 'Forgot Password'}}/>
        <MainStack.Screen name="CreateProfileScreen" component={CreateProfile} options={{title: 'Create Profile'}}/>
        <MainStack.Screen name="HomeScreen" component={DrawerNavigatorScreen} options={{headerShown: false}}/>
        <MainStack.Screen name="Surveys" component={SurveysScreen}/>
        <MainStack.Screen name="Question" component={QuestionScreen}/>
        <MainStack.Screen name="Finish" component={FinishSurvey}/>
        <MainStack.Screen name="Tutorial" component={Tutorial}/>

      </MainStack.Navigator>
    </NavigationContainer>

  );
}
