import React, {useEffect} from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as firebase from 'firebase';


export default function Loading(props) {

    const usersRef = firebase.database().ref().child('users');
    var p = null;


    function writeLoginCredentials(emailText) {
        var user = firebase.auth().currentUser;
        var myRef = usersRef.child(user.uid);
        var data = 
        {
            email: emailText,
            profileComplete: 'No',
        }
        myRef.set(data);
      }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            
            if (user && (user.emailVerified || user.providerData[0].providerId == 'facebook.com')) {

                

                // && (user.emailVerified || user.providerData.providerId != null)
                usersRef.child(user.uid).child('profileComplete').once('value').then(function(snapshot) {
                    p = snapshot.val();
                }).then( () => {
                        if (p === 'No') {
                            props.navigation.navigate('CreateProfileScreen');
                        }
                        else if (p == null) {
                            usersRef.once('value').then(function(snapshot) {
                                if (!snapshot.hasChild(user.uid)) {
                                    writeLoginCredentials(user.email);
                                }
                            }).then(props.navigation.navigate('CreateProfileScreen'));
                        } 
                        else {
                            props.navigation.navigate('HomeScreen');
                        }
                });
                
                

                
            } else {
                props.navigation.navigate('LoginScreen');
            } 
        })
    });

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
