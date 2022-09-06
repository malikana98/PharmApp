import React,{useEffect,useState} from 'react';
import { Text, View,Button,Image,SafeAreaView,StyleSheet,ScrollView,TouchableOpacity,Alert } from 'react-native';
import {getAuth} from "firebase/auth"
import {  doc,getFirestore,updateDoc} from "firebase/firestore";


export default function PrescriptionView(props){

    
 const { Id,Medicine,Dosage,Frequency,Instruction,Status } = props.route.params;

 const [prescriptionStatus,setPrescriptionStatus] = useState(Status);

 //setOrderStatus(Status);


 const Update = (Id) => {
    console.log({Id})
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const db = getFirestore();



    const infoDoc = doc(db, 'Info', Id);
    updateDoc(infoDoc, { 
   Status:"Done"
    });
  
    alert("Successful")
    setPrescriptionStatus("Done")
 }



    if(prescriptionStatus == 'Active'){

        return(

            <SafeAreaView>
        <ScrollView>

<View style={styles.Info}>
<Text style ={styles.headerTitle}>Drug: {Medicine}</Text>
<Text style ={{marginTop:5}}>Dosage: {Dosage}</Text>
<Text style ={{marginTop:5}}>Frequency: {Frequency}</Text>
<Text style ={{marginTop:5}}>Instruction: {Instruction}</Text>
<Text style ={{marginTop:5}}>Status: {prescriptionStatus}</Text>

<TouchableOpacity style={styles.btn} onPress={() => Update(Id)} >

  <Text style={{fontWeight:'bold'}}>Change To Done</Text>

</TouchableOpacity>

</View>


        </ScrollView>
        </SafeAreaView>
        
        );

    } else if( prescriptionStatus == 'Done'){

        return(

            <SafeAreaView>
        <ScrollView>

<View style={styles.Info}>
<Text style ={styles.headerTitle}>Drug: {Medicine}</Text>
<Text style ={{marginTop:5}}>Dosage: {Dosage}</Text>
<Text style ={{marginTop:5}}>Frequency: {Frequency}</Text>
<Text style ={{marginTop:5}}>Instruction: {Instruction}</Text>
<Text style ={{marginTop:5}}>Status: {prescriptionStatus}</Text>

</View>


        </ScrollView>
        </SafeAreaView>
        
        );

    } else {

        return(

            <SafeAreaView>
        <ScrollView>

<View style={styles.Info}>
<Text style ={styles.headerTitle}>Drug: {Medicine}</Text>
<Text style ={{marginTop:5}}>Dosage: {Dosage}</Text>
<Text style ={{marginTop:5}}>Frequency: {Frequency}</Text>
<Text style ={{marginTop:5}}>Instruction: {Instruction}</Text>
<Text style ={{marginTop:5}}>Status: {prescriptionStatus}</Text>

</View>

        </ScrollView>
        </SafeAreaView>
        
        );
    }




}


const styles = StyleSheet.create({
    container: {
      width:'95%',
      backgroundColor: 'white',
      marginTop:10,
      marginLeft:'2.5%',
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