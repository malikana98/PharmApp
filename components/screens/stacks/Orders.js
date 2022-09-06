import React,{useEffect,useState} from 'react';
import { Text, View,Button,Image,SafeAreaView,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import {getAuth} from "firebase/auth"
import { query, where, orderBy, getDocs , collection,getFirestore,serverTimestamp} from "firebase/firestore"; 

export default function Orders(props){

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
   
     const q = query(collection(db,"Orders"), where("UserKey", "==", uid), orderBy("Milliseconds","desc"));
   
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
        <Text>Orders Displayed Here</Text>
      </View>
    );
  } else {
    console.log('Data Loaded')


        return(
        results.map((item) => (
                 
        <View style={styles.Info} key={item.id}>
      <Text style ={styles.headerTitle}>{item.Dates}</Text>
      <Text style ={{marginTop:5,fontWeight:'100',color:'black'}}>Total Price: {item.TotalPrice.toFixed(2)}</Text>
      {/* <Image style={styles.productImage} source={{uri:item.downloadURL}} 
   resizeMode="stretch"
    resizeMethod="resize"
    />
     */}
       <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Order',{
        Order: item,
        Id: item.id,
        Dates: item.Dates,
        TotalPrice: item.TotalPrice,
        Cart: item.Cart,
        Status: item.Status
       })} >
          <Text style={{fontWeight:'bold',fontStyle:'italic',color:'blue',marginTop:8,textDecorationLine:'underline'}}>More</Text>
       </TouchableOpacity>
  
      </View>
        ))
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