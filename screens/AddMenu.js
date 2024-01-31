import { StyleSheet, View,Image,TouchableNativeFeedback, ScrollView } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { Text,TextInput,Button,Banner,ActivityIndicator,Provider,Portal,Modal, Avatar} from 'react-native-paper'
import {logo,Logo} from '../Constants/images'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import CartContext from '../Context/Cart/CartContext';
import { SelectList } from 'react-native-dropdown-select-list'

const AddMenu = () => {

  const navigation = useNavigation()
  //const {CartItems} = useContext(CartContext)
  const {cartItems} = useContext(CartContext)
  //console.log(cartItems.length)

  const data = [
    {key:'1', value:'Tubers', disabled:false},
    {key:'1', value:'Meat', disabled:false},
    {key:'1', value:'Vegetables', disabled:false},
    {key:'1', value:'Fish', disabled:false},
    {key:'1', value:'Fruits', disabled:false},
    ]

  const measureData = [
    {key:'1', value:'Weight (kg)', disabled:false},
    {key:'1', value:'Count (number)', disabled:false},
    ]

  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [measure,setMeasure] = useState('');
  const [price,setPrice] = useState('');
  const [stock,setStock] = useState('');

  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('')
  const [visible,setVisible] = useState(false)
  const [visible2,setVisible2] = useState(true)

  const [secure1,setSecure1] = useState(true)
  const [secure2,setSecure2] = useState(true)

  const showModal = () => setVisible2(true);
  const hideModal = () => setVisible2(false);
  //const containerStyle = {backgroundColor: 'white', padding: 20};
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const toggleSec1 = () => {
    setSecure1(!secure1)
  }

  const toggleSec2 = () => {
    setSecure2(!secure2)
  }

  // state setters
  const handleName = (text) => {
    setName(text);
  }
  const handleCategory = (text) => {
    setCategory(text);
  }

  const handleMeasure = (text) => {
    setCategory(text);
  }

  const handlePrice = (text) => {
    setPrice(text);
  }

  const handleStock = (text) => {
    setStock(text);
  }


  const handleSave = async () => {
    // validate info 
    if(name == "" || name == null){
         setVisible(true);
        return setError('Enter Item name')
    }

    if(category == "" || category == null){
      setVisible(true);
     return setError('Enter Item category')
 }

 if(measure == "" || measure == null){
  setVisible(true);
 return setError('Enter Item measurement')
}


if(price == "" || price == null){
  setVisible(true);
 return setError('Enter Item price')
}

if(stock == "" || stock == null){
  setVisible(true);
 return setError('Enter Item stock')
}

  setVisible(false)
  setError('');
  setLoading(true);

  let menuId = "#"+name.replace(/\s+/g, '')+Math.floor(Math.random() * (9999999887-11111102) +11111002)

  await firestore().collection("menu").doc(menuId).set({
    added: new Date(),
    category: category,
    count: 1,
    stock: parseInt(stock),
    measure: measure == 'Weight (kg)' ? 'kg': 'portion',
    name: name,
    photo: name.replace(/\s+/g, '')+'.png',
    price: price,
    itemId: menuId

  })
  .then(() => {
    setLoading(false)
    setVisible2(true)
    setName('')
    setCategory('')
    setMeasure('')
    setPrice('')
    setStock('')
    setSuccess('Item saved successfully')
   
  })
  .catch((err) => {
        console.log(err)
        setLoading(false)
        setVisible(true)
       return setError('Error saving item')
})
  }


    
    
  
 

  return (
    
    <ScrollView >
    <View style={styles.mainView}>
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Ok',
          onPress: () => setVisible(false),
        },
      ]}
      icon={({size}) => (
        <Image
          source={Logo}
          style={{
            width: size,
            height: size,
          }}
        />
      )}>
      {error}
    </Banner>

      <View style={styles.logoView}>
        <Text>Add Menu Item</Text>
      </View>

    {loading == true  &&  <View >
       <ActivityIndicator size={42} />
      </View>}

    {success !== "" &&  <Portal>
        <Modal visible={visible2} dismissable={false} onDismiss={hideModal} contentContainerStyle={{margin: 20,padding: 20,backgroundColor: 'white',borderRadius: 5,elevation: 1,}}>
        <View style={{flexDirection: 'column'}}>
        <View style={{alignSelf: 'center'}}>
        <Avatar.Icon icon="check" />
        </View>
        <Text style={{textAlign: 'center',marginTop: 20}}>{success} </Text>
       <TouchableNativeFeedback 
       
       onPress={() => {
         setSuccess('')
        setVisible2(false)
         navigation.navigate('Home')
          
         }}>
        <Button  mode='outlined' style={{marginTop: 20, width: '50%', alignSelf: 'center'}}><Text style={{textTransform: 'none'}}>Login</Text> </Button>
        </TouchableNativeFeedback>
        </View>

        </Modal>

      </Portal>}

      




      <View style={styles.formView}>
      {/* <Text>{CartItems.length} </Text> */}
      <TextInput 
      mode='outlined'
      label='Name'
      onChangeText={handleName}
      value={name}
      disabled={loading}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

    <SelectList 
          setSelected={(val) => setCategory(val)} 
          boxStyles={styles.inputStyle}
          data={
            data 
          } 
          disabled={loading}
          save="value"
          placeholder='select category'
      />

<SelectList 
          setSelected={(val) => setMeasure(val)} 
          boxStyles={styles.inputStyle}
          data={
            measureData 
          } 
          disabled={loading}
          save="value"
          placeholder='select measurement'
      />

<TextInput 
      mode='outlined'
      label='Price'
      onChangeText={handlePrice}
      value={price}
      disabled={loading}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

    <TextInput 
      mode='outlined'
      label='Stock'
      onChangeText={handleStock}
      value={stock}
      disabled={loading}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />
  

      <TouchableNativeFeedback onPress={handleSave}>
      <Button disabled={loading} style={styles.submitBtn} mode='contained' > Save </Button>
      </TouchableNativeFeedback>
     
      </View>
      
    </View>
    </ScrollView>
   

  )
}

export default AddMenu

const styles = StyleSheet.create({
  mainView: {
flex: 1,
flexDirection: 'column',
  },
  logoView: {
    height: 50,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formView: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 5,
    marginTop: 0,
  },
  inputStyle: {
    width: 320,
    alignSelf: 'center',
    borderRadius: 20,
    elevation:0,
    shadowRadius: 3,
    marginTop: 10
  },
  termsText: {
    textAlign:'center',
    fontSize: 12,
    marginTop: 10,
    padding: 10
  },
  submitBtn: {
    width: 250,
    marginTop: 10,
    alignSelf: 'center',
    elevation: 2
  },
  alreadyBtn:{
    marginTop: 20,
    alignSelf: 'center'
  }



})