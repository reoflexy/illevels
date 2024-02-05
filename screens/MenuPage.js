import React, { Component, useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet,ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import CatItem from './components/CatItem';
import PopularItem from './components/PopularItem';
import NewestItem from './components/NewestItem';
import CartComponent from './components/CartComponent';
import MenuItem from './components/MenuItem';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../config/AuthContext';
import Toast from 'react-native-simple-toast'
import { ActivityIndicator, FAB } from 'react-native-paper';
import CartContext from '../Context/Cart/CartContext';

export default function MenuPage({navigation}){
  const {currentUser,dbUser,loggedin} = useContext(AuthContext)
  const {AddToCart,removeItem,cartItems} = useContext(CartContext)
  const [menuData,setMenuData] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('');
  const [success,setSuccess] = useState(false)
  const [visible,setVisible] = useState(false)


useEffect(() => {

  
  setLoading(true)

 //const loadNew = 
 firestore().collection("menu")
  //.where("email","==",currentUser.email)
  //.orderBy("email","desc")
  //.orderBy('name','desc')
  .get()
  .then((querySnapshot) => {
    if(querySnapshot.empty){
       setError("No Items")
       setLoading(false)
       return Toast.show("No Menu items");
    }
  const menuArray = [];
  querySnapshot.forEach((doc) => {
    menuArray.push(doc.data());
  })
  
  
  setMenuData(menuArray)
  setLoading(false);
  
  })
  .catch((error) => {
    //console.log(error)
    return Toast.show("Failed to fetch items");
  })



// return () => {
// loadNew();
// };


},[])
 
    return (
    
      <View>
      <ScrollView>
        {loading == true  &&  <View >
       <ActivityIndicator size={42} />
      </View>}

        {
          menuData.map((item, index) => {
            return(
              <MenuItem key={index} menuInfo={item} />
            )
          })
        }
      </ScrollView>
     {!loading && <FAB
icon="cart"
style={styles.fab}
label={cartItems.length > 0 ? cartItems.length.toString() : "" }
onPress={() => navigation.navigate('Cart')}
/>}
</View>
     
        
  )

}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})