import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Apikeys from './constants/apikeys';
import * as firebase from 'firebase';


export default function App() {
  return (
    <View style={styles.container}>

      <Login />
    </View>
  );
}

constructor(props){
  super(props);
  this.state = {
    isLoadingComplete: false;
  };

  //Intializing Firebase
  if(!firebase.apps.length){ firebase.intializeApp(Apikeys.FirebaseConfig);}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
