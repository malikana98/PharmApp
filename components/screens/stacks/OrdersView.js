import React,{useEffect,useState} from 'react';
import { Text, View,Button,Image,SafeAreaView,StyleSheet,ScrollView,TouchableOpacity,Alert } from 'react-native';
import {getAuth} from "firebase/auth"
import {  doc,getFirestore,updateDoc} from "firebase/firestore";


export default function OrdersView(props){

    
 const { Order,Id,Dates,TotalPrice,Cart,Status } = props.route.params;

 const [orderStatus,setOrderStatus] = useState(Status);

 //setOrderStatus(Status);


 const Update = (Id) => {
    console.log({Id})
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const db = getFirestore();



    const infoDoc = doc(db, 'Orders', Id);
    updateDoc(infoDoc, { 
   Status:3
    });
  
    alert("Order Cancelled")
    setOrderStatus(3)
 }

 const ask = (id) =>
 Alert.alert(
   "Cancel Order",
   "Are you sure you want to cancel the Order",
   [
     {
       text: "Cancel",
       onPress: () => console.log("Cancel Pressed"),
       style: "cancel"
     },
     { text: "OK", onPress: () => Update(id) }
   ]
 );


    if(orderStatus == 1){

        return(

            <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
        {
         Cart.map((item) => (       
            <View style={styles.Info} key={item.id}>
          <Text style ={styles.headerTitle}>{item.product}</Text>
          <Text style ={{marginTop:5,fontWeight:'100',color:'black'}}>Qty: {item.qty}</Text>
          <Text style ={{marginTop:5,fontWeight:'100',color:'black'}}>Unit Price: {item.price.toFixed(2)}</Text>
          <Image style={styles.productImage} source={{uri:item.downloadURL}} 
        resizeMode="stretch"
        resizeMethod="resize"
        />
        
          </View>
            ))
            }
        
        <View style={{flexDirection:'row',margin:10}} >
        <Text style={{fontSize:16}}>Order Status: </Text>
        <Text style={{fontSize:16}}>Active</Text>
        </View>
        
        <View style={{flexDirection:'row',margin:10}} >
        <Text style={{fontSize:16}}>Total Price: ZMW </Text>
        <Text style={{fontSize:16}}>{TotalPrice.toFixed(2)}</Text>
        </View>

        <View>
            <Button title='Cancel Order' onPress={() => Update(Id)} />
        </View>
        
        </View>
        </ScrollView>
        </SafeAreaView>
        
        );

    } else if( orderStatus == 2){

        return(

            <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
        {
         Cart.map((item) => (       
            <View style={styles.Info} key={item.id}>
          <Text style ={styles.headerTitle}>{item.product}</Text>
          <Text style ={{marginTop:5,fontWeight:'100',color:'black'}}>Qty: {item.qty}</Text>
          <Text style ={{marginTop:5,fontWeight:'100',color:'black'}}>Unit Price: {item.price.toFixed(2)}</Text>
          <Image style={styles.productImage} source={{uri:item.downloadURL}} 
        resizeMode="stretch"
        resizeMethod="resize"
        />
        
          </View>
            ))
            }
        
        <View style={{flexDirection:'row',margin:10}} >
        <Text style={{fontSize:16}}>Order Status: </Text>
        <Text style={{fontSize:16}}>Done</Text>
        </View>
        
        <View style={{flexDirection:'row',margin:10}} >
        <Text style={{fontSize:16}}>Total Price: ZMW </Text>
        <Text style={{fontSize:16}}>{TotalPrice.toFixed(2)}</Text>
        </View>
        
        </View>
        </ScrollView>
        </SafeAreaView>
        
        );

    } else {

        return(

            <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
        {
         Cart.map((item) => (       
            <View style={styles.Info} key={item.id}>
          <Text style ={styles.headerTitle}>{item.product}</Text>
          <Text style ={{marginTop:5,fontWeight:'100',color:'black'}}>Qty: {item.qty}</Text>
          <Text style ={{marginTop:5,fontWeight:'100',color:'black'}}>Unit Price: {item.price.toFixed(2)}</Text>
          <Image style={styles.productImage} source={{uri:item.downloadURL}} 
        resizeMode="stretch"
        resizeMethod="resize"
        />
        
          </View>
            ))
            }
        
        <View style={{flexDirection:'row',margin:10}} >
        <Text style={{fontSize:16}}>Order Status: </Text>
        <Text style={{fontSize:16}}>Cancelled</Text>
        </View>
        
        <View style={{flexDirection:'row',margin:10}} >
        <Text style={{fontSize:16}}>Total Price: ZMW </Text>
        <Text style={{fontSize:16}}>{TotalPrice.toFixed(2)}</Text>
        </View>
        
        </View>
        </ScrollView>
        </SafeAreaView>
        
        );

    }




}


const styles = StyleSheet.create({
    container: {
      width:'98%',
      backgroundColor: 'white',
      marginTop:10,
      marginLeft:'1%',
      cursor:'pointer',
      borderRadius:10
    },
    Info: {
    padding:15,
    backgroundColor:'white',
    color:'black'
    }
    ,
    headerTitle: {
        fontWeight:'bold',
        fontSize:15
    },
    btn: {
    

    }
    ,
    productImage: {
        height:100,
        width: 100,
        marginTop:5
      }
  });