import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert} from 'react-native';
import {router} from 'expo-router'

export default function FeedbackForm () {
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [message, setMessage] = useState('')

const handleBack = ()=> {
    router.navigate('/auth/dashboard')
}
const handleSubmit = async () => {
    try {
        let url = 'https://jsonplaceholder.typicode.com/posts'

        const response = await fetch(url)
        const responseData = await response.json()
        if (responseData && username && email && message){
            alert( 'Thank you for the feedback!')
            
             router.navigate('/auth/dashboard')
        }
        else {
            alert('Please complete the form!')
        }
    }
    catch (error) {
console.error('Error fetching data:', error)
alert('Failed to fetch data. Please try again.');
    }
}
    return (
        <View>
            <View style={styles.formBackground}>
            <Text style={styles.feedbackTitle}>We would love to hear from you!</Text>
            <TextInput
            style={styles.input}
            placeholder='Name'
            value={username}
            onChangeText={setUsername}/>

            <TextInput
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}/>

            <TextInput
            style={[styles.input, styles.message]}
            placeholder='Type message'
            value={message}
            onChangeText={setMessage}/>

            <View style={styles.buttons}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    feedbackTitle: {
   fontSize: 18,
   fontWeight: 600,
   color: 'grey',
  textAlign: 'center',
 marginVertical: 20
    },
    formBackground: {
       backgroundColor: 'white',
       marginHorizontal: 30,
       marginTop: 30
    },
    input: {
        padding: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 20
    },
    message: {
     height: 180
    },
    buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30
    },
    submitButton: {
        backgroundColor: 'green',
        paddingVertical: 20,
        paddingHorizontal: 35,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    submitButtonText:{
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backButton: {
        borderColor: 'green',
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 35,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    backButtonText: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})