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

import {createNativeStackNavigator} from '@react-navigation/native-stack';

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


const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
};

const Profile = ({navigation}) => {
  return (
    <Button
      title="Jane's profile"
      onPress={() =>
        navigation.navigate('Home', {name: 'Home'})
      }
    />
  );
};


function App(){
  const isDarkMode = useColorScheme() === 'dark';
  const {loggedIn,currentUser} = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.hide();
  },[])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
   <NavigationContainer>
    {  (loggedIn == true && (currentUser.emailVerified !== false && currentUser.emailVerified !== null )) ?   

//logged in screens
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
 
    :
    //non logged in screens
    <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Welcome'}}
    />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
     
  
    }
   </NavigationContainer>
  
  )
}

const Jsx = () =>(
  <AuthProvider>
   
    <App />
    
  
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
