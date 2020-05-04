import React, {useEffect} from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as firebase from 'firebase';


export default function Loading(props) {

    const usersRef = firebase.database().ref().child('users');

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var user = firebase.auth().currentUser;
                usersRef.child(user.uid).child('profileComplete').once('value').then(function(snapshot) {
                    p = snapshot.val();
                }).then( () => {
                        if (p === 'No') {
                            props.navigation.navigate('CreateProfileScreen');
                        } else {
                            props.navigation.navigate('HomeScreen');
                        }
                });
            } else {
                props.navigation.navigate('LoginScreen');
            }
        })
    });

    // props.navigation.navigate('LoginScreen');

  
    return (
        <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
        </View>
    )
 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})