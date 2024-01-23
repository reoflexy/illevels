import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Button, Avatar } from 'react-native-paper';

export default function CatItem({category, navigation}){
 
  function toCat() {
    navigation.navigate(category.link)
  }
 
    return (
      
      <View style={styles.catStyle} >
        <TouchableOpacity  onPress={toCat}>
<View>
<Avatar.Icon size={60} icon={category.icon} style={styles.catIcon}/>
        <Text style={styles.catText}> {category.name} </Text>
        </View>
        </TouchableOpacity>
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
    textAlign: 'center'
},
catIcon: {
    marginTop: 2,
}
})