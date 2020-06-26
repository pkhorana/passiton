
import React, {useState, useEffect} from 'react';
import { Item, Input, Label } from 'native-base';
import {StyleSheet, Text, KeyboardAvoidingView, Platform, Button, View, TouchableOpacity,  ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
        state: '',
        city: '',
        zipcode: '',
        race: '',
        profileComplete: 'Yes',
        tutorialComplete: 'No',
    } );

    const user = firebase.auth().currentUser;//Returns the current user from the database
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 70 : 0;

    //pulls the user information from firebase if the profile is complete
    useEffect(() => {
        usersRef.child(user.uid).once('value').then(function(snapshot) {
        var obj = snapshot.val();
        if (obj.profileComplete == 'Yes') {
            setUserData(obj);
        }
        });
      }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    //handles the user selecting a date for date of birth
    const handleConfirm = (date) => {
      if(userData.birthDate != null){
        var pickedDate = userData.birthDate;
      }
      var pickedDate = userData.birthDate;
      const currentDate = date || pickedDate;
      setUserData(prevState => ({...prevState, birthDate: currentDate}));
      hideDatePicker();
    };

    //data used by modalSelector for gender
    const genderData = [
      {key: 0, label: "Male"},
      {key: 1, label: "Female"},
      {key: 2, label: "Other"}
    ];

    //data used by modalSelector for race
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

    //If everything is filled out, the user can submit and is sent to the home screen. Otherwise, they have to finish filling out the profile
    function submit() {
        if (checkParams()) {
            if (userData.gender.label != null) {
                userData.gender = userData.gender.label.replace(/['"]+/g, '');
            }
            if (userData.race.label != null) {
                userData.race = userData.race.label.replace(/['"]+/g, '');
            }
            uidRef.update(userData);
            props.navigation.navigate('HomeScreen')
        } else {
            alert('Please fill in all the fields with valid information.');
        }
    }

    //checks if every field in the create profile screen has been filled
    //if not, then user will be prompted to make necessary changes
    function checkParams() {
        for (var key in userData) {
            if (userData[key] == null || userData[key] == '') {
                return false;
            }
        }
        return true;
    }

    //helper for gender picker
    function modalGender() {
        var gend = userData.gender;
        if (gend.label == null || gend.label == '') {
            if (!(gend == null || gend == '')) {
                return gend;
            } else {
                return "Select a Gender";
            }
        } else {
            return JSON.stringify(gend.label).replace(/['"]+/g, '');
        }
    }

    //helper for race picker
    function modalRace() {
        var race = userData.race;
        if (race.label == null || race.label == '') {
            if (!(race == null || race == '')) {
                return race;
            } else {
                return "Select a Race";
            }
        } else {
            return JSON.stringify(race.label).replace(/['"]+/g, '');
        }
    }

    //reads the birth date if one is found in the database
    function readFromDB( section, placehold, dob = false) {
        if (section == null || section == '') {
            return placehold;
        } else {
            if (dob) {
                return userData.birthDate.toString();
            }
            return section;
        }
    }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset = {keyboardVerticalOffset}
        style={styles.container}>
    <View style={styles.container}>
    <View style={styles.profileContainer}>
    <ScrollView >
        <View style={styles.smallShift}/>

        <Item floatingLabel>
            <Label style={{color: "white"}}> First Name</Label>
            <Input
                value = {readFromDB(userData.fName, null)}
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, fName: e}));
                    value = e;
                }}
                maxLength={50}
            />
        </Item>

        <Item floatingLabel style = {{marginTop: 12}}>
            <Label style={{ color: "white" }}> Last Name</Label>
            <Input
                value = {readFromDB(userData.lName, null)}
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, lName: e}));
                }}
                maxLength={50}
            />
        </Item>

        <Item floatingLabel style = {{marginTop: 12}}>
            <Label style={{ color: "white" }}> Date of Birth</Label>
            <Input
                value = {readFromDB(userData.birthDate, null, true)}
                editable={false}
            />
        </Item>
        <Button onPress={showDatePicker} title="Show date picker!" />

        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={'date'}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date(2021, 0, 0)}
            minimumDate={new Date(1930, 12, 31)}
            headerTextIOS={"Select your birth date"}
            timeZoneOffsetInMinutes={0}
            date={new Date(Date.parse(userData.birthDate))}/>

        <Label style={{ color: "white", marginTop: 20}} > Gender</Label>

        <ModalSelector
                    data={genderData}
                    initValue= {modalGender()}
                    onChange={(option) => {
                        setUserData(prevState => ({...prevState, gender: option}))
                    }}>

        </ModalSelector>

        <Item floatingLabel style = {{marginTop: 5}}>
            <Label style={{ color: "white" }}> Country</Label>
            <Input
                value = {readFromDB(userData.country, null)}
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, country: e}));
                }}
                maxLength={50}
            />
        </Item>

        <Item floatingLabel style = {{marginTop: 5}}>
            <Label style={{ color: "white" }}> State</Label>
            <Input
                value = {readFromDB(userData.state, null)}
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, state: e}));
                }}
                maxLength={50}
            />
        </Item>

        <Item floatingLabel style = {{marginTop: 12}}>
            <Label style={{ color: "white" }}> City</Label>
            <Input
                value = {readFromDB(userData.city, null)}
                onChangeText={(e) => {
                    setUserData(prevState => ({...prevState, city: e}));
                }}
                maxLength={50}
            />
        </Item>

        <Item floatingLabel style = {{marginTop: 12}}>
            <Label style={{ color: "white" }}> ZipCode</Label>
            <Input
                value = {readFromDB(userData.zipcode, null)}
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
    </KeyboardAvoidingView>
  );
}
