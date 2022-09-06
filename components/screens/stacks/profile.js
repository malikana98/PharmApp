import { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView,SafeAreaView,StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native';
import { collection, query, where, getFirestore,doc,onSnapshot,updateDoc,serverTimestamp } from "firebase/firestore";
import {getAuth,signOut} from "firebase/auth"
import ChangePassword from './changepassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

function Profile(props){

console.log({props})


const [firstName,setFirstName] = useState('');
const [lastName,setLastName] = useState('');
const [phone,setPhone] = useState('');



const info = async() => {

 const auth = getAuth();
const user = auth.currentUser;

console.log({user})

if (user !== null) {

 // The user object has basic properties such as display name, email, etc.
 const displayName = user.displayName;
 const email = user.email;
 const photoURL = user.photoURL;
 const emailVerified = user.emailVerified;

 console.log({email})

 // The user's ID, unique to the Firebase project. Do NOT use
 // this value to authenticate with your backend server, if
 // you have one. Use User.getToken() instead.
 const uid = user.uid;
 const tempDoc =[];

 console.log({uid})

 const db = getFirestore();

 const q = query(collection(db,"Users"), where("UserKey", "==", uid));

onSnapshot(doc(db, "Users", uid), (doc) => {

  let docs = doc.data();
  console.log("Current data: ", doc.data());
 setFirstName(docs.FirstName);
 setLastName(docs.LastName);
 setPhone(docs.Phone)
});

// console.log({unsub});
// passInfo(unsub)

}
}

useEffect(() => {
 info();
}, []);

const SaveChanges = () => {

  if(firstName.trim() == ""){
    alert("First Name cannot be empty")
  } else if(lastName.trim() == ''){
    alert("Last Name cannot be empty");
  } else if(phone.trim() ==""){
    alert("Phone cannot be empty")
  } else {

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const db = getFirestore();


    const infoDoc = doc(db, 'Users', uid);
    updateDoc(infoDoc, { 
      Phone:phone,
      FirstName: firstName,
      LastName:lastName,
      Time:serverTimestamp()
    });
  
    alert("Changes saved successfully")

  }

}

const LogOut = () => {

  const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  console.log('Successfully signed out');
}).catch((error) => {
  // An error happened.
  alert("Something went wrong")
});


}



return (

<SafeAreaView>
    <ScrollView>
 
        <View>            
            <View style={{alignItems:'center',marginTop:'5%'}}>
  
        <TouchableOpacity onPress={() => props.navigation.navigate('Password')}>
            <Text style={{color:'blue', textDecorationLine:'underline'}}>Change Password</Text>
        </TouchableOpacity>
            </View>
            <View style={styles.info}>
            <TextInput style={styles.input}
            value={firstName}
            onChangeText={(firstName) => setFirstName(firstName)}
            placeholder="First Name" keyboardType="name-phone-pad" />

        <TextInput style={styles.input}
            value = {lastName}
            onChangeText={(lastName) => setLastName(lastName)}
            placeholder="Last Name" keyboardType="name-phone-pad" />

            <TextInput style={styles.input}
            value = {phone}
            onChangeText={(phone) => setPhone(phone)}
            placeholder="Phone Number" keyboardType="number-pad" />

   <TouchableOpacity style={styles.save} onPress={()=> SaveChanges()}>
        <Text style={styles.text}>Save Changes</Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.save} onPress={() => LogOut()}>
        <Text style={styles.text}>Log Out</Text>
   </TouchableOpacity>
            </View>
            </View>

    </ScrollView>
</SafeAreaView>

)
}

export default function SettingsScreen(){


return (
    <HomeStack.Navigator>

<HomeStack.Screen name="Profile" component ={Profile}  />
<HomeStack.Screen name="Password" component ={ChangePassword} />

   </HomeStack.Navigator>
);
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