import React, {useState, useEffect} from 'react';
import {Image, Text, View, FlatList, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';

export default function SurveysScreen(props) {

    props.navigation.setOptions ( {
            title: 'Surveys',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#4169e1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <Icon name="home" style = {{padding:10}} onPress={() => {
                        props.navigation.navigate('HomeScreen');
                    }}/>
            )
    });

    const [currUser, setCurrUser] = useState(null);
    const usersRef = firebase.database().ref().child('users'); //reference to the user table in firebase
    const categoriesRef = firebase.database().ref().child('categories');
    const [fName, setFName] = useState('');
    const [tutorialComplete, setTutorialComplete] = useState(false);
    const user = firebase.auth().currentUser; //gets current user
    const {surveyObj} = props.route.params;

    const surveysRef = firebase.database().ref().child('surveys');

    //pulls the first name of the current user from firebase DB
    usersRef.child(user.uid).child('fName').once('value').then(function(snapshot) {
        setFName(snapshot.val());
    })

    useEffect(() => {
      let mounted = true;
      if (mounted) {
          usersRef.child(user.uid).child('tutorialComplete').once('value').then(function(snapshot) {
            setTutorialComplete(snapshot.val());
          });
          return () => mounted = false;
      }
    }, []);

    const surveyNames = []; //names of surveys
    const surveyImages = []; //images of surveys

    for (var key in surveyObj) {
        if (surveyObj.hasOwnProperty(key)) {
            surveyNames.push(surveyObj[key]);
        }
    }

      for (var i in surveyNames) {
      //  console.log(surveyNames[i]);
        surveysRef.child(surveyNames[i]).once('value', function(snapshot) {
            surveyImages.push(snapshot.val().icon);
        });
      }

      setTimeout(function(){
        console.log(surveyImages);
      }, 1000)

    function update(ind) {
        props.navigation.push('Question', {
          surveyKey: surveyNames[ind]
        })
        console.log(surveyNames[ind]);

    }
    return (
      //SafeAreaView is used to make the flatlist take up the full screen. Only necessary for iOS devices on iOS versions 11+
      <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ //this is to display above the flatlist
          <>
            <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <Text style={styles.introMessage}>Choose from the following surveys!</Text>
            </View>
            </View>
          </>
        }
            data={surveyNames}
            renderItem={({item, index}) => (
              <View style={styles.container}>
                <TouchableOpacity
                    key = {index}
                    style={styles.button}
                    onPress={ () => {
                        update(index)
                        }}>
                    <Image
                        source={{ uri: surveyImages[index] }}
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
