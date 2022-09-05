import React, { Component } from 'react'
import { Text,StyleSheet, View,Button,SafeAreaView,ScrollView,TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './register'
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth';
import { initializeApp } from "firebase/app";

  

const Stack  = createNativeStackNavigator()

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state= {
            email:'',
            password:'',
            msg:''
            
        }
        this.onLogin = this.onLogin.bind(this)
       
    }

    onLogin() {
        const {email,password} = this.state;
       
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
     
    if(errorCode === 'auth/wrong-password'){
       this.setState({
        msg: "Incorrect email / password"
       })
    }

  });


    }
    direct () {
        
        <Stack.Navigator initialRouteName="Sign Up">
            <Stack.Screen name="Sign Up" component={Register} />
         </Stack.Navigator>
    }
    render() {
           
   
   
        return (
            
          <View style={styles.cover}>
<Text style={styles.heading}>Login</Text>

<TextInput style={styles.input}
 onChangeText={(email) => this.setState({email})}
placeholder="Email Address" />

<TextInput style={styles.input}
secureTextEntry={true}
onChangeText = {(password) => this.setState({password})}
placeholder="Password" />

  <Text style={{textAlign:'center',color:'red'}}>{this.state.msg}</Text>
  
<View style={{width:300,marginTop:15}}>
<Button style={{width:300,marginTop:10}} title="Login" onPress={()=> this.onLogin()} />
</View>

 <View style={{flexDirection:'row', marginVertical:10}}>

<Text style={styles.question}>Don't have an Account? </Text>
<Text style={styles.new} onPress ={() => this.direct() } >Sign Up</Text>

</View>

            
          </View>
      
        )
    }
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