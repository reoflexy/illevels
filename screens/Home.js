import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import CatItem from './components/CatItem';
import PopularItem from './components/PopularItem';
import NewestItem from './components/NewestItem';

export default function Home(){
 
 
    return (
      <ScrollView  style={styles.homeStyle}>
     

            {/* categories */}
            {/* replace with mapping from categories from data list */}
            <View style={styles.catStyle}> 
            <CatItem />
            <CatItem />
            <CatItem />
            <CatItem />

            </View>
            
            <View>
              <Text style={styles.popHeader}>Popular Items</Text>
            </View>

            {/* popular items */}
          <ScrollView horizontal={true}>
           
          <View style={styles.popStyle}>
          <PopularItem />
          <PopularItem />
          <PopularItem />
          </View>

          </ScrollView>

          {/* newest items */}
          <View>
              <Text style={styles.newHeader}>Newest Items</Text>
            </View>
          <View>
            <NewestItem />
          </View>

        
     
      </ScrollView>
    
  )

}
const styles = StyleSheet.create({
homeStyle: {
flex: 1,
flexDirection: 'column',
width: '100%',
height: '100%',
},
catStyle: {
    flex: 0.15,
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
},
popStyle: {
  flex: 0.3,
  flexDirection: 'row',
  width: '100%',
  marginTop: 10,
},
popHeader: {
  marginLeft: 20,
  fontSize: 17,
  marginTop: 20
},
newHeader: {
  marginLeft: 20,
  fontSize: 17,
  marginTop: 20
}
})