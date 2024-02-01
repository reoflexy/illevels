import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Avatar, Card } from 'react-native-paper';

export default function NewestItem({item,navigation, image}){
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
 
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
      <Text style={{marginTop: 10}} variant="bodyMedium">£{item.price} / {item.measure}</Text>

      <View style={{flex:1,flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
      <Avatar.Icon size={25} icon="apple" style={styles.catIcon}/>
      <Text style={{marginLeft: 5}} variant="bodyMedium">{item.category}</Text>

      </View>

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