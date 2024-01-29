/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect, useContext} from 'react';
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

import { PaperProvider } from 'react-native-paper';
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
//import {PUBLISHABLE_KEY} from '@env'

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


  useEffect(() => {
    SplashScreen.hide();
  
    initStripe({
      publishableKey: "pk_test_qblFNYngBkEdjEZ16jxxoWSM",
      //publishableKey: PUBLISHABLE_KEY,
      // merchantIdentifier: 'merchant.identifier',
      // urlScheme: "your-url-scheme",
    });
  },[])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
          name="Contact"
          component={Contact}
          options={{title: 'Contact'}}
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
    
   <PaperProvider>

  
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
