import React, { Component } from 'react'
import { Text,StyleSheet, View,Button,SafeAreaView,ScrollView,TextInput } from 'react-native';

export default class Register extends Component {

  constructor(props){
      super(props)
      this.state = {
          names:'',
          phone:'',
          email:'',
         password:''
      }
      this.onSignUp = this.onSignUp.bind(this)
  }
     
  onSignUp() {
      const {names,phone,email,password} = this.state;

      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((result) =>{
        firebase.firestore().collection('customer_accounts')
        .doc(firebase.auth().currentUser.uid)
        .set({
            names,
            phone,
            email
        })
        console.log(result)
      }).catch((error) => {
          console.log(error)
      })
  }
  

    render() {
        return (
            <View style={styles.cover}>
            <Text style={styles.heading}>Create Account</Text>

            <TextInput style={styles.input}
             onChangeText={(names) => this.setState({names})}
            placeholder="Full Names" keyboardType="name-phone-pad" />
            
            <TextInput style={styles.input}
             onChangeText={(email) => this.setState({email})}
            placeholder="Email Address" keyboardType="email-address"/>

            <TextInput style={styles.input}
             onChangeText={(phone) => this.setState({phone})}
            placeholder="Phone Number" keyboardType="number-pad" />
            
            <TextInput style={styles.input}
            secureTextEntry={true}
            onChangeText = {(password) => this.setState({password})}
            placeholder="Password" />
              
            <View style={{width:300,marginTop:15}}>
            <Button style={{width:300,marginTop:10}} title="Sign Up" onPress={()=> this.onSignUp()} />
            </View>
            
             <View style={{flexDirection:'row', marginVertical:10}}>
            
            <Text style={styles.question}>Have an Account? </Text>
            <Text style={styles.new} onPress={() => this.props.navigation.navigate('Checkouts')}>Login</Text>
            
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