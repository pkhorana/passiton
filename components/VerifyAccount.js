import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './Styles';
import * as firebase from 'firebase';

//this component brings up a page with a verify button, which the user should click after he or she verifies the email used to create the account

export default function VerifyAccount(props) {

  //these fields were passed in from the create account page to verify page through navigation,
  //they are accessed via route.params
  const {email, password} = props.route.params;


  const firebaseAuth = firebase.auth();
  const usersRef = firebase.database().ref().child('users');
  console.log(email);
  console.log(password);


  //this function is used to store the email and profile state in the firebase database
  //the account is created but profile still has to be created
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

  //Checks if user has verified account via email
  function verify() {
    var user = firebaseAuth.currentUser;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        //if the user is logged in and email is verified, then store info in database and navigate to create rest of the profile
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
