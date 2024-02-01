import { StyleSheet, View,Image,TouchableNativeFeedback, ScrollView, Text } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { TextInput,Button,Banner,ActivityIndicator,Provider,Portal,Modal, Avatar} from 'react-native-paper'
import {logo,Logo} from '../Constants/images'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import CartContext from '../Context/Cart/CartContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'
import { SelectList } from 'react-native-dropdown-select-list'
import functions from '@react-native-firebase/functions';
import { useStripe } from '@stripe/stripe-react-native';
import { AuthContext } from '../config/AuthContext';

const Checkout = () => {

  const navigation = useNavigation()
  //const {CartItems} = useContext(CartContext)
  const {cartItems, emptyCart} = useContext(CartContext)
  const {currentUser,dbUser} = useContext(AuthContext)
  //console.log(cartItems.length)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [address,setAddress] = useState('');
  const [postCode,setPostCode] = useState('');
  const [deliveryDate,setDeliveryDate] = useState(new Date());
  const [deliveryTime,setDeliveryTime] = useState('');
  const [date, setDate] = useState('')
  const [open, setOpen] = useState(false)
  const [openTime, setOpenTime] = useState(false)
  const [cartAmount,setCartAmount] = useState( cartItems.reduce(
    (amount, cartItem) => parseFloat(cartItem.price*cartItem.count, 10) + amount,
    0
    ) )
  var firstDay = new Date();
  const nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('')
  const [visible,setVisible] = useState(false)
  const [showDate,setShowDate] = useState(false)
  const [visible2,setVisible2] = useState(true)

  const [secure1,setSecure1] = useState(true)
  const [secure2,setSecure2] = useState(true)

  const showModal = () => setVisible2(true);
  const hideModal = () => setVisible2(false);
  
  const data = [
    {key:'1', value:'10am', disabled:false},
    {key:'1', value:'11am', disabled:false},
    {key:'1', value:'12noon', disabled:false},
    {key:'1', value:'1pm', disabled:false},
    {key:'1', value:'2pm', disabled:false},
    {key:'1', value:'3pm', disabled:false},
    {key:'1', value:'4pm', disabled:false},
    {key:'1', value:'5pm', disabled:false},
    {key:'1', value:'6pm', disabled:false},
    {key:'1', value:'7pm', disabled:false},
    {key:'1', value:'8pm', disabled:false},
    {key:'1', value:'9pm', disabled:false},
    {key:'1', value:'10pm', disabled:false},
    ]
  const data2 = [
    {key:'1', value:'4pm', disabled:false},
    {key:'1', value:'5pm', disabled:false},
    {key:'1', value:'6pm', disabled:false},
    {key:'1', value:'7pm', disabled:false},
    {key:'1', value:'8pm', disabled:false},
    {key:'1', value:'9pm', disabled:false},
    {key:'1', value:'10pm', disabled:false},
    ]   

  
  //const containerStyle = {backgroundColor: 'white', padding: 20};
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const toggleSec1 = () => {
    setSecure1(!secure1)
  }

  const toggleSec2 = () => {
    setSecure2(!secure2)
  }

  // state setters
  const handleAddress = (text) => {
    setAddress(text);
  }
  const handlePostCode = (text) => {
    setPostCode(text);
  }
  const handledDate = (text) => {
    setDeliveryDate(text);
  }

  const handleTime = (text) => {
    setDeliveryTime(text);
  }


  const handleOrder = async () => {
    

 

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
         setSuccess('Thanks for Signing up. A verification email has been sent to your address.Verify and proceed to Login')
        
         
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


  const fetchPaymentSheetParams = async () => {

    const stripeFunction = functions().httpsCallable('stripeIntent')
    const response = await stripeFunction({email: currentUser.email, amount: cartItems.reduce(
      (amount, cartItem) => parseInt(cartItem.price*cartItem.count, 10) + amount,
      0
      )*100, cart: cartItems})
    //const response = await stripeFunction({email: currentUser.email})
    console.log(response.data)
    const { paymentIntent, ephemeralKey, customer,publishableKey} =  response.data;
    

    return {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "I-Levels",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: dbUser.firstname+' '+dbUser.lastname,
      }
    });
    if (!error) {
     // setLoading(true);
    }
    
  };

  const openPaymentSheet = async () => {
    // validate info 
    if(address == "" || address == null){
      setVisible(true);
     return setError('Enter Address')
    }

    if(postCode == "" || postCode == null){
      setVisible(true);
      return setError('Enter Post code')
      }

    if(deliveryDate == "" || deliveryDate == null){
      setVisible(true);
      return setError('Select delivery date')
      }

    if(deliveryTime == "" || deliveryTime == null){
      setVisible(true);
      return setError('Select delivery time')
      }

      setLoading(true)
    const { error } = await presentPaymentSheet();

    if (error) {
      //Alert.alert(`Error code: ${error.code}`, error.message);
      setLoading(false)
      console.log(error.message)
      return setError('Payment Failed')
    } else {
      //Alert.alert('Success', 'Your order is confirmed!');
      // run cloud function to add order
      const addOrderFunction = functions().httpsCallable('addOrder')
      await addOrderFunction({email: currentUser.email, cost: cartAmount, cart: cartItems, address: address, postcode: postCode, deliveryTime: deliveryTime, deliveryDate: deliveryDate.toLocaleDateString() })
      .then((res)=> {
        console.log(res)
        setLoading(false)
        console.log('success')
        emptyCart()
      return setSuccess('Payment Successful, your order has been placed')
      
      })
      .catch((err)=> {
        console.log(err)
        setLoading(false)
         return setError('Payment Successful, your order has been placed')
      })
      
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
 

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
        <Button  mode='outlined' style={{marginTop: 20, width: '50%', alignSelf: 'center'}}><Text style={{textTransform: 'none'}}>Ok</Text> </Button>
        </TouchableNativeFeedback>
        </View>

        </Modal>

      </Portal>}

      




      <View style={styles.formView}>
      {/* <Text>{CartItems.length} </Text> */}
      <Text style={{textAlign: 'center', marginTop: 20}}>Choose delivery adress, date and time</Text>
      <TextInput 
      mode='outlined'
      label=' Address'
      onChangeText={handleAddress}
      value={address}
      disabled={loading}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

    <TextInput 
      mode='outlined'
      label='Post code'
      onChangeText={handlePostCode}
      disabled={loading}
      value={postCode}
      outlineColor='#2D1148'
      style={styles.inputStyle}
      />

      <Button 
      mode='outlined'
      style={styles.inputStyle}
      onPress={() => setOpen(true)}
      >
       {deliveryDate == '' || deliveryDate == null ? 'Select date' : deliveryDate.toLocaleDateString()}
      </Button>

      {/* <Button 
      mode='outlined'
      style={styles.inputStyle}
      >
        Select time
      </Button> */}

      <DatePicker
        modal
        open={open}
        date={new Date()}
        mode='date'
        disabled={loading}
        minimumDate={new Date()}
        maximumDate={nextWeek}
        onConfirm={(date) => {
          //check date is valid year
          //console.log(date.getDay())
          if(date.getFullYear() !== 2024){
            setError('Pick a valid date')
            setOpen(false)
            return setVisible(true)
          }
          setDeliveryDate(date)
          setOpen(false)
          setOpenTime(false)
          setOpenTime(true)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

    {openTime &&  <SelectList 
          setSelected={(val) => setDeliveryTime(val)} 
          boxStyles={styles.inputStyle}
          data={
            deliveryDate.getDay() == 6 || deliveryDate.getDay() == 0 ? data : data2
          } 
          disabled={loading}
          save="value"
          placeholder='select time'
      />}

      <Text
      style={{textAlign:  'center', marginTop: 60, fontSize: 20}}
      >
       Amount Due : £{cartAmount}
     </Text>

     <Text
      style={{textAlign:  'center', marginTop: 20, fontSize: 20}}
      >
       Service charge : £{cartAmount > 30 ? 0 : 4 }
     </Text>

     <Text
      style={{textAlign:  'center', marginTop: 20, fontSize: 20, fontWeight: 'bold', color: 'green'}}
      >
       Total charge : £{cartAmount < 30 ? cartAmount+4 : cartAmount }
     </Text>

      <TouchableNativeFeedback
       //onPress={handleSignUp}
       >
      <Button
       disabled={loading}
       style={styles.submitBtn}
        mode='contained' 
        
        onPress={() => openPaymentSheet()}
        >
          Checkout</Button>
      </TouchableNativeFeedback>
     
      </View>
      
    </View>
    </ScrollView>
   

  )
}

export default Checkout

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