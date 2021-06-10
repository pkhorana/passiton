import React, {useState, useEffect} from 'react';
import {Text, View, Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';

export default function SurveysScreen(props) {


    const [currUser, setCurrUser] = useState(null);
    const usersRef = firebase.database().ref().child('users'); //reference to the user table in firebase
    const categoriesRef = firebase.database().ref().child('categories');
    const [fName, setFName] = useState('');
    const [tutorialComplete, setTutorialComplete] = useState(false);
    const user = firebase.auth().currentUser; //gets current user
    const surveyRef = firebase.database().ref().child('surveys');
    

    const {surveyObj} = props.route.params;
    
    const [surveyImages, setSurveyImages] = useState([]);
    const [surveyNames, setSurveyNames] = useState([]);
    const [surveyRefs, setSurveyRefs] = useState([]);

    

    useEffect(() => {
      //pulls the first name of the current user from firebase DB
      for (var key in surveyObj) {
        if (surveyObj.hasOwnProperty(key)) {
            //setSurveyRefs([...surveyRefs, surveyObj[key]]);
            surveyRefs.push(surveyObj[key]);
        }
      }
  
      for (var i in surveyRefs) {
        console.log(surveyRefs[i]);
        surveyRef.child(surveyRefs[i]).once('value', function(snapshot) {
            console.log(snapshot.val().icon);
            surveyNames.push(snapshot.val().name);
            surveyImages.push(snapshot.val().icon);
        });
      }

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
                    console.log(surveyImages);
                    props.navigation.navigate('HomeScreen');
                }}/>
        )
      });

      let mounted = true;
      if (mounted) {

           
          usersRef.child(user.uid).child('tutorialComplete').once('value').then(function(snapshot) {
            setTutorialComplete(snapshot.val());
          });
          return () => mounted = false;
      }
    }, []);


    

    console.log(surveyImages);
    console.log(surveyNames);


    // console.log(surveyRefs);


    

  


    

    
    

    function update(ind) {
        props.navigation.push('Question', {
          surveyKey: surveyRefs[ind]
        })
        console.log(surveyNames[ind])
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
