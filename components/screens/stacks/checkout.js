import { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView,SafeAreaView,StyleSheet, Text, View,TouchableOpacity,Image,Button } from 'react-native';
import { collection, query, where, getDocs,getFirestore } from "firebase/firestore";

import { useSelector,useDispatch } from 'react-redux';

import { selectCount,plus,minus } from '../../../reduxModern/reducer/cartSlice';

export default function Checkout_Screen(props){

const dispatch = useDispatch();

console.log({props})
return (

<SafeAreaView>
    <ScrollView>

<View></View>
    

    </ScrollView>
</SafeAreaView>

)
}

const styles = StyleSheet.create({
    container: {
      width:'90%',
      backgroundColor: 'white',
      marginTop:10,
      marginLeft:'5%',
      cursor:'pointer',
      borderRadius:2
    },
    Info: {
    padding:15,
    justifyContent: 'center',
     flex: 1 
    }
    ,
    headerTitle: {
        fontWeight:'bold',
        fontSize:15
    },
    productImage: {
  
      height:200
    }
    ,
    btn: {
        backgroundColor:'#33b5e5',
        color:'white',
          margin: 10,
        fontSize: 20,
        width: 80,
        height: 40,
        padding: 5,
        borderRadius: 4,
        transition: 0.5,
        marginTop:10,
        marginLeft:'1%',
        cursor:'pointer',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'

    }
  });