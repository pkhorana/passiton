import React, {useState, useEffect} from 'react';

import {Platform, Text, View, StyleSheet, Dimensions} from 'react-native';

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

    const [index, setIndex] = useState(0);
    // var index = counter - 1;
    var questionArr = [];
    var keyArr = [];
    const [questionObj, setObj] = useState({});
    const {surveyKey} = props.route.params;
   


    const windowHeight = Dimensions.get('window').height;
    const usersRef = firebase.database().ref().child('users');
    const surveysRef = firebase.database().ref().child('surveys');
    const user = firebase.auth().currentUser;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
       
            surveysRef.child(surveyKey).once('value', function(snapshot) {
                setObj(snapshot.val());
            });  
  
        }   
        
        return () => mounted = false;
        
    }, []);

  
    function answerDB() {
        console.log('yes');
    }


    const onSwiped = () => {
        setIndex(index+1);
    }
    
    
    function swipingCards() {
        if (questionObj != null) {
            for (var item in questionObj) {
                console.log('a');
                questionArr.push(questionObj[item]);
                keyArr.push(item);
            }
        }
        if (questionArr.length != 0) {
            return (
                <Swiper
                    useViewOverflow={Platform.OS === 'ios'}
                    cards={questionArr}
                    renderCard={(card) => {return(
                        <View style={stylesp.card}>
                            <Text>{card.text}</Text>
                            <Text>{card.image}</Text>
                        </View>
                    )}}
                    onSwiped={onSwiped}
                    onSwipedAll={() => {props.navigation.navigate("HomeScreen")}}
                    cardIndex={index}
                    backgroundColor={'#4FD0E9'}
                    stackSize = {questionArr.length}
                    // stackScale = {8}
                    stackSeperation = {10}
                    verticalThreshold = {windowHeight/7}
                    >
                </Swiper>
            )  
        } 
    }


    
    return (
        <View style={styles.container}>
            {swipingCards()}
        </View>
    );
   

}


const stylesp = StyleSheet.create({
    container: {
      flex: 0.3,
      backgroundColor: "#F5FCFF"
    },
    card: {
      flex: 0.75,
      borderRadius: 8,
      shadowRadius: 25,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      alignItems: 'center',
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: 45
      
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    }
  });