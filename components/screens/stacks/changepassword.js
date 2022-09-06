import { useEffect,useState } from 'react';
import { ScrollView,SafeAreaView,StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native';
import { collection, query, where, getFirestore,doc,onSnapshot,updateDoc,serverTimestamp } from "firebase/firestore";
import { getAuth, reauthenticateWithCredential,updatePassword,EmailAuthProvider } from "firebase/auth";



export default function ChangePassword(props){

  const [oldPassword,setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [confirmNewPassword,setConfirmPassword] = useState('');

  const [errorPassword,setErrorPassword] = useState('');
  const [errorNewPassword,setErrorNewPassword] = useState('');
  const [errorConfirmPassword,setErrorConfirmPassword] = useState('');

  const ChangePassword = () => {

if(oldPassword == ""){
  setErrorPassword("Enter Old Password")
} else {
  setErrorPassword("")

if(newPassword == ""){
  setErrorNewPassword("Enter New Password")
} else {
  setErrorNewPassword("")

if(confirmNewPassword == ""){
  setErrorConfirmPassword("Confirm Password")
} else {
 setErrorConfirmPassword("")
if(newPassword == confirmNewPassword){
  setErrorConfirmPassword("")


  const auth = getAuth();
  const user = auth.currentUser;
  
  // TODO(you): prompt the user to re-provide their sign-in credentials
  const credential = EmailAuthProvider.credential(user.email,oldPassword);
  
  reauthenticateWithCredential(user, credential).then(() => {
    setErrorPassword("")
    // User re-authenticated.
    console.log("User re-authenticated")

    updatePassword(user, newPassword).then(() => {
      // Update successful.
      alert('Update Successful');
      props.navigation.navigate("Profile")
    }).catch((error) => {
      // An error ocurred
      // ...
      alert("Error occurred. Please try again")
    });


  }).catch((error) => {
    // An error ocurred
    // ...
    const errorCode = error.code;
    console.log({error})

    if(errorCode === 'auth/wrong-password'){
      setErrorPassword("Wrong Password")
   }
  });


} else {
  setErrorConfirmPassword("Passwords did not match")
}




}

}
}
  }
return (

<SafeAreaView>
    <ScrollView>
 
        <View>            
            <View style={{alignItems:'center',marginTop:'5%'}}>
  
        <TouchableOpacity onPress={() => props.navigation.navigate('Password')}>
            <Text style={{color:'black', fontWeight:"bold",fontSize:16}}>Change Password</Text>
        </TouchableOpacity>
            </View>
            <View style={styles.info}>
            <TextInput style={styles.input}
            secureTextEntry={true}
            onChangeText={(oldPassword) => setOldPassword(oldPassword)}
            placeholder="Old Password" keyboardType="name-phone-pad" />
            <Text style={{color:"red"}}>{errorPassword}</Text>

        <TextInput style={styles.input}
            secureTextEntry={true}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
            placeholder="New Password" keyboardType="name-phone-pad" />
              <Text style={{color:"red"}}>{errorNewPassword}</Text>

            <TextInput style={styles.input}
            secureTextEntry={true}
            onChangeText={(confirmNewPassword) => setConfirmPassword(confirmNewPassword)}
            placeholder="Confirm New Password" keyboardType="name-phone-pad" />
              <Text style={{color:"red"}}>{errorConfirmPassword}</Text>

   <TouchableOpacity style={styles.save} onPress={()=> ChangePassword()}>
        <Text style={styles.text}>Change Password</Text>
   </TouchableOpacity>

            </View>
            </View>

    </ScrollView>
</SafeAreaView>

)
}


const styles = StyleSheet.create({
  info: {
   alignItems:'center',
   marginTop:20
  },
   input: {
      
       marginVertical:10,
       padding:10,
       borderBottomWidth:1,
       width:'90%',
       backgroundColor:'white',
       borderRadius:6,
       marginTop:10
   },
   save: {
       width:'70%',
       marginTop:20,
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:'#3b3e40',
       borderRadius:10,
       height:40
   },
   text: {
       color:'white'
   }
})