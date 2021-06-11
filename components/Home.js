import React, {useState, useEffect} from 'react';
import {Text, View, Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';

export default function Home(props) {


    const [currUser, setCurrUser] = useState(null);
    const usersRef = firebase.database().ref().child('users'); //reference to the user table in firebase
    const categoriesRef = firebase.database().ref().child('categories');
    const [fName, setFName] = useState('');
    const [tutorialComplete, setTutorialComplete] = useState(false);
    const user = firebase.auth().currentUser; //gets current user

    //pulls the first name of the current user from firebase DB
    

    useEffect(() => {
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

      usersRef.child(user.uid).child('fName').once('value').then(function(snapshot) {
        setFName(snapshot.val());
      });
    }, [])
    

    useEffect(() => {
      let mounted = true;
      if (mounted) {
          usersRef.child(user.uid).child('tutorialComplete').once('value').then(function(snapshot) {
            setTutorialComplete(snapshot.val());
          });
          return () => mounted = false;
      }
    }, [tutorialComplete]);
    

    //Array of category names
    const categoryNames = []; //array of cateogry names
    const categoryImages = []; //array of image locations. Use a .png file in firebase if the image is blank in the app
    const surveyObjs = [];
    categoriesRef.orderByChild("name").on("child_added", function(snapshot) {
        surveyObjs.push(snapshot.val().Surveys);
        categoryNames.push(snapshot.val().name);
        categoryImages.push(snapshot.val().image);
    });

    function update(tutorialComplete, ind) {
      if(tutorialComplete == 'No'){
        props.navigation.push('Tutorial', {})
      } else {
        props.navigation.push('Surveys', {
          surveyObj: surveyObjs[ind]
        })}
        //console.log(surveyObjs[ind])
    }
    

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
                    onPress={ () => {
                      usersRef.child(user.uid).child('tutorialComplete').once('value').then(function(snapshot) {
                        update(snapshot.val(), index)
                      });
                        
                        }}>
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
