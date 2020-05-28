import React, {useState, useEffect} from 'react';

import {Platform, Text, View, StyleSheet, FlatList, SafeAreaView, Button, TouchableOpacity, ScrollView} from 'react-native';

import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';
import Swiper from 'react-native-deck-swiper';

export default function QuestionScreen(props) {


    props.navigation.setOptions ( {
            title: 'Question',
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

    var [counter, setCounter] = useState(1);
    var index = counter - 1;
    var questionArr = [];
    var keyArr = [];
    // const [questionArr, setArr] = useState([]);
    const [questionObj, setObj] = useState({});
    const {surveyKey} = props.route.params;
    // const [surveyKey, setKey] = useState(null);




    const usersRef = firebase.database().ref().child('users');
    const surveysRef = firebase.database().ref().child('surveys');
    const user = firebase.auth().currentUser;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            console.log(surveyKey);  
                    
            surveysRef.child(surveyKey).once('value', function(snapshot) {
                setObj(snapshot.val());
            });  
            console.log(questionObj);
            
                    
        }   
        
        return () => mounted = false;
        
    }, []);

    if (questionObj != null) {
        for (var item in questionObj) {
            questionArr.push(questionObj[item]);
            keyArr.push(item);
        }
        
    }

    function answerDB() {
        console.log('yes');
    }

    function next() {

        if (counter == questionArr.length) {
            props.navigation.navigate("HomeScreen");
        } else {
            console.log(questionArr);
            console.log(keyArr);
            setCounter(counter+1);
        }
        
    } 


   
    


    // const categoryNames = [];
    // categoriesRef.orderByChild("name").on("child_added", function(snapshot) {
    //     categoryNames.push(snapshot.val().name);
    // });
    
    
    return (
      //SafeAreaView is used to  take up the full screen. Only necessary for iOS devices on iOS versions 11+
    
        <View style={styles.container}>
            <Swiper
                useViewOverflow={Platform.OS === 'ios'}
                cards={questionArr}
                renderCard={(card) => {
                    return (
                        <View style={styles.card}>
                            <Text>{(questionArr != null && questionArr.length > 0) ? questionArr[index].text : null}</Text>
                            <Text>{(questionArr != null && questionArr.length > 0) ? questionArr[index].image : null}</Text>
                            <Text>{counter + "/" + questionArr.length}</Text>
                        </View>
                    )
                }}
                onSwiped={(cardIndex) => {next()}}
                onSwipedAll={() => {console.log('onSwipedAll')}}
                cardIndex={0}
                backgroundColor={'#4FD0E9'}
                >
                
            </Swiper>

            
            
        </View>

        
    );
   




}


const stylesp = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5FCFF"
    },
    card: {
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white"
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    }
  });