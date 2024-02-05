import React, { Component, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Avatar, Card } from 'react-native-paper';
import CartContext from '../../Context/Cart/CartContext';
import Toast from 'react-native-simple-toast'

export default function NewestItem({item,navigation, image}){
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const {AddToCart,removeItem,cartItems} = useContext(CartContext)
  const [added,setAdded] = useState(false)

  const addItem = (item) => {
    //check if item exists in cart arraylist
    for (i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === item.name) {
          console.log('item exists')
          //console.log(cartItems)
          return ;
      }
    }
    AddToCart(item);
    setAdded(true)
    Toast.show("Added");
    //console.log(cartItems)
  }

  const remove = (item) => {
    removeItem(item.name)
    setAdded(false)
    Toast.show("Removed");
  }
 
    return (
      <View style={styles.popStyle} >

            
<Card elevation={0}>
    <Card.Content style={styles.cardStyle}>
        <View style={{flex: 0.4}}>
        <Image
        style={{width: 100, height: 100, borderRadius: 5}}
        source={{
           uri: item.photo
          //uri: image
        }}
      />
        </View>

        <View style={{flex: 0.6}}>
        <Text style={styles.mainText} variant="titleLarge">{item.name}</Text>
        <Text style={{color: 'green', fontWeight: 'bold', margin: 10}} variant="bodyMedium">£{item.price}</Text>

      <View style={{flex:1,flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
      <Avatar.Icon size={25} icon="group" style={styles.catIcon}/>
      <Text style={{marginLeft: 5}} variant="bodyMedium">{item.category}</Text>

      {!added && <Button mode='contained'
      disabled={parseInt(item.stock) < 1 ? true : false }
       style={{marginLeft: 10,marginBottom:5}} icon="cart" onPress={() => addItem(item)}> Add  </Button>}
      {added && <Button mode='outlined' textColor='red' style={{marginLeft: 10, marginBottom:5}} icon="cancel" onPress={() => remove(item)}> Delete  </Button>}


      </View>
      <Text style={{textAlign: 'center', color: 'red'}}>{parseInt(item.stock) <= 10 ? 'Almost out of stock' : '' } </Text>
      {parseInt(item.stock) < 1 ? <Text style={{textAlign: 'center', marginTop: 5, color: 'red'}}>Out of stock </Text> : '' }
        </View>

    </Card.Content>
  </Card>
      </View>
    
  )

}
const styles = StyleSheet.create({
cardStyle: {
margin: 5,
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
  fontSize: 15
},

})