import { StyleSheet, View,Image,TouchableNativeFeedback, ScrollView } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { Text,TextInput,Button,Banner,ActivityIndicator,Provider,Portal,Modal} from 'react-native-paper'
import {logo,Logo} from '../Constants/images'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import CartContext from '../Context/Cart/CartContext';


const SignUp = () => {

  const navigation = useNavigation()
  //const {CartItems} = useContext(CartContext)
  const {cartItems} = useContext(CartContext)
  //console.log(cartItems.length)

  const [firstname,setFirstName] = useState('');
  const [lastname,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('');
  const [password,setPassword] = useState('');
  const [password2,setPassword2] = useState('');

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
  const handleFirstName = (text) => {
    setFirstName(text);
  }
  const handleLastName = (text) => {
    setLastName(text);
  }
  const handleEmail = (text) => {
    setEmail(text);
  }

  const handleMobile = (text) => {
    setMobile(text);
  }
  const handlePassword = (text) => {
    setPassword(text);
  }

  const handlePassword2 = (text) => {
    setPassword2(text);
  }

  const handleSignUp = async () => {
    // validate info 
    if(firstname == "" || firstname == null){
         setVisible(true);
        return setError('Enter Firstname')
    }

    if(lastname == "" || lastname == null){
      setVisible(true);
      return setError('Enter Lastname')
     }

     if(lastname == "" || lastname == null){
      setVisible(true);
      return setError('Enter Lastname')
     }

     if(email == "" || (!regexEmail.test(email))){
      setVisible(true)
      return setError('Enter Valid Email!');
    
  }

  if(mobile == "" || (mobile.length < 11)){
      setVisible(true)
    return setError('Enter Valid Mobile Number!');
  }

  if(password.length < 8){
      setVisible(true)
    return setError('Password must be 8 chracters minimum!');
  }

  if(password != password2){
      setVisible(true)
    return setError('Password Mismatch!');
  }

  setVisible(false)
  setError('');
  setLoading(true);

    // initialise firebase auth
    await auth().createUserWithEmailAndPassword(email,password)
    .then(async(userCredentials) => {
       await userCredentials.user.sendEmailVerification()
    
      //  const addRole = functions().httpsCallable('addAdminRole')
      //  await addRole({email: email}).then((result) => {
      //  console.log(result)
      //  })
    
       .then(async() => {
        await firestore().collection("users").doc(userCredentials.user.uid).set({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          role: "customer",
          mobile: mobile,
          joined: new Date(),
          userId: userCredentials.user.uid,
         // wallets: 

        })
        .then(() => {
          auth().signOut();
          setLoading(false)
          setVisible2(true)
         setSuccess('Welcome to TradePapi. A verification email has been sent to your address.Verify and proceed to Login')
        
         
        })
        .catch((err) => {
              console.log(err)
              setLoading(false)
              setVisible(true)
             return setError('Error registering User')
      })
       })
       .catch((err) => {
        setVisible(true)
        console.log('unable to send verification mail',err)
       return setError('Error')
       })

      // create bitgo wallet later
  
        

    })
    .catch((error) => {
      if(error.code === 'auth/email-already-in-use'){
        setVisible(true)
        console.log('email is already used')
       return setError('email is already used')
      }

      if(error.code === 'auth/invalid-email'){
        console.log('email is invalid')
        setVisible(true)
       return setError('email is invalid, check email and try again')
      }
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
        <Image style={{width: 50,height: 50}} source={logo} />
      </View>

    {loading == true  &&  <View >
       <ActivityIndicator size={42} />
      </View>}

    {success !== "" &&  <Portal>
        <Modal visible={visible2} dismissable={false} onDismiss={hideModal} contentContainerStyle={{margin: 20,padding: 20,backgroundColor: 'white',borderRadius: 5,elevation: 1}}>
        <View style={{alignSelf: 'center'}}>
        <Image source={logo} />
        </View>
        <Text style={{textAlign: 'center',marginTop: 20}}>{success} </Text>
       <TouchableNativeFeedback onPress={() => {
         setSuccess('')
        setVisible2(false)
         navigation.navigate('Login')

         }}>
        <Button mode='contained' style={{marginTop: 20}}><Text style={{textTransform: 'none',color: 'white'}}>Login</Text> </Button>
        </TouchableNativeFeedback>
        </Modal>
      </Portal>}




      <View style={styles.formView}>
      {/* <Text>{CartItems.length} </Text> */}
      <TextInput 
      mode='outlined'
      label='Firstname'
      onChange={handleFirstName}
      value={firstname}
      disabled={loading}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

    <TextInput 
      mode='outlined'
      label='Lastname'
      onChange={handleLastName}
      disabled={loading}
      value={lastname}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

      <TextInput 
      mode='outlined'
      disabled={loading}
      label='Email'
      onChange={handleEmail}
      value={email}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

    <TextInput 
      mode='outlined'
      disabled={loading}
      label='Mobile'
      onChange={handleMobile}
      value={mobile}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

      <TextInput 
      mode='outlined'
      label='Password'
      secureTextEntry = {secure1}
      right={<TextInput.Icon onPress={toggleSec1} icon="eye" />}
      disabled={loading}
      onChange={handlePassword}
      value={password}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

    <TextInput 
      mode='outlined'
      label='Cofirm Password'
      onChange={handlePassword2}
      secureTextEntry = {secure2}
      right={<TextInput.Icon onPress={toggleSec2} icon="eye" />}
      disabled={loading}
      value={password2}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />
      <Text style={styles.termsText} >By signing up, you hereby agree to our terms and conditions of service.</Text>

      <TouchableNativeFeedback onPress={handleSignUp}>
      <Button disabled={loading} style={styles.submitBtn} mode='contained' >Signup</Button>
      </TouchableNativeFeedback>
      <Button disabled={loading} onPress={() => navigation.navigate('Login')} style={styles.alreadyBtn} >I already have an account</Button>

      </View>
      
    </View>
    </ScrollView>
   

  )
}

export default SignUp

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