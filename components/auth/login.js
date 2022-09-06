import React, { useState } from 'react';
import { Text,StyleSheet, View,Button,SafeAreaView,ScrollView,TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth';
//
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './register';
import { NavigationContainer } from '@react-navigation/native';

const Stack  = createNativeStackNavigator()

export function Login(props){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState('');

    

   const onLogin = () => {

    if(email.trim() == ""){
        setMsg("Enter Email Address")
    } else {

        if(password == ""){
            setMsg("Enter Password")
        } else{
            setMsg("");

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         // ...
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log({errorCode})
         console.log({errorMessage})
          
         if(errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email'){
            setMsg("Incorrect email / password")
         }
     
       });
        }

    }
       
   


    }
        return (
            
          <View style={styles.cover}>
<Text style={styles.heading}>Login</Text>

<TextInput style={styles.input}
 onChangeText={(email) => setEmail(email)}
placeholder="Email Address" />

<TextInput style={styles.input}
secureTextEntry={true}
onChangeText = {(password) => setPassword(password)}
placeholder="Password" />

  <Text style={{textAlign:'center',color:'red'}}>{msg}</Text>
  
<View style={{width:300,marginTop:15}}>
<Button style={{width:300,marginTop:10}} title="Login" onPress={()=> onLogin()} />
</View>

 <View style={{flexDirection:'row', marginVertical:10}}>

<Text style={styles.question}>Don't have an Account? </Text>
<Text style={styles.new} onPress ={ () => props.navigation.navigate("Register")} >Sign Up</Text>

</View>

            
          </View>
      
        );
    
}

export default function Authentication(props){
return(
    <NavigationContainer>
    <Stack.Navigator 
    screenOptions={{headerShown: false}}
    >

    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />


    </Stack.Navigator>
    </NavigationContainer>
)

}

const styles = StyleSheet.create({
    cover : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    heading: {
        fontSize:15,
        fontWeight:'bold'
    },
    input: {
        marginVertical:18,
        padding:10,
        borderWidth:1,
        width:'90%',
        backgroundColor:'white',
        borderRadius:6
    },
    question: {
   marginVertical:2,
   fontSize:15,
   fontStyle:'italic'
    },
    new: {
    marginVertical:2,
    fontSize:15,
    color:'blue'
    }
})