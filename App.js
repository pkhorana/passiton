import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';

import * as firebase from 'firebase';
import {firebaseConfig} from './config';
firebase.initializeApp(firebaseConfig);


export default function App() {
  return (
    <View style={styles.container}>

      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
