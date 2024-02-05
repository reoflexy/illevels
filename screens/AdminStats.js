import { StyleSheet, View,Image,NativeSyntheticEvent,TextInputChangeEventData,TouchableOpacity, } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { Text,TextInput,Button,ActivityIndicator,Banner} from 'react-native-paper'
import {logo,Logo} from '../Constants/images'
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../config/AuthContext';
import { Avatar } from 'react-native-paper';
import { contactData } from '../Constants/Constants';
import { Linking } from 'react-native';

const AdminStats = () => {
  const {colors} = useTheme()
  const navigation = useNavigation()
  const {currentUser,dbUser} = useContext(AuthContext)

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('')
  const [visible,setVisible] = useState(false)
  const [visible2,setVisible2] = useState(true)
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [secure1,setSecure1] = useState(true)
  const [orderCount,setOrderCount] = useState(0)
  const [salesAmount, setSalesAmount] = useState(0)
  const [usercount, setUserCount] = useState(0)

  
  useEffect(() => {
    setLoading(true)
  
    const loadNew = firestore().collection("orders")
     //.where("email","==",currentUser.email)
     //.orderBy("added","desc")
     //.orderBy('name','desc')
     .get()
     .then((querySnapshot) => {
       if(querySnapshot.empty){
          setError("No Items")
          setLoading(false)
          return Toast.show("No orders");
       }
     let orderNumbers = 0;
       let salesNumber = 0.00
     querySnapshot.forEach((doc) => {
       orderNumbers++
       salesNumber+= doc.data().cost
     })
     setOrderCount(orderNumbers)
     setSalesAmount(salesNumber)
     //setLoading(false);
     
     })
     .then(async()=> {
      firestore().collection("users")
      .get()
     .then((querySnapshot) => {
       if(querySnapshot.empty){
          setError("No users")
          setLoading(false)
          return Toast.show("No users");
       }
     let userNumbers = 0;
     querySnapshot.forEach((doc) => {
       userNumbers++
     })
     setUserCount(userNumbers)
     setLoading(false);
     
     })


     })
     .catch((error) => {
       console.log(error)
     })
   
   
   
   return () => {
   loadNew();
   };
   },[])

  return (
    <View style={styles.mainView}>
      

      <View style={styles.logoView}>
        <Image style={{width: 100,height: 100}} source={logo} />
      </View>

     
   <View style={{flexDirection: 'row', width: '100%',height: 80}}>
     <View style={{flex: 0.4,  justifyContent: 'center', }}>
     <Avatar.Icon size={60} icon='account' style={{alignSelf: 'center'}}/>
     
     </View>

     <View style={{flex: 0.6, justifyContent: 'center'}}>
      <Text style={{marginLeft: 10}}>
       Users:  {usercount}
       </Text>
     
     </View>


   </View>

   <View style={{flexDirection: 'row', width: '100%',height: 80}}>
     <View style={{flex: 0.4,  justifyContent: 'center', }}>
     <Avatar.Icon size={60} icon='currency-gbp' style={{alignSelf: 'center'}}/>
     
     </View>

     <View style={{flex: 0.6, justifyContent: 'center'}}>
      <Text style={{marginLeft: 10}}>
       Sales:  {salesAmount}
       </Text>
     
     </View>
   </View>

   <View style={{flexDirection: 'row', width: '100%',height: 80}}>
     <View style={{flex: 0.4,  justifyContent: 'center', }}>
     <Avatar.Icon size={60} icon='menu' style={{alignSelf: 'center'}}/>
     
     </View>

     <View style={{flex: 0.6, justifyContent: 'center'}}>
      <Text style={{marginLeft: 10}}>
       Orders:  {orderCount}
       </Text>
     
     </View>
   </View>
       
      
    </View>
  )
}

export default AdminStats

const styles = StyleSheet.create({
  mainView: {
flex: 1,
flexDirection: 'column',
  },
  logoView: {
    height: 100,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    marginTop: 10,
  },
  inputStyle: {
    width: 320,
    alignSelf: 'center',
    borderRadius: 20,
    elevation: 0,
    shadowRadius: 3,
    marginTop: 10
  },
  termsText: {
    textAlign:'center',
    fontSize: 12,
    marginTop: 10,
    padding: 10
  },
  submitBtn: {
    width: 250,
    marginTop: 10,
    elevation: 2,
    alignSelf: 'center'
  },
  alreadyBtn:{
    marginTop: 20,
    alignSelf: 'center',
  }



})