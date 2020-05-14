
import React, {useState, useEffect} from 'react';
import { Item, Input, Label } from 'native-base';
import {StyleSheet, Text, TextInput, Picker, View, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import Picker from '@react-native-community/picker';
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

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || userData.birthDate;
    //     setShow(Platform.OS === 'ios');
    //     setUserData(prevState => ({...prevState, birthDate: currentDate}));
    // };

    // const showMode = currentMode => {
    //     setShow(true);
    // };





    function signOut() {
        firebase
        .auth()
        .signOut()
        .then(() => props.navigation.navigate('LoginScreen'));

    }

    function submit() {
        if (checkParams()) {
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

  return (
    <View style={styles.container}>
    <View style={styles.profileContainer}>
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
        
        {/* <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={userData.birthDate}
            maximumDate={new Date(2021, 0, 0)}
            minimumDate={new Date(1930, 12, 31)}
            display="default"
            textColor="white"
            onChange={onChange}
        /> */}
        
        <Label style={{ color: "white", marginTop: 20}} > Gender</Label>
        <Picker
        selectedValue = {userData.gender}
        onValueChange={(itemValue, itemIndex) => 
            setUserData(prevState => ({...prevState, gender: itemValue}))
        }>
        <Picker.Item label="Select a Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        </Picker>


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
        <Picker
        selectedValue = {userData.race}
        
        onValueChange={(itemValue, itemIndex) => 
            setUserData(prevState => ({...prevState, race: itemValue}))
        }>
        <Picker.Item label="Select a Race" value="" />
        <Picker.Item label="American Indian or Alaska Native" value="americanind" />
        <Picker.Item label="Asian" value="asian" />
        <Picker.Item label="Black or African American" value="black" />
        <Picker.Item label="Native Hawaiian or Other Pacific Islander" value="pacific" />
        <Picker.Item label="White" value="white" />
        </Picker>
        

    



        <TouchableOpacity style={styles.button}
            onPress={() => submit()}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
            onPress={() => signOut()}>
            <Text>LOGOUT</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
}
