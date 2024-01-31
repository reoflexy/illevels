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
import AdminOrderItem from './components/AdminOrderItem';

export default function AdminOrdersPage({navigation}){
  const {currentUser,dbUser,loggedin} = useContext(AuthContext)
  const [menuData,setMenuData] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('');
  const [success,setSuccess] = useState(false)
  const [visible,setVisible] = useState(false)


useEffect(() => {

  
  setLoading(true)

 const loadNew = firestore().collection("orders")
  //.where("email","==",currentUser.email)
  //.orderBy("email","desc")
  //.orderBy('name','desc')
  .get()
  .then((querySnapshot) => {
    if(querySnapshot.empty){
       setError("No Items")
       setLoading(false)
       return Toast.show("No order items");
    }
  const menuArray = [];
  querySnapshot.forEach((doc) => {
    menuArray.push(doc.data());
  })
  
  
  setMenuData(menuArray)
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

        {
          menuData.map((item, index) => {
            return(
              <AdminOrderItem key={index} menuInfo={item} />
            )
          })
        }



      </ScrollView>
        
  )

}
const styles = StyleSheet.create({

})