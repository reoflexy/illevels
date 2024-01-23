import React, { Component, useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet,ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import CatItem from './components/CatItem';
import PopularItem from './components/PopularItem';
import NewestItem from './components/NewestItem';
import CartComponent from './components/CartComponent';
import HistoryComponent from './components/HistoryComponent';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../config/AuthContext';
import Toast from 'react-native-simple-toast'

export default function HistoryPage({navigation}){
  const {currentUser,dbUser,loggedin} = useContext(AuthContext)
  const [orderData,setOrderData] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('');
  const [success,setSuccess] = useState(false)
  const [visible,setVisible] = useState(false)

  useEffect(() => {
    setLoading(true)
  
    const loadNew = firestore().collection("orders")
     .where("email","==",currentUser.email)
     .orderBy("added","desc")
     //.orderBy('name','desc')
     .get()
     .then((querySnapshot) => {
       if(querySnapshot.empty){
          setError("No Items")
          setLoading(false)
          return Toast.show("No Orders");
       }
     const ordersArray = [];
     querySnapshot.forEach((doc) => {
       ordersArray.push(doc.data());
     })
  
     
     setOrderData(ordersArray)
     console.log(ordersArray)
     setLoading(false);
     
     })
     .catch((error) => {
       console.log(error)
     })
   
   
   
   return () => {
   loadNew();
   };
   },[])
 
    return (
    
      
      <ScrollView>

        {orderData.map((item, index) => {
          return(
            <HistoryComponent key={index} navigation={navigation} order={item} />
          )
        })}


{/* 
<View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
  <Text style={{fontSize: 20}}>Sub Total (5 items): </Text>
  <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20}}>£2000</Text>
</View>

<View style={{flexDirection: 'row', justifyContent: "center", padding: 10, marginTop: 10}}>
  <Button mode="contained" 
  style={{width: '80%'}}
  >Checkout</Button>
</View> */}
      </ScrollView>
        
  )

}
const styles = StyleSheet.create({

})