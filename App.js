/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect, useContext, useCallback} from 'react';
import SplashScreen from 'react-native-splash-screen'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider,AuthContext} from './config/AuthContext'

import CartState from './Context/Cart/CartState'

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import { PaperProvider,DefaultTheme } from 'react-native-paper';
import { initStripe } from '@stripe/stripe-react-native';

import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import CartPage from './screens/CartPage';
import HistoryPage from './screens/HistoryPage';
import Restore from './screens/Restore';
import Profile from './screens/Profile';
import MenuPage from './screens/MenuPage';
import Contact from './screens/Contact';
import Checkout from './screens/Checkout';
import AddMenu from './screens/AddMenu';
import AdminMenuPage from './screens/AdminMenuPage';
import AdminOrdersPage from './screens/AdminOrdersPage';
import AdminStats from './screens/AdminStats';
import OrderDetails from './screens/OrderDetails';
//import {PUBLISHABLE_KEY} from '@env'
import { Linking } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import Config from 'react-native-config';
import { theme } from './Constants';

const Stack = createNativeStackNavigator();


// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// type StackParamList = {
//   //CheckScreen: {name: String} | undefined
//   //Walkthrough: {name: String} | undefined
//   //SignIn: {name: String} | undefined
// }

// type DrawerParamList = {
//   //Admin: {name:String} | undefined
// }

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }


function App(){
  const isDarkMode = useColorScheme() === 'dark';
  const {loggedIn,currentUser} = useContext(AuthContext);
  const { handleURLCallback } = useStripe();

  const theme = {
    ...DefaultTheme,
    dark: false,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      // primary: '#3498db',
      // accent: '#f1c40f',
    },
  };

  const handleDeepLink = useCallback(
    async (url) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);


  useEffect(() => {
    SplashScreen.hide();
  
    initStripe({
      publishableKey: "pk_live_51OcnpqAsm3BGODEDlrrATfxXvKn9svvarqoRniXatzuoJFQ4APgTnj9Nn78dMjTR7Z6kb9jANpgdHfq3G1tkAMde00aL54lpob",
      //publishableKey: Config.PUBLISHABLE_KEY.toString(),
      // merchantIdentifier: 'merchant.identifier',
       urlScheme: "illevels",
    });
  },[])

 

  return (
   <NavigationContainer>
    {  (loggedIn == true && (currentUser.emailVerified !== false && currentUser.emailVerified !== null )) ?   

//logged in screens
 
    <CartState>


      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home'}}
        />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        <Stack.Screen
          name="History"
          component={HistoryPage}
          options={{title: 'History'}}
        />   
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />  
        <Stack.Screen
          name="AdminMenuPage"
          component={AdminMenuPage}
          options={{title: 'AdminMenuPage'}}
        /> 
       <Stack.Screen
          name="AdminOrdersPage"
          component={AdminOrdersPage}
          options={{title: 'AdminOrdersPage'}}
        /> 
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{title: 'OrderDetails'}}
        /> 
         <Stack.Screen
          name="AdminStats"
          component={AdminStats}
          options={{title: 'AdminStats'}}
        /> 
        <Stack.Screen
          name="Menu"
          component={MenuPage}
          options={{title: 'Menu'}}
        />   
         <Stack.Screen
          name="Cart"
          component={CartPage}
          options={{title: 'Cart'}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{title: 'Checkout'}}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{title: 'Contact'}}
        />
        <Stack.Screen
          name="AddMenu"
          component={AddMenu}
          options={{title: 'AddMenu'}}
        />
      </Stack.Navigator>
    </CartState>
   
    :
    //non logged in screens
    <CartState>
    <Stack.Navigator initialRouteName='Login'>
    
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'SignUp'}}
        />
    <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
   
      <Stack.Screen
          name="Restore"
          component={Restore}
          options={{title: 'Recover Password'}}
        />
 
  </Stack.Navigator>
  </CartState>
     
  
    }
   </NavigationContainer>
  
  )
}

const Jsx = () =>(
 
  <AuthProvider>
    
   <PaperProvider theme={theme}>

  
   <App />

   </PaperProvider>
  
    
  
  {/* <Text>New text</Text> */}
</AuthProvider> 

);

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Jsx;
