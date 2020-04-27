import React, { useState } from 'react';
import {StyleSheet, Button, TextInput, Text, View, Alert} from 'react-native';



export default function Login(props) {

  
  const [errMsg, setErrMsg] = useState('');
  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');

  function checkPassword(pass) {
    setErrMsg('');
    minRegex = new RegExp("(?=.{6,})");
    lalpha = new RegExp("(?=.*[a-z])");
    ualpha = new RegExp("(?=.*[A-Z])");
    num = new RegExp("(?=.*[0-9])");
    special = new RegExp("(?=.*[!@#$%^&*])");
    if (pass ==null || pass === '') {
        setErrMsg('Password is required.');
    }
    else if (!minRegex.test(pass)) {
        setErrMsg('Password must be longer than 6 characaters.');
    }
    else if (!lalpha.test(pass)) {
        setErrMsg('Password must contain at least one lowercase alphabetical character.');
    }
    else if (!ualpha.test(pass)) {
        setErrMsg('Password must contain at least one uppercase alphabetical character.');
    }
    else if (!num.test(pass)) {
        setErrMsg('Password must contain at least one numeric character.');
    }
    else if (!special.test(pass)) {
        setErrMsg('Password must contain at least one special character.');
    }
    if (errMsg.length > 0) {
        Alert.alert(
            "Error",
            errMsg,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
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
            maxLength = {12}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={passText => setPass(passText)}
            defaultValue={passText}
            maxLength = {12}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
            title = "SIGN IN"
            onPress={() => checkPassword(passText)}
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
