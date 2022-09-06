import { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView,SafeAreaView,StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';
import { collection, query, where, getDocs,getFirestore,setDoc,doc} from "firebase/firestore";
import {getAuth} from "firebase/auth"
import { async } from '@firebase/util';



function Update(parcel){

      console.log({parcel})
      alert('Pressed')
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
      const db = getFirestore();

      let dosage = parcel.Dosage
      let frequency = parcel.Frequency
      let instructions = parcel.Instructions
      let medicine = parcel.Medicine
      let id = parcel.id
      let name = parcel.Name
      let key = parcel.UserKey
      let status = parcel.Status

      const infoDoc = doc(db, 'Info', id);
      setDoc(infoDoc, { 

        'Dosage' : dosage,
       'Frequency' : frequency,
      'Instructions': instructions,
      'Medicine': medicine,
      'Name': name,
      'UserKey': key,
      'Status':'Done'

      });

    


    }

export function PendingData(){

  const [results,setResults] = useState([]);



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

  const q = query(collection(db,"Appointments"), where("UserKey", "==", uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      const data = doc.data();
      const id = doc.id;
    tempDoc.push({id, ...data})


})

console.log({tempDoc});
passInfo(tempDoc)

}
}

useEffect(() => {
  info();
}, []);

const passInfo = (post) => {
//navigation.navigate('Prescription',{Posts:post})
setResults(post)
  console.log({post})
}

if(results.length == 0){
  console.log('Loading Data')
  return(
    <View style={{textAlign:'center',marginTop:'4%'}}>
    <Text style ={{fontWeight:'bold'}}>Results To Be Displayed Here</Text>
    </View>
  );
} else {
  console.log('Data Loaded')


 return results.map(function(item){

    if(item.Status == 1){
return (
    <View style={styles.container} key={item.id}>
    <Text style ={styles.Info}>Date: {item.Date}</Text>
    <Text style ={styles.Info}>Notes: {item.Notes}</Text>
    <Text style ={styles.Info}>Status: Pending</Text>
    </View>

);
    } else {
        return(<View key={item.id}>
        </View>)
    }

  });
 
  return(<View></View>)
//   return (

//     results.map((item) => (

//       <View style={styles.container} key={item.id}>
//     <Text style ={styles.Info}>Date: {item.Date}</Text>
//     <Text style ={styles.Info}>Notes: {item.Notes}</Text>
//     <Text style ={styles.Info}>Status: Pending</Text>
//     </View>
// //onPress={() => {Update(item)}}
      
//     ) )
  
//   


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
    padding:15
    } ,

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