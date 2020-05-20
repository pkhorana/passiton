import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';



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

    const categoryNames = ["Video Games", "Food/Beverages", "Entertainment", "Sports", "Fashion", "Politics"];
    const categoryComponents = categoryNames.map((category, i) => <TouchableOpacity
                  key = {i}
                  style={styles.button}>
                  <Text>{category}</Text>
                  </TouchableOpacity>)

    const [currUser, setCurrUser] = useState(null);
    const usersRef = firebase.database().ref().child('users');
    const [fName, setFName] = useState('');
    const user = firebase.auth().currentUser;

    useEffect(() => {
       setCurrUser(firebase.auth());
    });




    function signOut() {
        firebase
        .auth()
        .signOut()
        .then(() => props.navigation.navigate('LoginScreen'));
    }

    usersRef.child(user.uid).child('fName').once('value').then(function(snapshot) {
        setFName(snapshot.val());
        console.log(fName);
    })

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








