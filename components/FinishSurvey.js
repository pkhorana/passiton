import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity,  ScrollView} from 'react-native';
import styles from './Styles';
import {Icon} from 'native-base';
import * as firebase from 'firebase';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

export default function FinishSurvey(props) {

    props.navigation.setOptions ( {
        title: '',
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

    const {surveyKey, answeredQuestions, skippedQuestions} = props.route.params;

    const firebaseAuth = firebase.auth();
    const usersRef = firebase.database().ref().child('users'); //reference to the users table
    const uidRef = usersRef.child(firebaseAuth.currentUser.uid); //reference to the user id of the current user

    //Data that can be viewed by the user


    //pulls the data from firebase regarding the current user
    useEffect(() => {
            
    }, []);
        
    console.log(answeredQuestions);
    console.log(skippedQuestions); 
    
    return (
    <View style={styles.container}>
    
        <ScrollView>
            <Text>You have finished the survey!</Text>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                        
                        props.navigation.push('Question', {
                            surveyKey: surveyKey
                        });
                    }}>
                <Text>Back to Survey</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => props.navigation.push('HomeScreen')}>
                <Text>Finish</Text>
            </TouchableOpacity>
        </ScrollView>
    
    </View>
    );
}