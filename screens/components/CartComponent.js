import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Avatar, Card, IconButton,MD3Colors } from 'react-native-paper';

export default function CartComponent(){
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
 
    return (
      <View style={styles.popStyle} >

            
<Card  style={{margin: 5}}>
    <Card.Content style={styles.cardStyle}>
        <View style={{flex: 0.4}}>
        <Image
        style={{width: 100, height: 100, borderRadius: 5}}
        source={{
          uri: 'https://picsum.photos/540',
        }}
      />
        </View>

        <View style={{flex: 0.6}}>
        <Text style={styles.mainText} variant="titleLarge">Food name</Text>
      <Text style={{marginTop: 5, color: 'green', fontWeight: 'bold'}} variant="bodyMedium">£10/portion</Text>

      <View style={{flex:1,flexDirection: 'row', alignItems: 'center'}}>
      <IconButton
    icon="minus"
    iconColor={MD3Colors.primary0}
    size={14}
    mode='contained'
    onPress={() => console.log('Pressed')}
  />
      <Text style={{margin: 10}} variant="bodyMedium">1</Text>
      <IconButton
    icon="plus"
    iconColor={MD3Colors.primary0}
    size={14}
    mode='contained'
    onPress={() => console.log('Pressed')}
  />


    
 

      </View>


      <View style={{flex:1,flexDirection: 'row', alignItems: 'center'}}>
     
      <Text style={{margin: 10}} variant="bodyMedium">Price: </Text>
      
      <Text style={{margin: 3, color: 'green', fontWeight: 'bold'}} variant="bodyMedium">£20 </Text>

      <IconButton
      style={{marginLeft: 60}}
    icon="delete"
    iconColor='red'
    size={16}
    mode='contained'
    onPress={() => console.log('Pressed')}
  />
 

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