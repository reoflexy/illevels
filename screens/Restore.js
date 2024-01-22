import { StyleSheet, View,Image,NativeSyntheticEvent,TextInputChangeEventData,TouchableNativeFeedback} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Text,TextInput,Button,ActivityIndicator,Banner,Portal, Modal, Avatar} from 'react-native-paper'
import {logo,Logo} from '../Constants/images'
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const Restore = () => {
  const {colors} = useTheme()
  const navigation = useNavigation()

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const showModal = () => setVisible2(true);
  const hideModal = () => setVisible2(false);

  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('')
  const [visible,setVisible] = useState(false)
  const [visible2,setVisible2] = useState(true)
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const [secure1,setSecure1] = useState(true)

  const toggleSec1 = () => {
    setSecure1(!secure1)
  }

  const handleEmail = (text) => {
    setEmail(text);
  }

  const handlePassword = (text) => {
    setPassword(text);
  }

  const handleRecover= async () => {
    // validate info 

     if(email == "" || (!regexEmail.test(email))){
      setVisible(true)
      return setError('Enter Valid Email!');
    
  }


  setVisible(false)
  setError('');
  setLoading(true);

    // initialise firebase auth
   await auth().sendPasswordResetEmail(email)
    .then(() => {
        setLoading(false)
        setVisible2(true)
        return setSuccess('A password recovery email has been sent to your address, kindly follow to receover your account.')
      


    })
    .catch((err) => {
      setLoading(false)
      setVisible(true)
      console.log("errorss",err)
        return setError('Unable to receover account, check credentials and retry.')

    })
   
    
  }


  return (
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
        <Image style={{width: 50,height: 50}} source={logo} />
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
         navigation.navigate('Login')
          
         }}>
        <Button  mode='outlined' style={{marginTop: 20, width: '50%', alignSelf: 'center'}}><Text style={{textTransform: 'none'}}>Close</Text> </Button>
        </TouchableNativeFeedback>
        </View>

        </Modal>

      </Portal>}


      <View style={styles.formView}>
      
      <TextInput 
      mode='outlined'
      label='Email'
      onChangeText={handleEmail}
      value={email}
      disabled={loading}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

      

      <TouchableNativeFeedback onPress={handleRecover}>
            <Button style={styles.submitBtn} mode='contained' >Recover</Button>
      </TouchableNativeFeedback>
       
      
      </View>
      
    </View>
  )
}

export default Restore

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
    marginTop: 10,
  },
  inputStyle: {
    width: 320,
    alignSelf: 'center',
    borderRadius: 20,
    elevation: 0,
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
    elevation: 2,
    alignSelf: 'center'
  },
  alreadyBtn:{
    marginTop: 20,
    alignSelf: 'center',
  }



})