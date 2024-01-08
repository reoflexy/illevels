import { StyleSheet, View,Image,NativeSyntheticEvent,TextInputChangeEventData,TouchableNativeFeedback, } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Text,TextInput,Button,ActivityIndicator,Banner} from 'react-native-paper'
import {logo,Logo} from '../Constants/images'
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const Login = () => {
  const {colors} = useTheme()
  const navigation = useNavigation()

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

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

  const handleLogin = async () => {
    // validate info 

     if(email == "" || (!regexEmail.test(email))){
      setVisible(true)
      return setError('Enter Valid Email!');
    
  }


  if(password.length < 8){
      setVisible(true)
    return setError('Password must be 8 chracters minimum!');
  }

  setVisible(false)
  setError('');
  setLoading(true);

    // initialise firebase auth
   await auth().signInWithEmailAndPassword(email,password)
    .then((userCredential) => {
      if(userCredential.user.emailVerified == false){
        auth().signOut();
        setLoading(false)
        setVisible(true)
        return setError('This email is not verified yet.')
      }


    })
    .catch((err) => {
      auth().signOut();
      setLoading(false)
      setVisible(true)
      console.log("errorss",err)
        return setError('Unable to sign in, check credentials and retry.')

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

      <View style={styles.formView}>
      
      <TextInput 
      mode='outlined'
      label='Email'
      onChange={handleEmail}
      value={email}
      disabled={loading}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

      <TextInput 
      mode='outlined'
      label='Password'
      onChange={handlePassword}
      value={password}
      disabled={loading}
      outlineColor='#2D1148'
      secureTextEntry = {secure1}
      right={<TextInput.Icon onPress={toggleSec1} icon="eye" />}
      style={styles.inputStyle}
      />

      <TouchableNativeFeedback onPress={handleLogin}>
            <Button style={styles.submitBtn} mode='contained' >Login</Button>
      </TouchableNativeFeedback>
       
      <Button onPress={() => navigation.navigate('SignUp')}  style={styles.alreadyBtn} >I dont have an account</Button>
      
      </View>
      
    </View>
  )
}

export default Login

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