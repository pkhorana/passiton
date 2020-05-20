import React, {useState, useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import styles from './Styles';



export default function Home(props) {

    props.navigation.setOptions ( {
            title: 'Home',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#4169e1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    props.navigation.toggleDrawer();
                }}>
                <Text>MENU</Text>
                </TouchableOpacity>
            )
    });

    const categoryNames = ["Video Games", "Food/Beverages", "Entertainment", "Sports", "Fashion", "Politics"];
    const categoryComponents = categoryNames.map((category, i) => <TouchableOpacity
                  key = {i}
                  style={styles.button}>
                  <Text>{category}</Text>
                  </TouchableOpacity>)

    const [currUser, setCurrUser] = useState(null);
    const usersRef = firebase.database().ref().child('users');
    const [fName, setFName] = useState('');
    const user = firebase.auth().currentUser;

    useEffect(() => {
       setCurrUser(firebase.auth());
    });




    function signOut() {
        firebase
        .auth()
        .signOut()
        .then(() => props.navigation.navigate('LoginScreen'));
    }

    usersRef.child(user.uid).child('fName').once('value').then(function(snapshot) {
        setFName(snapshot.val());
        console.log(fName);
    })

    return (
        
        <View style={styles.container}>
        <ScrollView>
        
        <Text style={styles.introMessage}>Welcome to the Home Screen, {fName}!</Text>

        {/* <FlatList
            data={categoryNames}
            renderItem={({category, index}) => (

            )}
        /> */}
        <>{categoryComponents}</>
        <TouchableOpacity style={styles.button}
            onPress={() => signOut()}>
            <Text>LOGOUT</Text>
        </TouchableOpacity>
        </ScrollView >
        </View>
    );
}


// Home.navigationOptions = ({ navigation }) => {
//     return {
//         title: 'Home',
//         headerTitleAlign: 'center',
//         headerStyle: {
//             backgroundColor: '#00008b',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontWeight: 'bold',
//         },
//         headerLeft: () => (
//             <TouchableOpacity onPress={() => {
//                 console.log('1');
//             }}>
//             <Text>MENU</Text>
//             </TouchableOpacity>
//         )

//     }
            
        
// }






