import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Button, Avatar, Card, TextInput,ActivityIndicator } from 'react-native-paper';
import CartContext from '../../Context/Cart/CartContext';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../config/AuthContext';
import Toast from 'react-native-simple-toast'

export default function AdminMenuItem({menuInfo}){
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

  const editItemPrice = async(item) => {
    setCurrentItem(item.itemId)
    //save changes to menu

    await firestore().collection("menu").doc(item.itemId).update({
      
      price: price,
  
    })
    .then(() => {
      setLoading(false)
      setPrice('')
      setStock('')
      setSuccess('Details saved successfully')
     
    })
    .catch((err) => {
          console.log(err)
          setLoading(false)
          setVisible(true)
         return setError('Error saving data')
  })
    
  }

  const editItemStock = async(item) => {
    setCurrentItem(item.itemId)
    //save changes to menu

    await firestore().collection("menu").doc(item.itemId).update({
      
      stock: stock,
  
    })
    .then(() => {
      setLoading(false)
      setPrice('')
      setStock('')
      setSuccess('Details saved successfully')
     
    })
    .catch((err) => {
          console.log(err)
          setLoading(false)
          setVisible(true)
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
      <Text style={styles.mainText} variant="titleLarge">{menuInfo.name} </Text>
      <Text variant="bodyMedium">£{menuInfo.price}/{menuInfo.measure}</Text>

      <View style={{flex:1,flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      {/* <Avatar.Icon size={25} icon="apple" style={styles.catIcon}/> */}
      {/* <Text style={{marginLeft: 5}} variant="bodyMedium">{menuInfo.category}</Text> */}

      <TextInput 
      mode='outlined'
      //label={menuInfo.price}
      onChangeText={handlePrice}
      value={price}
      disabled={loading}
      placeholder={"price="+menuInfo.price}
      outlineColor='#2D1148'
      style={{width: '50%', height: 30}}
      />

      <Button mode='outlined' style={{marginLeft: 40}} i onPress={() => editItemPrice(menuInfo)}> Save  </Button>
      </View> 

      <View style={{flex:1,flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      {/* <Avatar.Icon size={25} icon="apple" style={styles.catIcon}/> */}
      {/* <Text style={{marginLeft: 5}} variant="bodyMedium">{menuInfo.category}</Text> */}

      <TextInput 
      mode='outlined'
      //label={menuInfo.price}
      onChangeText={handleStock}
      value={stock}
      disabled={loading}
      placeholder={"Stock="+menuInfo.stock}
      outlineColor='#2D1148'
      style={{width: '50%', height: 30}}
      />

      <Button mode='outlined' style={{marginLeft: 40}} i onPress={() => editItemStock(menuInfo)}> Save  </Button>

     
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