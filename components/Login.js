import React, { useState, useEffect} from 'react';
import {StyleSheet, Button, TextInput, Text, View, Alert} from 'react-native';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';



export default function Login(props) {

  const androidID = '726496770670-po97qe023h1g4ursm0ubccm1rliad5o3.apps.googleusercontent.com';
  const iosID = '726496770670-6errsd2kf47u6hvusupe5skgmmqg8uth.apps.googleusercontent.com';
  const webID = '726496770670-gbrp87t9g9q6octe2h23qrojaghgt2kd.apps.googleusercontent.com';
  const facebookappID = '356033035592472';
  
  const usersRef = firebase.database().ref().child('users');

  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');
  var pendingCred = null;


  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && pendingCred != null) {
        user.linkWithCredential(pendingCred).then(function(user) {
          console.log("Account linking success", user);
          pendingCred = null;
        }, function(error) {
          console.log("Account linking error", error);
        })
      }
      
    });
  });



  async function fblogIn() {
    try {
      await Facebook.initializeAsync(facebookappID);
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
        .auth().signInWithCredential(credential).catch(error => {
            if (error.code === 'auth/account-exists-with-different-credential') {
              pendingCred = error.credential;
              var email = error.email;
              firebase.auth().fetchSignInMethodsForEmail(email).then(function(methods) {
                if (methods[0] == 'password') {
                  alert('Seems like you already have an account, sign in and and your FB sign in will be added to your account.');
                }
                else if (methods[0] == 'google.com') {
                  alert('Seems like you already have a google account. Sign in through Google, and your FB sign in will be added to your account.');
                  signInWithGoogleAsync(); 
                }
              });
            }
      });
    }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }



  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidID,
        iosClientId: iosID,
        clientId: webID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      } else {
        alert('Try again');
      }
    } catch (e) {
        console.log('hello?');
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
            googleUser.idToken,
            googleUser.accessToken
        );

        firebase.auth().signInWithCredential(credential).catch(function(error) {
          alert(error);
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
    } 
    else {
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
            onPress={() => fblogIn()}
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
