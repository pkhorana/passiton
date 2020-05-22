import React, { useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './Styles';
import * as firebase from 'firebase';
import EmailTextBox from './EmailTextBox';

export default function ForgotPassword(props) {

  const [userText, setUser] = useState('');

  //sends the user an email to reset password based on the validity of the email address
  function validate(email) {
    if (validateEmail(email)) {
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(email).then(function() {
        alert('Email to reset password was sent.');
      }).catch(function(error) {
        alert('Email was not sent.');
      });
    }

  }

  //determines if the format of the email is valid
  function validateEmail(user){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(user)) {
        alert('Enter a valid email!');
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
      </View>
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.button}
            onPress={() => validate(userText)}>
            <Text>SEND EMAIL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            onPress={() => props.navigation.navigate('LoginScreen')}>
            <Text>BACK</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
