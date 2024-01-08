import React, {createContext, useState, useEffect,useMemo} from 'react';
import {v4 as uuid} from 'uuid/';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import functions from '@react-native-firebase/functions'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState("");
  const [dbUser, setDbUser] = useState();
  const [loading,setLoading] = useState()
  const [loggedIn,setLoggedIn] = useState("")
  const [isAdmin,setIsAdmin] = useState(false)
  const finalValue = useMemo(() => ({
    currentUser,
    dbUser,
    isAdmin,
    loggedIn,setLoggedIn,
  }), [currentUser,dbUser,loggedIn,isAdmin])

  const [err, setErr] = useState();


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
       //get current network time

      
     
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
         //get user from database
         firestore().collection("users").where("email", "==", user.email)
         .onSnapshot((querySnapshot) => {
             querySnapshot.forEach((doc) => {
                 // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                 setDbUser(doc.data())
                 console.log(doc.data())
                 setCurrentUser(user)
                 setLoggedIn(true)
                 setLoading(false)
               
             });
         })

         user.getIdTokenResult().then((idTokenResult) => {
          console.log(idTokenResult.claims)
            if(idTokenResult.claims.admin){
              setIsAdmin(true)
               
            }
           
    
          }).catch((err) => {
            console.log(err)
            setLoading(false)
          })
         
       
       // setLoading(false)
        
       
        
         AsyncStorage.setItem('user_email', user.email)
         console.log(user.email)

              // ...
      }
       else {
         console.log("No user")
        setLoggedIn(false)
        setLoading(false)
      }

    });
    return () => {
      unsubscribe();
    }

  },[]);

     

    return (
      <AuthContext.Provider value={finalValue}>
          {loading == false ? children : null}
      </AuthContext.Provider>
       )
  
}






 

   



