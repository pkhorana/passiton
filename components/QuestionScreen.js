import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, Platform, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
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
    const surveyRespRef = firebase.database().ref().child('surveyresponses')
    const userRespRef = firebase.database().ref().child('userresponses')

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            surveysRef.child(surveyKey).once('value', function(snapshot) {
                setObj(snapshot.val());
            });
        }
        return () => mounted = false;
    }, []);

    const onSwiped = () => {
        setIndex(index+1);
    }

    const swipeLeft = () => {
        surveyRespRef.child(surveyKey).child(keyArr[index]).child(user.uid).update(
            {
                userid: user.uid,
                response: 'left'
            }
        )
    }

    const swipeRight = () => {
        surveyRespRef.child(surveyKey).child(keyArr[index]).child(user.uid).update(
            {
                userid: user.uid,
                response: 'right'
            }
        )
    }

    const swipeUp = () => {
        surveyRespRef.child(surveyKey).child(keyArr[index]).child(user.uid).update(
            {
                userid: user.uid,
                response: 'up'
            }
        )
    }

    const swipeDown = () => {
        surveyRespRef.child(surveyKey).child(keyArr[index]).child(user.uid).update(
            {
                userid: user.uid,
                response: 'down'
            }
        )
    }

    function previous() {
        setIndex(index - 1);
    }

    function skip() {
      setIndex(index + 1);
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
              <View style={styles.questionContainer}>
                <View style={{zIndex: 2, flex: 1, position: 'absolute'}}>
                <Swiper
                    useViewOverflow={Platform.OS === 'ios'}
                    cards={questionArr}
                    renderCard={(card) => {

                      if(card.type == "C"){
                        return(
                        <View style={styles.card}>
                            <ImageBackground
                                source={card.image && {uri: card.image}}
                                resizeMode={'stretch'}
                                style={{width: 300, height: 450, marginTop: 20, zIndex: 2}}>
                            <View
                                style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                        alignItems: 'center', zIndex: 2}}>
                            <Text style={styles.cardText}>{card.text}</Text>
                            </View>
                            </ImageBackground>
                        </View>
                    )} else {
                      return(
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{card.text}</Text>
                            <Image
                                source={card.image && {uri: card.image}}
                                resizeMode={'contain'}
                                style={{width: 300, height: 350}}/>
                        </View>
                      )
                    }}}
                    onSwiped={onSwiped}
                    onSwipedLeft={swipeLeft}
                    onSwipedRight={swipeRight}
                    onSwipedTop={swipeUp}
                    onSwipedBottom={swipeDown}
                    onSwipedAll={() => {props.navigation.navigate("HomeScreen")}}
                    cardIndex={index}
                    backgroundColor={'#4FD0E9'}
                    stackSize = {questionArr.length}
                    // stackScale = {8}
                    stackSeperation = {100}
                    verticalThreshold = {windowHeight/15}
                    >
                </Swiper>
                </View>
                <Text
                    style={{position: 'absolute',
                      bottom: 50,
                      left: 25,
                      backgroundColor: "#DDDDDD",
                      padding: 10,
                      borderWidth: 0.5,
                      borderColor: 'black',
                      backgroundColor: '#56aed0',
                      zIndex: 1}}>Previous</Text>
                <TouchableOpacity
                    style={{position: 'absolute', bottom: 50, left: 25, zIndex: 3}}
                    hitSlop={{top: 50, bottom: 50, left: 50, right: 100}}
                    onPressIn={(() => console.log('previous()'))}>
                </TouchableOpacity>
                <Text
                    style={{position: 'absolute',
                      bottom: 50,
                      right: 25,
                      backgroundColor: "#DDDDDD",
                      padding: 10,
                      borderWidth: 0.5,
                      borderColor: 'black',
                      backgroundColor: '#56aed0',
                      zIndex: 1}}>Skip</Text>
                <TouchableOpacity
                    style={{position: 'absolute', bottom: 50, right: 25, zIndex: 3}}
                    hitSlop={{top: 50, bottom: 50, left: 100, right: 50}}
                    onPressIn={(() => console.log('skip()'))}>
                </TouchableOpacity>
              </View>
            )
        }
    }

    return (
        <>
          {swipingCards()}
        </>
    );
}
