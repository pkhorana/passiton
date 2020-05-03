
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as firebase from 'firebase';

export default function CreateProfile(props) {

const [currUser, setCurrUser] = useState(null);

useEffect(() => {
    setCurrUser(firebase.auth());
});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile Here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#3498db'
    },
    title: {
        color: '#FFFF',
        marginTop: 200,
        width: 160,
        textAlign: 'center'
    },
});