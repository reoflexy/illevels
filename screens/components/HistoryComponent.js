import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Avatar, Card, IconButton,MD3Colors } from 'react-native-paper';

export default function HistoryComponent(){
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
        <Text style={styles.dateText} variant="titleLarge">13/12/2024</Text>
      <Text style={{marginTop: 5, fontWeight: 'bold'}} variant="bodyMedium">x5 items (£20)</Text>



      <View style={{flex:1,flexDirection: 'row', alignItems: 'center'}}>
     
      
      <Text style={{margin: 3, color: 'green', fontWeight: 'bold'}} variant="bodyMedium">completed </Text>

      <Button
      style={{marginLeft: 13}}
    icon="cancel"
    iconColor='red'
    size={16}
    mode='outlined'
    textColor='red'
    onPress={() => console.log('Pressed')}
  >Cancel</Button>

  
 

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
dateText: {
  fontSize: 10
},

})