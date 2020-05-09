import React, { useState} from 'react';
import {StyleSheet, Button, TextInput, Text, View} from 'react-native';
import * as firebase from 'firebase';
import PasswordTextBox from './PasswordTextBox';


export default function Login(props) {



  const usersRef = firebase.database().ref().child('users');

  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');
  const [userKey, setKey] = useState('');


  function successLogin() {
    var user = firebase.auth().currentUser;
    if (!user.emailVerified) {
        user.sendEmailVerification();
        alert('You must verify your email. Afterwards, you can login with your new account.');
    } else {
        var p = null;
        usersRef.child(user.uid).child('profileComplete').once('value').then(function(snapshot) {
            p = snapshot.val();
        }).then( () => {
                if (p === 'No') {
                    props.navigation.navigate('CreateProfileScreen');
                } else {
                    props.navigation.navigate('HomeScreen');
                }
        });
    }
  }

  function handleLogin() {
      firebase
      .auth()
      .signInWithEmailAndPassword(userText, passText)
      .then(() => successLogin())
      .catch(error => alert('Invalid Credentials. Enter Again.'));
  }

  return (

    <View style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.title}>Email:</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={userText => setUser(userText)}
            defaultValue={userText}
            maxLength = {250}
        />
      <PasswordTextBox
          icon="lock"
          label="Password"
          onChange={(passText) => setPass(passText)}
          maxLength={160}
      />
      </View>
      <View style={styles.buttonContainer}>
        <Button
            title = "SIGN IN"
            onPress={() => handleLogin()}
        />
        <Button
            title = "Login with Facebook"
        />

        <Button
            title = "Create Account"
            onPress={() => props.navigation.navigate('CreateAccountScreen')}
        />
        <Button
            title = "Forgot Password"
            onPress={() => props.navigation.navigate('ForgotPasswordScreen')}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#3498db'
    },
    logoContainer: {

    },
    entryContainer: {
        padding: 10,
        marginTop: 300,

    },
    buttonContainer: {
        padding: 20
    },
    title: {
        color: '#FFFF',
        marginTop: 10,
        width: 160,
        textAlign: 'left'
    },
    input: {
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 5,
        color:'#FFFF',
        paddingHorizontal: 10

    },
    hideableText:{
        height: 50,
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'left'
    }

});
