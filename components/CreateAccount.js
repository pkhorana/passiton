import React, { useState} from 'react';
import {StyleSheet, Button, TextInput, Text, View} from 'react-native';

export default function CreateAccount(props) {


  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');
 


  function validate(user, pass) {
    if (validateEmail(user))
      checkPassword(pass);
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
    
    minRegex = new RegExp("(?=.{6,})");
    lalpha = new RegExp("(?=.*[a-z])");
    ualpha = new RegExp("(?=.*[A-Z])");
    num = new RegExp("(?=.*[0-9])");
    special = new RegExp("(?=.*[!@#$%^&*])");
    if (pass ==null || pass === '') {
        alert('Password is required.');
    }
    else if (!minRegex.test(pass)) {
        alert('Password must be longer than 6 characaters.');
    }
    else if (!lalpha.test(pass)) {
        alert('Password must contain at least one lowercase alphabetical character.');
    }
    else if (!ualpha.test(pass)) {
        alert('Password must contain at least one uppercase alphabetical character.');
    }
    else if (!num.test(pass)) {
        alert('Password must contain at least one numeric character.');
    }
    else if (!special.test(pass)) {
        alert('Password must contain at least one special character.');
    }

    
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
