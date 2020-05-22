import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';

export default function Home(props) {

    props.navigation.setOptions ( {
            title: 'Home',
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

    const [currUser, setCurrUser] = useState(null);
    const usersRef = firebase.database().ref().child('users'); //reference to the user table in firebase
    const [fName, setFName] = useState('');
    const user = firebase.auth().currentUser; //gets current user

    //pulls the first name of the current user from firebase DB
    usersRef.child(user.uid).child('fName').once('value').then(function(snapshot) {
        setFName(snapshot.val());
    })

    function signOut() {
        firebase
        .auth()
        .signOut()
        .then(() => props.navigation.navigate('LoginScreen'));
    }

    //Array of category names
    const categoryNames = ["Video Games", "Food/Beverages", "Entertainment", "Sports", "Fashion", "Politics"];

    return (
      //SafeAreaView is used to make the flatlist take up the full screen. Only necessary for iOS devices on iOS versions 11+
      <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ //this is to display above the flatlist
          <>
            <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <Text style={styles.introMessage}>Welcome to the Home Screen, {fName}!</Text>
            </View>
            </View>
          </>
        }
            data={categoryNames}
            renderItem={({item, index}) => (
              <View style={styles.container}>
                <TouchableOpacity
                    key = {index}
                    style={styles.button}>
                    <Text>{item}</Text>
                </TouchableOpacity>
                </View>
            )}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1 }}
            keyExtractor={(item, index) => index ? index.toString() : ""}
            numColumns={2}
            ListFooterComponent={ //this is to display below the flatlist
              <View style={styles.container}>
              <View style={styles.entryContainer}>
              <TouchableOpacity style={styles.button}
                  onPress={() => signOut()}>
                  <Text>LOGOUT</Text>
              </TouchableOpacity>
              </View>
              </View>
            }
        />
        </SafeAreaView>
    );
}

/*
<TouchableOpacity onPress={()=>this.moveToAddNewCustomer()}>
    <Image style={styles.imagestyle} source={require('./ic_action_name.png')} />
</TouchableOpacity>
*/
