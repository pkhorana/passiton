import React, { useState} from 'react';
import {Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert} from 'react-native';
import styles from './Styles';
import * as firebase from 'firebase';
import PasswordTextBox from './PasswordTextBox';
import EmailTextBox from './EmailTextBox';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

export default function Login(props) {
  const androidID = '726496770670-tbdocpee887lp06bq8u4i66h7dqpeurt.apps.googleusercontent.com';
  const iosID = '726496770670-6r4ee2a6gl62re355jesv119omk4dv0s.apps.googleusercontent.com';
  const webID = '726496770670-gbrp87t9g9q6octe2h23qrojaghgt2kd.apps.googleusercontent.com';
//  const facebookappID = '356033035592472';

  const usersRef = firebase.database().ref().child('users');

  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');
  var pendingCred = null;

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0;


  // function linkAccountCredential() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user && pendingCred != null) {
  //       user.linkWithCredential(pendingCred).then(function(user) {
  //         console.log("Account linking success", user);
  //         pendingCred = null;
  //       }, function(error) {
  //         console.log("Account linking error", error);
  //       })
  //     }
  //   });
  // }

  /*async function fblogIn() {
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
                  linkAccountCredential();
                }
                else if (methods[0] == 'google.com') {
                  alert('Seems like you already have a google account. Sign in through Google, and your FB sign in will be added to your account.');
                  signInWithGoogleAsync();
                  linkAccountCredential();
                }
              });
            } else {
              console.log(error);
            }
      });
    }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }*/

  function writeLoginCredentials(emailText) {
    var user = firebase.auth().currentUser;
    var myRef = usersRef.child(user.uid);
    var data =
    {
        email: emailText,
        profileComplete: 'No',
    }
    myRef.set(data);
  }

  //an asynchronous (code block doesnt wait on it) function that handles google sign in
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
        console.log(result.type);
        alert('Try again');
      }
    } catch (e) {
        console.log('hello?');
        return { error: true };
    }
  }

  //uses google sign in credential for app sign in
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

  //if sucessfully logged in, checks if email is verified or profile is complete
  //otherwise takes user to home screen
  function successLogin() {
    var user = firebase.auth().currentUser;
    if (!user.emailVerified) {
        user.sendEmailVerification();
        props.navigation.navigate('VerifyAccountScreen', {
          email: userText,
          password: passText
        });
        alert('You must verify your email. Afterwards, you can login with your new account.');
    }
    else {
        var p = null;
        usersRef.child(user.uid).child('profileComplete').once('value').then(function(snapshot) {
            p = snapshot.val();
        }).then( () => {
            if (p === 'No') {
                props.navigation.navigate('CreateProfileScreen');
            } else if (p == null) {
                usersRef.once('value').then(function(snapshot) {
                if (!snapshot.hasChild(user.uid)) {
                    writeLoginCredentials(user.email);
                }
                }).then(props.navigation.navigate('CreateProfileScreen'));
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
    <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset = {keyboardVerticalOffset}
        style={styles.container}>
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.entryContainer}>
       <EmailTextBox
           onChange={(userText) => setUser(userText)}
       />
       <View style={styles.buttonContainer}>
       </View>
       <PasswordTextBox
           onChange={(passText) => setPass(passText)}
       />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
            onPress={() => handleLogin()}>
            <Text>SIGN IN</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.button}
            onPress={() => signInWithGoogleAsync()}>
            <Text>LOGIN WITH GOOGLE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            onPress={() => props.navigation.navigate('CreateAccountScreen')}>
            <Text>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            onPress={() => props.navigation.navigate('ForgotPasswordScreen')}>
            <Text>FORGOT PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
