import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet,ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import CatItem from './components/CatItem';
import PopularItem from './components/PopularItem';
import NewestItem from './components/NewestItem';
import CartComponent from './components/CartComponent';
import CartContext from '../Context/Cart/CartContext';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../config/AuthContext';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function CartPage({navigation}){
  const {AddToCart,removeItem,cartItems} = useContext(CartContext)
  const {dbUser,currentUser} = useContext(AuthContext)
  //console.log(cartItems)

  let orderId = "#"+Math.floor(Math.random() * (9999999-111111) +111111)

  //save order function
  const saveOrder = () => {
    firestore()
    .collection("orders")
    .doc(orderId)
    .set({
     id: orderId,
    //id: uuidv4(),
    added: new Date(),
    cost: cartItems.reduce(
			(amount, cartItem) => parseInt(cartItem.price*cartItem.count, 10) + amount,
			0
		  ),
    email: currentUser.email,
    items: cartItems,
    status: 'in progress'
    

    
    })
    .then(() => {
      console.log('saved order')
    })
    .catch((err) => {
      
      return console.log(err,"error saving order")
    })
  }
 
    return (
    
      
      <ScrollView>
        {
          cartItems.map((item, index) => {
            return(
              <CartComponent key={index} item={item} navigation={navigation} />
            )
          })
        }






{cartItems.length > 1 ? 
(<View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
<Text style={{fontSize: 20}}>Sub Total ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}  ): </Text>
<Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20}}>£
{ 
cartItems.reduce(
    (amount, cartItem) => parseInt(cartItem.price*cartItem.count, 10) + amount,
    0
    )}
     </Text>
</View>)
: 
(<View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
<Text style={{fontSize: 20}}>There are no items in your cart</Text>

</View>)
}

{cartItems.length > 1 && <View style={{flexDirection: 'row', justifyContent: "center", padding: 10, marginTop: 10}}>
  <Button mode="contained" 
  style={{width: '80%'}}
  onPress={() => saveOrder()}
  >Checkout</Button>
</View>}
      </ScrollView>
        
  )

}
const styles = StyleSheet.create({

})