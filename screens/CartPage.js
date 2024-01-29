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

export default function CartPage({navigation}){
  const {AddToCart,removeItem,cartItems} = useContext(CartContext)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {dbUser,currentUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  //const fetchPaymentSheetParams = 

  const fetchPaymentSheetParams = async () => {

    const stripeFunction = functions().httpsCallable('stripeIntent')
    const response = await stripeFunction()
    //console.log(response.data)
    const { paymentIntent, ephemeralKey, customer,publishableKey} =  response.data;
    

    return {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "I-Levels",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: dbUser.firstname+' '+dbUser.lastname,
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      //Alert.alert(`Error code: ${error.code}`, error.message);
      console.log(error.message)
    } else {
      //Alert.alert('Success', 'Your order is confirmed!');
      console.log('success')
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  
  

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
          cartItems.map((item, index) => {
            return(
              <CartComponent key={index} item={item} navigation={navigation} />
            )
          })
        }






{cartItems.length >= 1 ? 
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

{cartItems.length >= 1 && <View style={{flexDirection: 'row', justifyContent: "center", padding: 10, marginTop: 10}}>
  <Button mode="contained" 
  style={{width: '80%'}}
  onPress={() => openPaymentSheet()}
  >Checkout</Button>
</View>}
      </ScrollView>
        
  )

}

const styles = StyleSheet.create({

});