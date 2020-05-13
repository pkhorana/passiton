
import React, {useState, useEffect} from 'react';
import { Item, Input, Label } from 'native-base';
import {StyleSheet, Text, View, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Styles';
import * as firebase from 'firebase';

export default function CreateProfile(props) {

const [currUser, setCurrUser] = useState(null);
const usersRef = firebase.database().ref().child('users');
const [userKey, setKey] = useState('');
const [fName, setFName] = useState(null);
const [lname, setLName] = useState(null);
const [date, setDate] = useState(new Date());
const [show, setShow] = useState(false);

const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
};

const showMode = currentMode => {
    setShow(true);
};

useEffect(() => {
    setCurrUser(firebase.auth());
});



function signOut() {
    firebase
    .auth()
    .signOut()
    .then(() => props.navigation.navigate('LoginScreen'));

}

  return (
    <View style={styles.container}>
      <Text style={styles.profileTitle}>Create Profile Here</Text>
      <Item floatingLabel>
          <Label style={{ color: "white" }}> First Name</Label>
            <Input
                onChangeText={(e) => onChange(e)}
                maxLength={50}
            />
        </Item>
        <View style={styles.buttonContainer}>
        </View>
        <Item floatingLabel>
            <Label style={{ color: "white" }}> Last Name</Label>
              <Input
                  onChangeText={(e) => onChange(e)}
                  maxLength={50}
              />
          </Item>
        <View style={styles.buttonContainer}>
        </View>
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          maximumDate={new Date(2021, 0, 0)}
          minimumDate={new Date(1930, 12, 31)}
          display="default"
          textColor="white"
          onChange={onChange}
        />
      <Button
            title = "Logout"
            onPress={() => signOut()}
        />
    </View>
  );
}
