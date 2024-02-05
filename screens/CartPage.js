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
  parseFloat(cartItems.reduce(
    (amount, cartItem) => parseFloat(cartItem.price*cartItem.count, 10) + amount,
    0
    ).toFixed(2) ) }
     </Text>
</View>)
: 
(<View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
<Text style={{fontSize: 20}}>There are no items in your cart</Text>

</View>)
}

{parseFloat(cartItems.reduce(
    (amount, cartItem) => parseFloat(cartItem.price*cartItem.count, 10) + amount,
    0
    ).toFixed(2) ) < 10 ? 
    <Text style={{fontSize: 14, textAlign: 'center', color: 'red'}}>Minimum checkout amount is £10!</Text>
    :
     ""
}

{cartItems.length >= 1 && <View style={{flexDirection: 'row', justifyContent: "center", padding: 10, marginTop: 10}}>




  <Button mode="contained" 
  style={{width: '80%'}}
  disabled={parseFloat(cartItems.reduce(
    (amount, cartItem) => parseFloat(cartItem.price*cartItem.count, 10) + amount,
    0
    ).toFixed(2) ) < 10 ? true : false}
  // onPress={() => openPaymentSheet()}
  onPress={() => navigation.navigate('Checkout')}
  >Next</Button>
</View>}
      </ScrollView>
        
  )

}

const styles = StyleSheet.create({

});