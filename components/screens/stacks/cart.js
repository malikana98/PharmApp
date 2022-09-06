import { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView,SafeAreaView,StyleSheet,Text, View,Image,Button } from 'react-native';
import { collection, query, where, getDocs,getFirestore } from "firebase/firestore";

import { useSelector,useDispatch } from 'react-redux';
import { selectCount,plus,minus } from '../../../reduxModern/reducer/cartSlice';

export default function Cart(props){

const dispatch = useDispatch();
const cart = useSelector(selectCount);

console.log({cart})

let total = 0;

let Cart_dis = () => {
  return (

    cart.map((item) => (
      <View style={{flexDirection:'row'}} key={item.id}>
    
      <View>
      <Image style={{width:120, height:107,margin:10}} source={{uri:item.downloadURL}} />
      </View>
      <View style={{margin:5}}>
      <Text>{item.product}</Text>
      <Text>ZMK: {item.price}</Text>
      <Text>Quantity: {item.qty}</Text>
      <Text style={{color:'red'}}>Sub-Price: ZMK {(item.price * item.qty).toFixed(2)}</Text>
     
      <Text>{total = total + (item.price * item.qty)} </Text>
       <Text > <Button title=" Minus - " onPress={() => dispatch(minus(
      item
    ))} />
    <Button title=" Plus + " onPress={() => dispatch(plus(
      item
    ))} />
    </Text>
  
     </View>

     </View>
    
  )
    )
  )
}

if(cart.length > 0){
return (


 <SafeAreaView>
  <ScrollView>

  <Cart_dis />

<View style={{flexDirection:'row',margin:10}} >

    <Text style={{fontSize:20,color:'red'}}>Total: ZMW </Text>
  <Text style={{fontSize:20,color:'red'}}>{total.toFixed(2)}</Text>
</View>

<View style={{width:300,margin:10}}>
    <Button style={{width:300,marginTop:10}} title="Proceed" onPress={() => props.navigation.navigate('CheckOut',
    {
      TotalPrice: total
    })}  />
  </View>

  </ScrollView>
 </SafeAreaView>

  )
} else {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontWeight:'bold',fontSize:15}}>Shopping Cart is Empty!!</Text>
        </View>
      )
}

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