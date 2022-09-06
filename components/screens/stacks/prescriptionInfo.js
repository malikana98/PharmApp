import { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView,SafeAreaView,StyleSheet, Text, View,TouchableOpacity,Image,Button } from 'react-native';
import { collection, query, where, getDocs,getFirestore } from "firebase/firestore";

import { useSelector,useDispatch } from 'react-redux';

import { selectCount,plus,minus,clear } from '../../../reduxModern/reducer/cartSlice';

export default function Info(props){

const dispatch = useDispatch();
const count = useSelector(selectCount);

console.log({count})

let item = [
  {
  id:1,
  product:'Panado',
  qty:1,
  price:50,
  downloadURL:'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2938&q=80'

},
{
  id:2,
  product:'Flagyl',
  qty:1,
  price:100,
  downloadURL:'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80'

}
]

console.log({props})
return (

<SafeAreaView>
    <ScrollView>

    <View style={styles.container}>

    <View style={styles.Info}>
   
    <Image style={styles.productImage} source={{uri:'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80'}} 
   resizeMode="stretch"
    resizeMethod="resize"
    />

    <Text style={{margin:5}}>Panado</Text>
    <Text style={{color:'red',margin:5}}>ZMK 250000</Text>
    <Text style={{fontWeight:'bold',margin:5}}>500 milligrams of paracetamol</Text>
    <Text style={{color:'blue',margin:5}} >

    <Button 
    title="ADD TO CART +"
    onPress={() => dispatch(plus(
      item[0]
    ))}/>    
    
  
     </Text>
  
    </View>

    <View style={styles.Info}>
   
   <Image style={styles.productImage} source={{uri:'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2938&q=80'}} 
  resizeMode="stretch"
   resizeMethod="resize"
   />

   <Text style={{margin:5}}>Flagyl</Text>
   <Text style={{color:'red',margin:5}}>ZMK 250</Text>
   <Text style={{fontWeight:'bold',margin:5}}>10 Tablets</Text>
   <Text style={{color:'blue',margin:5}} >

   <Button 
   title="ADD TO CART +"
   onPress={() => dispatch(plus(
     item[1]
   ))}/>    
   
 
    </Text>
 
   </View>



    </View>


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
    //  border: '1px solid transparent',
      transition: 0.5,
      marginTop:10,
      marginLeft:'1%',
      cursor:'pointer',
      textAlign:'center',
      justifyContent:'center',
      alignItems:'center'

    }
  });