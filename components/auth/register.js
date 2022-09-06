import React, { useState } from 'react'
import { Text,StyleSheet, View,Button,SafeAreaView,ScrollView,TextInput } from 'react-native';
import { serverTimestamp,setDoc,doc,getFirestore } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register (props) {

    
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');

    const [errFirstName,setErrFirstName] = useState('');
    const [errLastName,setErrLastName] = useState('');
    const [errEmail,setErrEmail] = useState('');
    const [errPhone,setErrPhone] = useState('');
    const [errPassword,setErrPassword] = useState('');

     
const  onSignUp = () => {

    if(firstName.trim() == ""){
        setErrFirstName("Enter First Name");
    } else {
        setErrFirstName("");
    }

    if(lastName.trim() == ""){
        setErrLastName("Enter Last Name")
    } else {
        setErrLastName("");
    }

    if(email.trim() == ""){
        setErrEmail("Enter a Valid Email Address")
    } else {
        setErrEmail("")
    }

    if(phone.trim() == "" || phone.trim().length != 12){
        setErrPhone("Phone number must have 12 characters");
    } else {
        setPhone("");
    }

    if(password == "" || password.length < 8){
        setErrPassword("Password should have at least 8 characters");
    } else {
        setErrPassword("")
    }

    if(errFirstName == "" && errLastName == "" && errEmail == "" && errPassword == "" && errPhone == ""){

      const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const uid = user.uid;

    const db = getFirestore();

    setDoc(doc(db, "Users", uid), {
        Phone:phone,
        Email:email,
        FirstName: firstName,
        LastName:lastName,
        Time:serverTimestamp()
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({errorCode})

    if( errorCode === 'auth/invalid-email'){
        setErrEmail("Enter a Valid Email Address")
     }
    // ..
  });

  }

  }
  
        return (
            <SafeAreaView>
            <ScrollView>

            <View style={styles.cover}>
            <Text style={styles.heading}>Create Account</Text>

            <TextInput style={styles.input}
             onChangeText={(fname) => setFirstName(fname)}
            placeholder="First Name" keyboardType="name-phone-pad" />
              <Text style={{textAlign:'center',color:'red'}}>{errFirstName}</Text>

            <TextInput style={styles.input}
             onChangeText={(lname) => setLastName(lname)}
            placeholder="Last Name" keyboardType="name-phone-pad" />
              <Text style={{textAlign:'center',color:'red'}}>{errLastName}</Text>
            
            <TextInput style={styles.input}
             onChangeText={(email) => setEmail(email)}
            placeholder="Email Address" keyboardType="email-address"/>
              <Text style={{textAlign:'center',color:'red'}}>{errEmail}</Text>

            <TextInput style={styles.input}
             onChangeText={(phone) => setPhone(phone)}
            placeholder="Phone Number" keyboardType="number-pad" />
              <Text style={{textAlign:'center',color:'red'}}>{errPhone}</Text>
            
            <TextInput style={styles.input}
            secureTextEntry={true}
            onChangeText = {(password) => setPassword(password)}
            placeholder="Password" />
              <Text style={{textAlign:'center',color:'red'}}>{errPassword}</Text>
              
            <View style={{width:300,marginTop:15}}>
            <Button style={{width:300,marginTop:10}} title="Sign Up" onPress={() => onSignUp()} />
            </View>
            
             <View style={{flexDirection:'row', marginVertical:10}}>
            
            <Text style={styles.question}>Have an Account? </Text>
            <Text style={styles.new} onPress={() => props.navigation.navigate('Login')}>Login</Text>
            
            </View>
            
                        
                      </View>

                      </ScrollView>
                    </SafeAreaView>
        )
 
}


const styles = StyleSheet.create({
    cover : {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:'4%'
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