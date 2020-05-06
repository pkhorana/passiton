import React, { useState, useEffect} from 'react';
import {StyleSheet, Button, TextInput, Text, View} from 'react-native';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';



export default function Login(props) {

  const androidID = '726496770670-po97qe023h1g4ursm0ubccm1rliad5o3.apps.googleusercontent.com';
  const iosID = '726496770670-6errsd2kf47u6hvusupe5skgmmqg8uth.apps.googleusercontent.com';
  const webID = '726496770670-gbrp87t9g9q6octe2h23qrojaghgt2kd.apps.googleusercontent.com';
  
  const usersRef = firebase.database().ref().child('users');

  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');

  

  

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidID,
        iosClientId: iosID,
        clientId: androidID,
        scopes: ['profile', 'email'],
      });
      
      
  
      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      } else {
        
        return { cancelled: true };
      }
    } catch (e) {
    
      return { error: true };
      
    }
    
  }

  
  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            // googleUser.getAuthResponse().id_token
            googleUser.idToken,
            googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          
          
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
        
      }
    });
  }

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }


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
            title = "Login with Google"
            onPress={() => signInWithGoogleAsync()}
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
