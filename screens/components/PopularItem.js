import React, { Component, useContext, useEffect,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Avatar, Card } from 'react-native-paper';
import CartContext from '../../Context/Cart/CartContext';
import Toast from 'react-native-simple-toast'

export default function PopularItem({navigation,item, image}){
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
      <Text style={{color: 'green', fontWeight: 'bold'}} variant="bodyMedium">£{item.price}</Text>

      <View style={{flex:1,flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      <Avatar.Icon size={25} icon="group" style={styles.catIcon}/>
      <Text style={{marginLeft: 5}} variant="bodyMedium">{item.category} </Text>

      {!added && <Button mode='contained'
      disabled={parseInt(item.stock) < 1 ? true : false }
       style={{marginLeft: 40}} icon="cart" onPress={() => addItem(item)}> Add  </Button>}
      {added && <Button mode='outlined' textColor='red' style={{marginLeft: 40}} icon="cancel" onPress={() => remove(item)}> Delete  </Button>}
      </View>
      {parseInt(item.stock) < 1 ? <Text style={{textAlign: 'center', marginTop: 5, color: 'red'}}>Out of stock </Text> : '' }
      <Text style={{textAlign: 'center', color: 'red'}}>{parseInt(item.stock) <= 10 ? 'Almost out of stock' : '' } </Text>
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