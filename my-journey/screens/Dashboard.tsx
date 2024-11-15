import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Load user name and product details when component mounts
    getUserName();
  }, []);

  const getUserName = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      if (userName !== null) {
        setName(userName);
      }
    } catch (error) {
      console.error('Error reading userName:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userName']);
      router.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

const navigateToForm = () => {
router.replace('/pages/feedbackformpage')
}
const navigateToImages = () => {
  router.replace('/pages/refreshimagespage')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.welcomeText}>Welcome {name}!</Text>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.feedbackForm} onPress={navigateToForm}>
        <Text style={styles.feedbackFormText}>Leave Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.images} onPress={navigateToImages}>
        <Text style={styles.imagesText}>View Images</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
fontSize: 20,
alignSelf: 'center',
fontWeight: 'bold'
  },
header: {
flexDirection: 'row',
justifyContent: 'space-between'
},
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  feedbackForm: {
    backgroundColor: 'orange',
    padding: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  feedbackFormText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  images: {
    backgroundColor: 'black',
    padding: 40,
    borderRadius: 5,
    marginTop: 20,
  },
 imagesText: {
  fontSize: 20,
  color: 'white',
  fontWeight: 'bold',
 }
});

export default DashboardScreen;
