import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, Platform, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';
import Swiper from 'react-native-deck-swiper';
import { set } from 'react-native-reanimated';

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

    const swiperRef = React.createRef();
    const [index, setIndex] = useState(0);
    const [backEnabled, setBack] = useState(false);
    const [skipEnabled, setSkip] = useState(false);
    var questionArr = [];
    var keyArr = [];
    const [disabled, setDisabled] = useState(false);
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

    useEffect(() => {
        if (backEnabled == true) {
            swiperRef.current.swipeLeft();
        }
    }, [backEnabled]);

    useEffect(() => {
        if (skipEnabled == true) {
            skippedCards();
            console.log(skippedArr);
            swiperRef.current.swipeRight();
        }
    }, [skipEnabled]);

    const skippedCards = () => {
      if (skipEnabled == true){
        skippedArr.push(index);
      }
    }

    const onSwiped = () => {
        if (backEnabled == true) {
            setIndex(index-1);
        } else {
            setIndex(index+1);
        }
        console.log(index);
    }

    const swipeLeft = () => {
        console.log(backEnabled);
        if (backEnabled == false) {
            surveyRespRef.child(surveyKey).child(keyArr[index]).child(user.uid).update(
                {
                    userid: user.uid,
                    response: 'left'
                }
            );
        }
        setBack(false);
    }

    const swipeRight = () => {
        if (skipEnabled == false) {
            surveyRespRef.child(surveyKey).child(keyArr[index]).child(user.uid).update(
                {
                    userid: user.uid,
                    response: 'right'
                }
            );
        }
        setSkip(false);
    }

    const swipeUp = () => {
        surveyRespRef.child(surveyKey).child(keyArr[index]).child(user.uid).update(
            {
                userid: user.uid,
                response: 'up'
            }
        );
    }

    const swipeDown = () => {
        surveyRespRef.child(surveyKey).child(keyArr[index]).child(user.uid).update(
            {
                userid: user.uid,
                response: 'down'
            }
        );
    }

    function previous() {
        if (index > 0)
            setBack(true);
    }

    function skip() {
        if (index == questionArr.length-1) {
            setDisabled(true);
        }
        setSkip(true);
    }

    function swipingCards() {
        if (questionObj != null) {
            for (var item in questionObj) {
                questionArr.push(questionObj[item]);
                keyArr.push(item);
            }
        }
        if (questionArr.length != 0) {
            return (
              <View style={styles.questionContainer}>
                <Swiper
                    ref = {swiperRef}
                    useViewOverflow={Platform.OS === 'ios'}
                    cards={questionArr}
                    goBackToPreviousCardOnSwipeLeft = {backEnabled}
                    showSecondCard = {false}
                    // horizontalSwipe={backEnabled || skipEnabled}
                    renderCard={(card) => {
                      //handles questions where text is displayed on the image
                      if(card.type == "C"){
                        return(
                        <View style={styles.card}>
                            <ImageBackground
                                source={card.image && {uri: card.image}}
                                resizeMode={'stretch'}
                                style={{width: 300, height: 450, marginTop: 20, zIndex: 2, elevation: 3}}>
                            <View
                                style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                        alignItems: 'center', zIndex: 2, elevation: 3}}>
                            <Text style={styles.cardText}>{card.text}</Text>
                            </View>
                            </ImageBackground>
                        </View>
                    )} else {
                      //handles all other questions where text and image are separated
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

                <Text
                    style={{position: 'absolute',
                      bottom: 50,
                      left: 25,
                      backgroundColor: "#DDDDDD",
                      padding: 10,
                      borderWidth: 0.5,
                      borderColor: 'black',
                      backgroundColor: '#56aed0',
                      zIndex: 1,
                      elevation: 2}}>Previous</Text>
                <TouchableOpacity
                    style={{position: 'absolute', bottom: 50, left: 25, zIndex: 3, elevation: 4}}
                    disabled={index == 0}
                    hitSlop={{top: 50, bottom: 50, left: 50, right: 100}}
                    onPress={() => previous()}>
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
                      zIndex: 1,
                      elevation: 2}}>Skip</Text>
                <TouchableOpacity
                    style={{position: 'absolute', bottom: 50, right: 25, zIndex: 3, elevation: 4}}
                    hitSlop={{top: 50, bottom: 50, left: 100, right: 50}}
                    disabled={disabled}
                    onPress={() => skip()}>
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
