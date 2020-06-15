import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, Platform, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';
import Swiper from 'react-native-deck-swiper';
import { set } from 'react-native-reanimated';

export default function TutorialScreen(props) {
    props.navigation.setOptions ( {
            title: 'Tutorial',
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
    var questionArr = [];
    var keyArr = [];
    const [questionObj, setObj] = useState({});
    const [tutorialComplete, setTutorialComplete] = useState('No');


    const windowHeight = Dimensions.get('window').height;
    const usersRef = firebase.database().ref().child('users');
    const tutorialRef = firebase.database().ref().child('surveys').child('tutorial');
    const user = firebase.auth().currentUser;

    usersRef.child(user.uid).child('tutorialComplete').once('value').then(function(snapshot) {
        setTutorialComplete(snapshot.val());
    })

    const onSwiped = () => {
        setIndex(index+1);
    }

    const swipeLeft = () => {
        onSwiped();
    }

    const swipeRight = () => {
        onSwiped();
    }

    const swipeUp = () => {
        onSwiped();
    }

    const swipeDown = () => {
        onSwiped();
    }

    const onSwipedAll = () => {
        setTutorialComplete(prevState => ({...prevState, tutorialComplete: 'Yes'}));
        console.log(tutorialComplete);
        props.navigation.navigate("HomeScreen");
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
          tutorialRef.once('value', function(snapshot) {
              setObj(snapshot.val());
          });
        }
        return () => mounted = false;
    }, []);



    function swipingCards() {
        if (questionObj != null) {
            for (var item in questionObj) {
                questionArr.push(questionObj[item]);
                keyArr.push(item);
            }
        }
        if(questionArr.length > 0){
          return(
            <View style={styles.questionContainer}>
              <Swiper
                  ref = {swiperRef}
                  useViewOverflow={Platform.OS === 'ios'}
                  cards={questionArr}
                  //goBackToPreviousCardOnSwipeLeft = {backEnabled}
                  showSecondCard = {false}
                  renderCard={(card) => {
                    return(
                      <View style={styles.card}>
                        <Text style={styles.cardText}>{card.text}</Text>
                          <Image
                              source={card.image && {uri: card.image}}
                              resizeMode={'contain'}
                              style={{width: 300, height: 350}}/>
                      </View>
                    );
                  }}
                  onSwiped={onSwiped}
                  onSwipedLeft={swipeLeft}
                  onSwipedRight={swipeRight}
                  onSwipedTop={swipeUp}
                  onSwipedBottom={swipeDown}
                  onSwipedAll={onSwipedAll}
                  cardIndex={index}
                  backgroundColor={'#4FD0E9'}
                  stackSize = {questionArr.length}
                  stackSeperation = {100}
                  verticalThreshold = {windowHeight/15}
              >
          </Swiper>
        </View>
          );
        }

    }
    return(
      <>
        {swipingCards()}
      </>
    );
  }
