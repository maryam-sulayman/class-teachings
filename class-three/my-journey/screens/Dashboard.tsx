import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Load user name and product details when component mounts
    getUserName();
    fetchProductDetails();
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

  const fetchProductDetails = async () => {
    try {
      const url3 = 'https://fakestoreapi.com/products';
      const productResponse = await fetch(url3);
      const productData = await productResponse.json();

      if (productData) {
         setProducts(productData.slice(0, 10));
      } else {
        console.log("No products available");
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Welcome {name}!</Text>
      
      <Text style={styles.productHeading}>Here's a list of your products:</Text>
      <ScrollView>
      {products.map((product, index) => (
      <View key={index} style={styles.productItem}>
        <View style={styles.imageContainer}>
        <Image source={{uri: product.image}} style={styles.productImage}/>
        </View>
        <View style={styles.detailsContainer}>
    <Text style={styles.productCategory}>Category: {product.category}</Text>
        <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
    <Text style={styles.productPrice}>£{product.price}</Text>
        </View>
        </View>
      ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  productHeading: {
   fontSize: 21,
   marginBottom: 25,
   fontWeight: 'bold',
  },
  productTitle: {
    fontSize: 17,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  productItem: {
    backgroundColor: 'white',
    marginBottom: 10
  },
  productInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  productDescription: {
    fontSize: 16,
    color: 'grey',
    lineHeight: 23
  },
  productCategory: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'brown',
    marginBottom: 10,
    marginTop: 10
  },
  productImage: {
    width: 200,
    height: 250,
  },
  imageContainer: {
  alignItems: 'center',
  marginTop: 20
  },
  detailsContainer: {
 marginLeft: 30,
 marginRight: 30,
 marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
