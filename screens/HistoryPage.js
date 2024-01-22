import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import CatItem from './components/CatItem';
import PopularItem from './components/PopularItem';
import NewestItem from './components/NewestItem';
import CartComponent from './components/CartComponent';
import HistoryComponent from './components/HistoryComponent';

export default function HistoryPage(){
 
 
    return (
    
      
      <ScrollView>

<HistoryComponent />
{/* 
<View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
  <Text style={{fontSize: 20}}>Sub Total (5 items): </Text>
  <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20}}>£2000</Text>
</View>

<View style={{flexDirection: 'row', justifyContent: "center", padding: 10, marginTop: 10}}>
  <Button mode="contained" 
  style={{width: '80%'}}
  >Checkout</Button>
</View> */}
      </ScrollView>
        
  )

}
const styles = StyleSheet.create({

})