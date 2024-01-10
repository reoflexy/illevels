import React, {createContext, useState, useContext, useEffect,useMemo} from 'react';

export const GalleryContext = createContext();

export function GalleryProvider({children}) {
    const [search, setSearch] = useState(sessionStorage.getItem('search') );
    const [category, setCategory] = useState(sessionStorage.getItem('category') );
    const [details, setDetails] = useState(JSON.parse(sessionStorage.getItem('gallerydetail')));
    const [loading,setLoading] = useState(true)

    useEffect(() => {

    },[]);

    // var retrievedObject = localStorage.getItem('testObject') ;

    // console.log('retrievedObject: ', JSON.parse(retrievedObject));

    const finalValue = useMemo(() => ({
        search,setSearch,
        category,setCategory,
        details,setDetails,
    }), [search,category,details])
  
    const [err, setErr] = useState();
  
  
   
    //setCurrentUser(firebase.auth().currentUser);
  
      return (
        <GalleryContext.Provider value={finalValue}>
            {children}
        </GalleryContext.Provider>
         )
    
  }
