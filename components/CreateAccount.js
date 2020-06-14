import React, { useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './Styles';
import * as firebase from 'firebase';
import PasswordTextBox from './PasswordTextBox';
import EmailTextBox from './EmailTextBox';

export default function CreateAccount(props) {

  //variables used to keep track of the email and password
  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');

  //a reference to the users table/json node in the firebase database
  const usersRef = firebase.database().ref().child('users');

  //regexes used to inspect input character entered into email/password fields
  const minRegex = new RegExp("(?=.{6,})");
  const lalpha = new RegExp("(?=.*[a-z])");
  const ualpha = new RegExp("(?=.*[A-Z])");
  const num = new RegExp("(?=.*[0-9])");
  const special = new RegExp("(?=.*[!@#$%^&*])");

  //used to associate sign in with google/sign in with facebook to the same account based on email
  //all third party accounts from different apps link to one account if email is the same
  var pendingCred = null;

  //creates account and sends verification email if no errors,
  //otherwise, the email is either already in use, the email is invalid, etc.
  //if third party account is blocking the account from being made, account linking should occur
  function handleSignup() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(userText, passText)
      .then(() => {
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(() =>
            props.navigation.navigate('VerifyAccountScreen', {
              email: userText,
              password: passText
            })
          );
          alert('You must verify your email. Afterwards, you can login with your new account.');
      } )
      .catch(error => {
        //account linking if needed
        if (error.code === 'auth/email-already-in-use') {
            handleExistingGoogleFB(error);
        }
        else if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }
        else {
            alert(error);
        }
      });
  }

  //if an account already exists with the same email, and the user tries to sign in with a different method
  function handleExistingGoogleFB(error) {
    //cred with original attempted sign in method
    pendingCred = error.credential;
    firebase.auth().fetchSignInMethodsForEmail(userText).then(function(methods) {
      if (methods != null) {
        if (methods[0] == 'google.com' || methods[0] == 'facebook.com') {
          alert('Seems like you already have a google or fb account. Check your email and create password for your new sign in.');
          firebase.auth().sendPasswordResetEmail(userText);
        } else {
          alert('That email address is already in use!');
        }
      }
      else {
        alert('That email address is already in use!');
      }
    });
  }

  //if user's email and password are valid, the function handleSignup is called
  function validate(user, pass) {
    if (validateEmail(user) && checkPassword(pass)) {
        handleSignup();
    }
  }

  //checks to see if the user's email is acceptable
  function validateEmail(user){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(user)) {
        alert('Enter a valid email!');
        return false;
    }
    return true;
  }

  //Checks the user's password to ensure they meet acceptable standards
  function checkPassword(pass) {
    if (pass ==null || pass === '') {
        alert('Password is required.');
        return false;
    }
    else if (!minRegex.test(pass)) {
        alert('Password must be longer than 6 characaters.');
        return false;
    }
    else if (!lalpha.test(pass)) {
        alert('Password must contain at least one lowercase alphabetical character.');
        return false;
    }
    else if (!ualpha.test(pass)) {
        alert('Password must contain at least one uppercase alphabetical character.');
        return false;
    }
    else if (!num.test(pass)) {
        alert('Password must contain at least one numeric character.');
        return false;
    }
    else if (!special.test(pass)) {
        alert('Password must contain at least one special character.');
        return false;
    }
    return true;
  }

  return (
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
            onPress={() => validate(userText, passText)}>
            <Text>CONTINUE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            onPress={() => props.navigation.navigate('LoginScreen')}>
            <Text>GO TO LOGIN</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
