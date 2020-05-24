import React, {useState, useEffect} from 'react';
import {Text, View, Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
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
    const categoriesRef = firebase.database().ref().child('categories');
    const [fName, setFName] = useState('');
    const user = firebase.auth().currentUser; //gets current user

    //pulls the first name of the current user from firebase DB
    usersRef.child(user.uid).child('fName').once('value').then(function(snapshot) {
        setFName(snapshot.val());
    })

    //Array of category names
    const categoryNames = []; //array of cateogry names
    const categoryImages = []; //array of image locations. Use a .png file in firebase if the image is blank in the app
    categoriesRef.orderByChild("name").on("child_added", function(snapshot) {
        categoryNames.push(snapshot.val().name);
        categoryImages.push(snapshot.val().image);
    });

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
                    style={styles.button}
                    onPress={() => props.navigation.push('Question')}>
                    <Image
                        source={{ uri: categoryImages[index] }}
                        resizeMode={'contain'}
                        style={{width: 125, height: 125, marginBottom: 5}}/>
                    <Text style={styles.homeScreenText}>
                        {item}</Text>
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
