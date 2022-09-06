import React, { Component } from 'react';
import { ScrollView,SafeAreaView,StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { getApps,initializeApp } from 'firebase/app';
import { Provider } from 'react-redux';
import store from './reduxModern/store/store'
import Authentication from './components/auth/login';

import Main from './components/Main';




/* Initializing the firebase app and getting the analytics. */
const firebaseConfig = {
  apiKey: "AIzaSyBiB8RUl1EEQg5Wd5qg_rIVhjCit7hevfs",
  authDomain: "dnk-pharmacy.firebaseapp.com",
  projectId: "dnk-pharmacy",
  storageBucket: "dnk-pharmacy.appspot.com",
  messagingSenderId: "70465264809",
  appId: "1:70465264809:web:73d26e8c69c457de1c1db8",
  measurementId: "G-PKLTW5WXSM"
};


if(getApps().length < 1){
  const app = initializeApp(firebaseConfig);
}


// const analytics =  getAnalytics(app)
// console.log({analytics})

export class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
       loaded:true,
    }
  }

 componentDidMount(){

  const auth = getAuth();

   onAuthStateChanged(auth, (user) => {

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log({uid})
      this.setState(
        {
          loggedIn: true,
          loaded:true
        }
      )
      // ...
    } else {
      // User is signed out
      // ...
      this.setState(
        {
          loggedIn: false,
          loaded:true
        }
      )

    }

  });
 }

 render() {
  
   const {loggedIn, loaded} = this.state;

  /* This is a conditional rendering. If the state is not loaded, it will render the loading screen. */
   if (!loaded){
       return(
         <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
           <Text>Loading</Text>
         </View>
       )
   }

  /* This is a conditional rendering. If the user is not logged in, it will render the login screen. */
   if(!loggedIn){
   return (
     <Authentication />
   )
   }

/* Rendering the Main component. */
   return (
 <Provider store={store}>      
 <Main />
</Provider>


   )
 }
}

export default App;


