import React,{useState,useEffect} from 'react';
import {TouchableOpacity,StyleSheet, Text, View,Image,SafeAreaView,ScrollView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign'

function Contact_Screen(){
    return (
  
      <SafeAreaView>
        <ScrollView>
      <View>
        
         <View>
            <Image style={{width:300,height:300}} source={{uri:'https://cdn2.thecatapi.com/images/0SxW2SQ_S.jpg'}} />
         </View>
         <View >
            <Text style={{fontSize:18,marginTop:5}}> Located along Twin Road,</Text>
            <Text style={{fontSize:18,marginTop:5}}>0973016295 / 0761811233,</Text>
            <Text style={{fontSize:18,marginTop:5}}>malikanaimungana@outlook.com</Text>
            <Text style={{color:'red',fontSize:20,textAlign:'center',marginTop:6}}>Thank You Very Much</Text>
         </View>
   
     </View>
     </ScrollView>
     </SafeAreaView>
  );
  }

const ContactStack = new createStackNavigator();

export default function ContactStack_Screen ({navigation}) {
     return(
     <ContactStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor:'#3b3e40',
      },
      headerTintColor: '#cfc8c8',
      headerTitleStyle: {
        fontWeight:'bold',
        color:'white'
      }
    }}>
         <ContactStack.Screen name="Contact Us" component={Contact_Screen} options={{title:"Contact Us", headerLeft: () => (<Icon.Button name="ios-menu" size={25} backgroundColor="#3b3e40" onPress={()=>navigation.openDrawer()}></Icon.Button>),
        headerRight: () => (
          <View>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View style={styles.Cover}>
            <Text style={styles.Number}>0</Text>
        </View>
  
              <Icons name="shoppingcart"
        size={27} color="#f7f7f2"
        >  </Icons>
        </TouchableOpacity>
          </View>
              )
        }} />
     </ContactStack.Navigator>
     );
}

const styles = StyleSheet.create({
  Cover : {
      position:'absolute',
      borderRadius:15,
      backgroundColor: 'rgba(95,197,123,0.8)',
      width:20,
      alignItems:'center',
      height:20,
      justifyContent:'center',
      right:15,
      bottom:20
  },
  Number : {
      color:'white',
      fontWeight:'bold'
  }
})