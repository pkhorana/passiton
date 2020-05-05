import React, { useState} from 'react';
import {StyleSheet, Button, TextInput, Text, View} from 'react-native';
import * as firebase from 'firebase';

export default function ForgotPassword(props) {


  const [userText, setUser] = useState('');


  function validate(email) {
    if (validateEmail(email)) {
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(email).then(function() {
        alert('Email was to reset password was sent.');
      }).catch(function(error) {
        alert('Email was not sent.');
      });
    }
    
  }

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
        <Text style={styles.title}>Enter email here:</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={userText => setUser(userText)}
            defaultValue={userText}
            maxLength = {30}
        />
        
      </View>
      <View style={styles.buttonContainer}>
        
        <Button
            title = "Send Email"
            onPress={() => validate(userText)}
        />
        <Button
            title = "Back"
            onPress={() => props.navigation.navigate('LoginScreen')}
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