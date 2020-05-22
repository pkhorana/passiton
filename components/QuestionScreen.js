import React, {useState, useEffect} from 'react';

import {Text, View, FlatList, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';

import * as firebase from 'firebase';
import styles from './Styles';
import {Icon} from 'native-base';

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

    const usersRef = firebase.database().ref().child('users');
    const categoriesRef = firebase.database().ref().child('categories');
    const user = firebase.auth().currentUser;

   
    


    // const categoryNames = [];
    // categoriesRef.orderByChild("name").on("child_added", function(snapshot) {
    //     categoryNames.push(snapshot.val().name);
    // });
    

    return (
      //SafeAreaView is used to  take up the full screen. Only necessary for iOS devices on iOS versions 11+
      <SafeAreaView style={styles.container}>
      
      </SafeAreaView>
    );
}