import React, { Component, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Avatar, Card } from 'react-native-paper';
import CartContext from '../../Context/Cart/CartContext';

export default function PopularItem({navigation,item, image}){
  const {AddToCart,removeItem,cartItems} = useContext(CartContext)

  const addItem = (item) => {
    //check if item exists in cart arraylist
    for (i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === item.name) {
          console.log('item exists')
          console.log(cartItems)
          return ;
      }
    }
    
   // item["count"] = 1;
    AddToCart(item);
    console.log(cartItems)
  }


  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
 
    return (
      <View style={styles.popStyle} >

            

<Card style={styles.cardStyle}>
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" 
    left={LeftContent} 
    /> */}
   
    <Card.Cover style={styles.popCoverImage} source={{ uri: item.photo }} />

    <Card.Content style={{marginTop: 10}}>
      <Text style={styles.mainText} variant="titleLarge">{item.name} </Text>
      <Text variant="bodyMedium">£{item.price} / {item.measure} </Text>

      <View style={{flex:1,flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      <Avatar.Icon size={25} icon="apple" style={styles.catIcon}/>
      <Text style={{marginLeft: 5}} variant="bodyMedium">{item.category} </Text>

      <Button mode='contained' style={{marginLeft: 40}} icon="cart" onPress={() => addItem(item)}> Add  </Button>
      </View>
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