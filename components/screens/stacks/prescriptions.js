import { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView,SafeAreaView,StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';
import { collection, query, where, getDocs,getFirestore,setDoc,doc} from "firebase/firestore";
import {getAuth} from "firebase/auth"
import { async } from '@firebase/util';
import { FlatList } from 'react-native-gesture-handler';



// function Update(parcel){

//       console.log({parcel})
//       alert('Pressed')
//       const auth = getAuth();
//       const user = auth.currentUser;
//       const uid = user.uid;
//       const db = getFirestore();

//       let dosage = parcel.Dosage
//       let frequency = parcel.Frequency
//       let instructions = parcel.Instructions
//       let medicine = parcel.Medicine
//       let id = parcel.id
//       let name = parcel.Name
//       let key = parcel.UserKey
//       let status = parcel.Status

//       const infoDoc = doc(db, 'Info', id);
//       setDoc(infoDoc, { 

//         'Dosage' : dosage,
//        'Frequency' : frequency,
//       'Instructions': instructions,
//       'Medicine': medicine,
//       'Name': name,
//       'UserKey': key,
//       'Status':'Done'

//       });

    


//     }

export function GetData({navigation}){

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

  const q = query(collection(db,"Info"), where("UserKey", "==", uid));

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
    <View>
      <Text>Loading</Text>
    </View>
  );
} else {
  console.log('Data Loaded')
 

  return (
   

    results.map((item) => (

      <View style={styles.Info} key={item.id}>
    <Text style ={styles.headerTitle}>Drug: {item.Medicine}</Text>
    <Text style ={{marginTop:5}}>Dosage: {item.Dosage}</Text>
    <Text style ={{marginTop:5}}>Frequency: {item.Frequency}</Text>
    <Text style ={{marginTop:5}}>Instruction: {item.Instructions}</Text>
    <Text style ={{marginTop:5}}>Status: {item.Status}</Text>

     <TouchableOpacity style={{marginTop:'2%'}}  onPress={() => navigation.navigate('Prescription',{
        Id: item.id,
        Medicine: item.Medicine,
        Dosage:item.Dosage,
        Frequency:item.Frequency,
        Instruction:item.Instructions,
        Status: item.Status
       })}>

        <Text style={{fontStyle:'italic',color:'blue',textDecorationLine:'underline'}}>See More</Text>

     </TouchableOpacity>

    </View>
 
    )

    )
  
  )


}

// Dosage: "2 tablets"
// Frequency: "3 Times"
// Instructions: "Eat before medication"
// Medicine: "Paracetamol"
// Name: "Imungana Malikana"
// Status: "Active"
// UserKey: "qYhCtZb9PNSbXrOEDInXs8rHfIX2"
// id: "MEXYarqBVgJh7EaQL2RP"

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
    }
    ,
    headerTitle: {
        fontWeight:'bold',
        fontSize:15
    },
    btn: {
      backgroundColor:'#00A88C',
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