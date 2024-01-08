import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Avatar, Card } from 'react-native-paper';

export default function PopularItem(){
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
 
    return (
      <View style={styles.popStyle} >

            

<Card style={styles.cardStyle}>
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" 
    left={LeftContent} 
    /> */}
   
    <Card.Cover style={styles.popCoverImage} source={{ uri: 'https://picsum.photos/540' }} />

    <Card.Content style={{marginTop: 10}}>
      <Text style={styles.mainText} variant="titleLarge">Food name</Text>
      <Text variant="bodyMedium">£10/portion</Text>

      <View style={{flex:1,flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      <Avatar.Icon size={25} icon="apple" style={styles.catIcon}/>
      <Text style={{marginLeft: 5}} variant="bodyMedium">Vegetables</Text>

      <Button mode='contained' style={{marginLeft: 40}} icon="cart" > Add  </Button>
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