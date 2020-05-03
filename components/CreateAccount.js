import React, { useState} from 'react';
import {StyleSheet, Button, TextInput, Text, View} from 'react-native';
import * as firebase from 'firebase';

export default function CreateAccount(props) {


  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');
  const [userKey, setKey] = useState('');
  const usersRef = firebase.database().ref().child('users');

  const minRegex = new RegExp("(?=.{6,})");
  const lalpha = new RegExp("(?=.*[a-z])");
  const ualpha = new RegExp("(?=.*[A-Z])");
  const num = new RegExp("(?=.*[0-9])");
  const special = new RegExp("(?=.*[!@#$%^&*])");

  function handleSignup() {
      
      firebase
      .auth()
      .createUserWithEmailAndPassword(userText, passText)
      .then(() => success() )
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
        }
        else if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
        } 
        else {
            alert(error);
        }
      });
      
  }

  function success() {
    writeLoginCredentials(userText, passText);
    props.navigation.navigate('CreateProfileScreen')
  }


  function validate(user, pass) {
    
    if (validateEmail(user) && checkPassword(pass)) {
        handleSignup();
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

  function writeLoginCredentials(email, pass) {
    var myRef = usersRef.push();
    var id = myRef.key;
    setKey(id);
    var data = 
    {
        uid: id,
        email: userText,
        password: passText,
    }
    myRef.set(data);
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
            maxLength = {16}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={passText => setPass(passText)}
            defaultValue={''}
            maxLength = {16}
        />
      </View>
      <View style={styles.buttonContainer}>
        
        <Button
            title = "Continue"
            onPress={() => validate(userText, passText)}
        />
        <Button
            title = "Go to Login"
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
