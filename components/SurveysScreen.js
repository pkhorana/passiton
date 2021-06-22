import React, {useState, useEffect} from 'react';
import {Text, View, Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';
import { set } from 'react-native-reanimated';

export default function SurveysScreen(props) {

    const usersRef = firebase.database().ref().child('users'); //reference to the user table in firebase
    const [, setTutorialComplete] = useState(false);
    const user = firebase.auth().currentUser; //gets current user
    const surveyRef = firebase.database().ref().child('surveys');
    // const {surveyRefs, surveyNames, surveyImages} = props.route.params;
    const {surveyRefs} = props.route.params;
    const [surveyImages, setSurveyImages] = useState([]);
    const [surveyNames, setSurveyNames] = useState([]);



    const [loading, setLoading] = useState(false);

    useEffect(() => {

    (async () => {

      names = [];
      images = [];
      
      for (const i in surveyRefs) {
        await surveyRef.child(surveyRefs[i]).once('value').then(function(snapshot) {
          // surveyNames.push(snapshot.val().name);
          // surveyImages.push(snapshot.val().icon);
          names.push(snapshot.val().name);
          images.push(snapshot.val().icon);
          console.log(surveyNames);
          // if (surveyNames.length == surveyRefs.length)
          //   setCount(true);
          
        });

      };

      
      setSurveyNames(names);
      setSurveyImages(images);
      setLoading(true);
      
      

    })();

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

    // for (var key in surveyObj) {
    //   if (surveyObj.hasOwnProperty(key)) {
    //       //setSurveyRefs([...surveyRefs, surveyObj[key]]);
    //       surveyRefs.push(surveyObj[key]);
    //   }
    // }

//     if(count == 0){
//       //finds the surveys and survey images for each survey within the selected category
//       for (var i in surveyRefs) {
//         console.log(surveyRefs[i]);
//         surveyRef.child(surveyRefs[i]).once('value', function(snapshot) {
//             surveyNames.push(snapshot.val().name);
//             surveyImages.push(snapshot.val().icon);
//         });
//       }
//       setCount(count + 1); //stops duplicate surveys from appearing
//     }




// useEffect(() => {
//   console.log(count);
//   console.log(surveyNames.length)
//   if (surveyNames.length == 2)
//     setCount(true);

// }, [surveyNames]
// );

    function update(ind) {
        props.navigation.push('Question', {
          surveyKey: surveyRefs[ind]
        })
        console.log(surveyNames[ind])
    }
    
    return (
      //SafeAreaView is used to make the flatlist take up the full screen. Only necessary for iOS devices on iOS versions 11+
      loading ? 
      
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
        :


        <SafeAreaView style={styles.container}>
        </SafeAreaView>



    );
}