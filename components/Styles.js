import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#3498db'
    },
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {

    },
    entryContainer: {
        padding: 20,
        marginTop: 250,
    },
    profileContainer: {
        padding: 20,

    },
    buttonContainer: {
        padding: 20
    },
    title: {
        color: '#FFFF',
        marginTop: 10,
        width: 160,
        textAlign: 'left'
    },
    verifyLabel: {
        color: '#202000',
        padding:20,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 20,
        color:'#FFF',
        paddingHorizontal: 10

    },
    button: {
        alignItems: 'center',
        backgroundColor: "#DDDDDD",
        padding: 15,
        borderWidth: 3,
        borderColor: '#3498db',
        backgroundColor: '#56aed0',
    },
    profileTitle: {
        color: '#FFFF',
        marginTop: 50,
        marginBottom: 50,
        fontSize: 20,
        textAlign: 'center'
    },
    introMessage: {
        color: '#FFFF',
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center'
    },

    introMessage: {
        color: '#FFFF',
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center'
    },

    viewProfileText: {
        color: '#FFFF',
        marginTop: 10,
        fontSize: 18,
        lineHeight: 50,
    },

    smallShift: {
        padding: 5
    },

    homeScreenText: {
      fontSize: 16,
      fontWeight: '600'
    },

    questionContainer: {
      flex: 1,
      backgroundColor: '#3498db',
    },

    card: {
      flex: 0.75,
      borderRadius: 25,
      shadowRadius: 25,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      borderWidth: 2,
      borderColor: "#000000",
      alignItems: 'center',
      backgroundColor: "#0099CC",
      marginTop: 30,
      zIndex: 2,
      elevation: 3
    },

    cardText: {
      textAlign: "center",
      fontSize: 36,
      backgroundColor: "transparent",
      marginBottom: 50,
      zIndex: 2,
      elevation: 3
    },
});
