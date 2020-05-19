import React, {useState, useEffect} from 'react';

import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';

export default function Home(props) {

    const [currUser, setCurrUser] = useState(null);
    const usersRef = firebase.database().ref().child('users');

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
        <View style={styles.entryContainer}>
       
        <ScrollView >
        
        <Text style={styles.title}>Welcome to Home Screen</Text>
        <TouchableOpacity style={styles.button}
            onPress={() => signOut()}>
            <Text>LOGOUT</Text>
        </TouchableOpacity>
        </ScrollView >
        </View>
        </View>
    );
}


Home.navigationOptions = ({ navigation }) => {
    return {
        title: 'Home',
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#00008b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreateProfileScreen')}>
            <Text>MENU</Text>
            </TouchableOpacity>
        )

    }
            
        
}






