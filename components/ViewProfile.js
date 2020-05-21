
import React, {useState, useEffect} from 'react';
import { Item, Input, Label } from 'native-base';
import {StyleSheet, Text, Button, View, TouchableOpacity,  ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector';
import styles from './Styles';
import {Icon} from 'native-base';
import * as firebase from 'firebase';

export default function ViewProfile(props) {

    props.navigation.setOptions ( {
        title: 'Profile',
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#4169e1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerLeft: () => (

            <Icon name="menu" style = {{padding:10}} onPress={() => {
                    props.navigation.toggleDrawer();
                }}/>
        )
    });

    const firebaseAuth = firebase.auth();
    const usersRef = firebase.database().ref().child('users');
    const uidRef = usersRef.child(firebaseAuth.currentUser.uid);

    //Data that can be viewed by the user
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [race, setRace] = useState('');

    uidRef.once('value').then(function(snapshot) {
        setFName(snapshot.child("fName").val());
        setLName(snapshot.child("lName").val());
        setBirthDate(snapshot.child("birthDate").val());
        setGender(snapshot.child("gender").val());
        setCountry(snapshot.child("country").val());
        setState(snapshot.child("state").val());
        setCity(snapshot.child("city").val());
        setZipcode(snapshot.child("zipcode").val());
        setRace(snapshot.child("race").val());
    })

    function signOut() {
        firebase
        .auth()
        .signOut()
        .then(() => props.navigation.navigate('LoginScreen'));

    }

    //removes time from date and changes it to be 'MM-DD-YYYY' format
    function convertDate(){
      var d = birthDate;
      d = d.split('T')[0];
      var year = d.split('-')[0];
      return [d.split('-')[1] + "-" + d.split('-')[2] + "-" + d.split('-')[0]];
    }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <ScrollView>
          <Text style={styles.viewProfileText}>
              First Name: {fName}{"\n"}
              Last Name: {lName}{"\n"}
              Date of Birth: {convertDate()}{"\n"}
              Gender: {gender}{"\n"}
              Race: {race}{"\n"}
              Country: {country}{"\n"}
              State/Province: {state}{"\n"}
              ZipCode: {zipcode}{"\n"}
          </Text>
          <TouchableOpacity style={styles.button}
              onPress={() => signOut()}>
              <Text>Edit Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
