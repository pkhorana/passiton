import React, { useState } from 'react';
import {StyleSheet, Button, TextInput, Text, View} from 'react-native';

export default function Login() {

  const [userText, setUser] = useState('');
  const [passText, setPass] = useState('');
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
            color="#000000"
        />
        <Button
            title = "Login with Facebook"
            color="#000000"
        />
        <Button
            title = "Create Account"
            color="#000000"
        />
        <Button
            title = "Forgot Password"
            color="#000000"
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
