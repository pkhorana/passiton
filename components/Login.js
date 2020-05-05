import React, { useState} from 'react';
import {StyleSheet, Button, TextInput, Text, View} from 'react-native';
import * as firebase from 'firebase';


export default function Login(props) {

  
  const usersRef = firebase.database().ref().child('users');
  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');
  const [userKey, setKey] = useState('');


//   function verificationCase() {
//       var user = firebase.auth().currentUser;
//       if (user.emailVerified) {

//       }
//   }

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
        <Text style={styles.title}>Username:</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={userText => setUser(userText)}
            defaultValue={userText}
            maxLength = {30}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={passText => setPass(passText)}
            defaultValue={passText}
            maxLength = {30}
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
        padding: 20,
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
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 20,
        color:'#FFF',
        paddingHorizontal: 10

    },

});
