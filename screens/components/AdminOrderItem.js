import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Button, Avatar, Card, TextInput,ActivityIndicator } from 'react-native-paper';
import CartContext from '../../Context/Cart/CartContext';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../config/AuthContext';
import Toast from 'react-native-simple-toast'

export default function AdminOrderItem({menuInfo}){
  const {AddToCart,removeItem,cartItems} = useContext(CartContext)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentItem, setCurrentItem] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const handlePrice = (text) => {
    setPrice(text);
  }

  const handleStock = (text) => {
    setStock(text);
  }

  const editItemStatus = async(item) => {
    setCurrentItem(item.itemId)
    //save changes to menu

    await firestore().collection("orders").doc(item.id).update({
      
      status: 'completed',
  
    })
    .then(() => {
      setLoading(false)
      setSuccess('Status saved successfully')
     
    })
    .catch((err) => {
          console.log(err)
          setLoading(false)
          //setVisible(true)
         return setError('Error saving data')
  })
    
  }

 

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
 
    return (
      <View style={styles.popStyle} >

            

<Card style={styles.cardStyle}>
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" 
    left={LeftContent} 
    /> */}
   
    {/* <Card.Cover style={styles.popCoverImage} source={{uri: menuInfo.photo}} /> */}

    <Card.Content style={{marginTop: 10}}>
      <Text style={styles.mainText} variant="titleLarge">{menuInfo.id} - £{menuInfo.cost} </Text>
      <Text variant="bodyMedium">{menuInfo.address} / {menuInfo.postcode}</Text>
      
      <Text style={{marginTop: 5, marginBottom: 5}} variant="bodyMedium">Customer - {menuInfo.firstname} ({menuInfo.mobile})</Text>

      <Text style={{marginTop: 5, marginBottom: 5}} variant="bodyMedium">{menuInfo.deliveryDate} / {menuInfo.deliveryTime}</Text>

      <Text style={{marginTop: 10, fontWeight: 'bold'}} variant="titleLarge">Items</Text>
      {/* items array */}
    
      {
        menuInfo.items.map((item,index) => {
          return(
            <View key={index} style={{flexDirection: 'row'}}>
          <Text>name: {item.name} </Text>
          <Text style={{marginLeft: 20}}>Quantity: {item.count}{item.measure} </Text>    
            </View>
          )
        })
      }
      

      <View style={{flex:1,flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      {/* <Avatar.Icon size={25} icon="apple" style={styles.catIcon}/> */}
      {/* <Text style={{marginLeft: 5}} variant="bodyMedium">{menuInfo.category}</Text> */}

      <Text>Status: {menuInfo.status == 'in progress' ? 'Pending' : 'delivered'} </Text>

      <Button mode='outlined' style={{marginLeft: 40}} i onPress={() => editItemStatus(menuInfo)}> Delivered  </Button>
      </View> 

     

      
      {currentItem == menuInfo.itemId && success !== '' ? <Text style={{textAlign: 'center', color: 'green'}}>{success} </Text> : ''}
      {currentItem == menuInfo.itemId && error !== '' ? <Text style={{textAlign: 'center', color: 'red'}}>{error} </Text> : ''}
      {loading && currentItem == menuInfo.itemId ?  <ActivityIndicator size={42} /> : ''}



    </Card.Content>


      
   
  </Card>


      </View>
    
  )

}
const styles = StyleSheet.create({
cardStyle: {
margin: 5,
},
popStyle: {
flex: 0.75,
margin: 2,
borderRadius: 5
},
popText: {
    marginTop: 5,
},
popIcon: {
    marginTop: 2,
},
popCoverImage: {
  margin: 0,
  height: 150
},
mainText: {
  fontWeight: 'bold',
  fontSize: 15
},

})