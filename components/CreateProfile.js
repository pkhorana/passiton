
import React, {useState, useEffect} from 'react';
import { Item, Input, Label } from 'native-base';
import {StyleSheet, Text, Button, TextInput, Picker, View, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector';
import styles from './Styles';
import * as firebase from 'firebase';

export default function CreateProfile(props) {

    const usersRef = firebase.database().ref().child('users');
    const firebaseAuth = firebase.auth();
    const uidRef = usersRef.child(firebaseAuth.currentUser.uid);
    const [userData, setUserData] = useState( {
        fName: '',
        lName: '',
        dateCreated: new Date(),
        birthDate: new Date(),
        gender: '',
        country: '',
        city: '',
        zipcode: '',
        race: '',
        profileComplete: 'Yes',
    } );

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('userData.birthDate');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || userData.birthDate;
        setShow(Platform.OS === 'ios');
        setUserData(prevState => ({...prevState, birthDate: currentDate}));
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const genderData = [
      {key: 0, label: "Male"},
      {key: 1, label: "Female"},
      {key: 2, label: "Other"}
    ];

    const raceData = [
      {key: 0, label: "American Indian or Alaskan Native"},
      {key: 1, label: "Asian"},
      {key: 2, label: "Black or African-American"},
      {key: 3, label: "Native Hawaiian or other Pacific Islander"},
      {key: 4, label: "White"},
      {key: 5, label: "Mixed"},
      {key: 6, label: "Other"}
    ];

    function signOut() {
        firebase
        .auth()
        .signOut()
        .then(() => props.navigation.navigate('LoginScreen'));

    }

    function submit() {
        if (checkParams()) {
            userData.gender = userData.gender.label.replace(/['"]+/g, '');
            userData.race = userData.race.label.replace(/['"]+/g, '');
            uidRef.update(userData);
            props.navigation.navigate('HomeScreen')
        } else {
            alert('Please fill in all the fields with valid information.');
        }
    }

    function checkParams() {
        for (var key in userData) {
            if (userData[key] == null || userData[key] == '') {
                return false;
            }
        }
        return true;
    }

    function modalGender() {
        var gend = userData.gender.label;
        if (gend == null || gend == '') {
            return "Select a Gender";
        } else {
            return JSON.stringify(gend).replace(/['"]+/g, '');
        }
        
    }


    function modalRace() {
        var race = userData.race.label;
        if (race == null || race == '') {
            return "Select a Race";
        } else {
            return JSON.stringify(race).replace(/['"]+/g, '');
        }
        
    }

    function what() {
        return "what";
    }

  return (
    <View style={styles.container}>
    <View style={styles.profileContainer}>
    <ScrollView >
        <Text style={styles.profileTitle}>Create Profile Here</Text>
        <Item floatingLabel >
            <Label style={{ color: "white"}}> First Name</Label>
            <Input
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, fName: e}));
                }}
                maxLength={50}
            />
        </Item>

        <Item floatingLabel style = {{marginTop: 12}}>
            <Label style={{ color: "white" }}> Last Name</Label>
            <Input
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, lName: e}));
                }}
                maxLength={50}
            />
        </Item>


        <Item floatingLabel style = {{marginTop: 12}}>
            <Label style={{ color: "white" }}> Date of Birth</Label>
            <Input
                editable={false}
                maxLength={50}
            />
        </Item>
        <Button onPress={showDatepicker} title="Show date picker!" />

        {show && (
        <DateTimePicker
        timeZoneOffsetInMinutes={0}
        value={userData.birthDate}
        maximumDate={new Date(2021, 0, 0)}
        minimumDate={new Date(1930, 12, 31)}
        mode = {mode}
        display="spinner"
        textColor="white"
        onChange={onChange}
        />
        )}

        <Label style={{ color: "white", marginTop: 20}} > Gender</Label>

        <ModalSelector
                    data={genderData}
                    ref={selector => _selector = selector}
                    initValue= {modalGender()}
                    onChange={(option) => {
                        setUserData(prevState => ({...prevState, gender: option}))
                    }}>

        </ModalSelector>

        <Item floatingLabel style = {{marginTop: 5}}>
            <Label style={{ color: "white" }}> Country</Label>
            <Input
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, country: e}));
                }}
                maxLength={50}
            />
        </Item>

        <Item floatingLabel style = {{marginTop: 12}}>
            <Label style={{ color: "white" }}> City</Label>
            <Input
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, city: e}));
                }}
                maxLength={50}
            />
        </Item>

        <Item floatingLabel style = {{marginTop: 12}}>
            <Label style={{ color: "white" }}> ZipCode</Label>
            <Input
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, zipcode: e}));
                }}
                maxLength={50}
            />
        </Item>


        <Label style={{ color: "white", marginTop: 20 }}> Race</Label>
        <ModalSelector
                    data={raceData}
                    initValue= {modalRace()}
                    onChange={(option)=>{
                        setUserData(prevState => ({...prevState, race: option}))
                    }}
        />
        <View style={styles.buttonContainer}>
        </View>
        <TouchableOpacity style={styles.button}
            onPress={() => submit()}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            onPress={() => signOut()}>
            <Text>LOGOUT</Text>
        </TouchableOpacity>

        </ScrollView>
    </View>
    </View>
  );
}
