import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Avatar, Card, IconButton,MD3Colors } from 'react-native-paper';
import CartContext from '../../Context/Cart/CartContext';

export default function OrderDetailsComponent({navigation, item}){
  const {AddToCart,removeItem,cartItems, addCount, reduceCount} = useContext(CartContext)
  const [itemIndex, setItemIndex] = useState(0)
  const [selectedAddItem,setSelectedAddItem] = useState()
  const [selectedMinusItem,setSelectedMinusItem] = useState({})
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  let picked = {}
  let newCart = []

  const addNumber  = (itemA) => {
    //find index of item
    setSelectedAddItem(itemA)
    let newCart = [...cartItems]
    const newObject = Object.assign(picked,itemA)
     //picked = itemA;
    //console.log(selectedItem)
    cartItems.map((item,index) => {
      if (item.itemId == picked.itemId){
        //setItemIndex(index);
         picked['count']++
         newCart[index] = picked
         addCount(newCart)
        //console.log(selectedItem)
      }
    })

  }



  const reduceNumber  = (itemA) => {
    //setSelectedAddItem(itemA)
    let newCart = [...cartItems]
    const newObject = Object.assign(picked,itemA)
     //picked = itemA;
    //console.log(selectedItem)
    cartItems.map((item,index) => {
      if (item.itemId == picked.itemId){
        //setItemIndex(index);
         picked['count']--
         newCart[index] = picked
         addCount(newCart)
        //console.log(selectedItem)
      }
    })
   }

 
    return (
      <View style={styles.popStyle} >

            
<Card  style={{margin: 5}}>
    <Card.Content style={styles.cardStyle}>
        <View style={{flex: 0.4}}>
        <Image
        style={{width: 100, height: 100, borderRadius: 5}}
        source={{
          //uri: 'https://picsum.photos/540',
          uri: item.photo,
        }}
      />
        </View>

        <View style={{flex: 0.6}}>
        <Text style={styles.mainText} variant="titleLarge">{item.name} </Text>

      <Text style={{marginTop: 5,  fontWeight: 'bold'}} variant="bodyMedium">Qty: {item.count}  </Text>


      <View style={{flex:1,flexDirection: 'row', alignItems: 'center'}}>
     
      <Text style={{margin: 10}} variant="bodyMedium">Price: </Text>
      
      <Text style={{margin: 3, color: 'green', fontWeight: 'bold'}} variant="bodyMedium">£{parseFloat(item.price*item.count).toFixed(2)} </Text>

      </View>

        </View>

    </Card.Content>
  </Card>
      </View>
    
  )

}
const styles = StyleSheet.create({
cardStyle: {
margin: 1,
flex: 1,
flexDirection: 'row'
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
  fontSize: 13
},

})