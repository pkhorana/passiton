import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './Styles';
import * as firebase from 'firebase';


export default function VerifyAccount(props) {

  const {email, password} = props.route.params;
  const firebaseAuth = firebase.auth();
  const usersRef = firebase.database().ref().child('users');
  console.log(email);
  console.log(password);


  function writeLoginCredentials(emailText) {
    var user = firebaseAuth.currentUser;
    var myRef = usersRef.child(user.uid);
    var data =
    {
        email: emailText,
        profileComplete: 'No',
    }
    myRef.set(data);
  }

  function verify() {
    var user = firebaseAuth.currentUser;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (user && user.emailVerified) {
            writeLoginCredentials(email);
            props.navigation.navigate('CreateProfileScreen');
        } 
        else {
        alert('Please verify your account.');
        }   
      })
      .catch(error => alert('Invalid Credentials. Enter Again.'));
  }



  return (
    <View style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.verifyLabel}>
            Click the Verify Button once you have verified your account.
        </Text>
      </View>
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.button}
            onPress={() => verify()}>
            <Text>VERIFY</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}