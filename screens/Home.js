import React, { Component, useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet,ScrollView, TouchableNativeFeedback } from 'react-native';
import { Button, FAB, ActivityIndicator} from 'react-native-paper';
import CatItem from './components/CatItem';
import PopularItem from './components/PopularItem';
import NewestItem from './components/NewestItem';
import { categories, categoriesAdmin } from '../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../config/AuthContext';
import Toast from 'react-native-simple-toast'
import CartContext from '../Context/Cart/CartContext';
import storage from '@react-native-firebase/storage';

export default function Home({navigation}){
 // const navigation = useNavigation()
  const {currentUser,dbUser,loggedin} = useContext(AuthContext)
  const {AddToCart,removeItem,cartItems} = useContext(CartContext)
  const [menuData,setMenuData] = useState([])
  const  [imagesData,setImagesData] = useState([])
  const [newestData,setNewestData] = useState([])
  const [newestImg,setNewestImg] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('');
  const [success,setSuccess] = useState(false)
  const [visible,setVisible] = useState(false)


 useEffect(() => {
  setLoading(true)

  //const loadNew =
   firestore().collection("menu")
   //.where("email","==",currentUser.email)
   .orderBy("added","desc")
   //.orderBy('name','desc')
   .get()
   .then((querySnapshot) => {
     if(querySnapshot.empty){
        setError("No Items")
        setLoading(false)
        return Toast.show("No Menu items");
     }
   const menuArray = [];
   const imagesArray = [];
   let url = ''
   querySnapshot.forEach(async(doc) => {
    //fetch url from storage
     
     menuArray.push(doc.data());
    //  const url = await storage().ref('images/menu/'+doc.data().photo).getDownloadURL();
    //  console.log(url)
     
     
   })

   setNewestData(menuArray)
   //console.log(imagesArray)

   //sort menu to get popular items array
   var newItems = [];
   for (var i = 0; i < 10; i++) {
    var idx = Math.floor(Math.random() * menuArray.length);
    newItems.push(menuArray[idx]);
    menuArray.splice(idx, 1);
  }
   
  
   setMenuData(newItems)
   //console.log(newItems)
   setLoading(false);
   
   })
   .catch((error) => {
    return Toast.show("Error fetching data");
   })
 
 
 
//  return () => {
//  loadNew();
//  };
 },[])
 
    return (
      <View>
      <ScrollView  >
        <View style={styles.homeStyle}>
     {loading == true  &&  <View >
       <ActivityIndicator size={42} />
      </View>}

            {/* categories */}
            {/* replace with mapping from categories from data list */}
            <View style={styles.catStyle}> 
            {dbUser.role !== 'customer' ? categories.map((item,index) => {
              return(
                
                <CatItem navigation={navigation} key={item.id} category={item} />
               
              )
            })
            :
            categoriesAdmin.map((item,index) => {
              return(
                
                <CatItem navigation={navigation} key={item.id} category={item}  />
               
              )
            })
            
            }
            
            {/* <CatItem />
            <CatItem />
            <CatItem /> */}

            </View>
            
            <View>
              <Text style={styles.popHeader}>Popular Items</Text>
            </View>

            {/* popular items */}
          <ScrollView horizontal={true}>
           
          <View style={styles.popStyle}>

          {menuData.map((item,index) => {
              return(
                
                // <CatItem navigation={navigation} key={index} category={{name: item}} />
                <PopularItem navigation={navigation} key={index} item={item} />
              )
            })}
          </View>

          </ScrollView>

          {/* newest items */}
          <View>
              <Text style={styles.newHeader}>Newest Items</Text>
            </View>
          <View>
          {newestData.slice(0, 10).map((item,index) => (
    
          <NewestItem navigation={navigation} key={index} item={item}  />
           ))}
           
          </View>

          
     </View>
      </ScrollView>

<FAB
icon="cart"
style={styles.fab}
label={cartItems.length > 0 ? cartItems.length.toString() : "" }
onPress={() => navigation.navigate('Cart')}
/>
</View>
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
},
fab: {
  position: 'absolute',
  margin: 16,
  right: 0,
  bottom: 0,
},
})