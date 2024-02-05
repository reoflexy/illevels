import React, { Component, useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet,ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import CatItem from './components/CatItem';
import PopularItem from './components/PopularItem';
import NewestItem from './components/NewestItem';
import CartComponent from './components/CartComponent';
import CartContext from '../Context/Cart/CartContext';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions';
import { AuthContext } from '../config/AuthContext';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useStripe } from '@stripe/stripe-react-native';
import OrderDetailsComponent from './components/OrderDetailsComponent';
import { useRoute } from '@react-navigation/native';

export default function OrderDetails({navigation}){
  const {AddToCart,removeItem,cartItems} = useContext(CartContext)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {dbUser,currentUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const route = useRoute()
  const [order, setOrder] = useState(route.params?.order)

  //const fetchPaymentSheetParams = 



  
  

  //console.log(cartItems)

  //et orderId = "#"+Math.floor(Math.random() * (9999999-111111) +111111)

  //save order function
  // const saveOrder = () => {
  //   firestore()
  //   .collection("orders")
  //   .doc(orderId)
  //   .set({
  //    id: orderId,
  //   //id: uuidv4(),
  //   added: new Date(),
  //   cost: cartItems.reduce(
	// 		(amount, cartItem) => parseInt(cartItem.price*cartItem.count, 10) + amount,
	// 		0
	// 	  ),
  //   email: currentUser.email,
  //   items: cartItems,
  //   status: 'in progress'
    

    
  //   })
  //   .then(() => {
  //     console.log('saved order')
  //   })
  //   .catch((err) => {
      
  //     return console.log(err,"error saving order")
  //   })
  // }
 
    return (
    
      
      <ScrollView>
        {
          order.items.map((item, index) => {
            return(
              <OrderDetailsComponent key={index} item={item} navigation={navigation} />
            )
          })
        }




<View style={{flexDirection: 'row', justifyContent: 'left', padding: 10}}>
<Text style={{fontSize: 20}}>Order Number: </Text>
<Text style={{  fontWeight: 'bold', fontSize: 20}}>{order.id}</Text>
</View>

<View style={{flexDirection: 'row', justifyContent: 'left', padding: 10}}>
<Text style={{fontSize: 20}}>Amount paid: </Text>
<Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20}}>£{order.cost}</Text>
</View>

<View style={{flexDirection: 'row', justifyContent: 'left', padding: 10}}>
<Text style={{fontSize: 20}}>Order Date: </Text>
<Text style={{  fontSize: 20}}>{order.added.toDate().toDateString()}</Text>
</View>



      </ScrollView>
        
  )

}

const styles = StyleSheet.create({

});