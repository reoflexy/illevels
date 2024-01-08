import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Avatar } from 'react-native-paper';

export default function CatItem(){
 
 
    return (
      <View style={styles.catStyle} >

<Avatar.Icon size={60} icon="apple" style={styles.catIcon}/>
        <Text style={styles.catText}>  Home </Text>
      </View>
    
  )

}
const styles = StyleSheet.create({
catStyle: {
flex: 0.25,
alignItems: 'center',
margin: 2,
borderRadius: 5
},
catText: {
    marginTop: 5,
},
catIcon: {
    marginTop: 2,
}
})