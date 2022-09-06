import React,{Component,componentDidMount,useState} from 'react';
import { Text, View,Button,Image,SafeAreaView,StyleSheet,ScrollView,TextInput } from 'react-native';
import {getAuth} from "firebase/auth"
import { collection, addDoc,getFirestore,serverTimestamp } from "firebase/firestore"; 

import { useSelector,useDispatch } from 'react-redux';
import { selectCount,plus,minus, clear } from '../../../reduxModern/reducer/cartSlice';


export default function CheckingOut(props){

  const { TotalPrice } = props.route.params;

  console.log({TotalPrice})

   const dispatch = useDispatch();
   const cart = useSelector(selectCount);

    const [location,setLocation] = useState('');
    const [notes,setNotes] = useState('');
    const [err_location,setErr_Location] = useState('');
    const [err_notes,setErr_Notes] = useState('');

    const Create = () => {
        if(location.trim() == '' ){
            setErr_Location('Kindly add your delivery location')
       } else {
           setErr_Location('');
       }


       if(err_location.trim() == ''){


        const SendForm = async() => {

            const auth = getAuth();
            const user = auth.currentUser;
             
            console.log({user})
            
            if (user !== null) {
            
              // The user object has basic properties such as display name, email, etc.
              const displayName = user.displayName;
              const email = user.email;
              const photoURL = user.photoURL;
              const emailVerified = user.emailVerified;
         

              let ms = Date.now();

              let d=  new Date();
              let date = d.getFullYear() + "-" +( d.getMonth() + 1 )+ "-" + d.getDate();
            
              console.log({email})
            
              // The user's ID, unique to the Firebase project. Do NOT use
              // this value to authenticate with your backend server, if
              // you have one. Use User.getToken() instead.
              const uid = user.uid;
              const tempDoc =[];
            
              console.log({uid})
            
              const db = getFirestore();
            
              const docRef = await addDoc(collection(db, "Orders"), {
                Location: location,
                Notes: notes,
                Cart: cart,
                Status: 1,
                UserKey:uid,
                Timestamp: serverTimestamp(),
                Milliseconds : ms,
                TotalPrice: TotalPrice,
                Dates: date
                });
                console.log("Document written with ID: ", docRef.id);
                onSubmit();
            }
          
          }
              SendForm();

       }

       const onSubmit = () => {
        dispatch(clear());
        alert('Order Submitted Successfully');
      }



    }

    return(
<SafeAreaView>
    <ScrollView>


    <View style={{margin:20}}>
     
           <Text style={{marginTop:5}}>Delivery Location:</Text>
          <TextInput style={{marginTop:'8%',height:80,borderWidth:1,width:300}} 
          onChangeText={(location) => setLocation(location)} />

         <Text style={{color:'red'}}>{err_location}</Text>

           <Text style={{marginTop:5}}>Notes (Optional):</Text>
           <TextInput style={{marginTop:'8%',height:80,width:300,borderWidth:1,backgroundColor:'#f7f3f0',borderWidth:2}}
           onChangeText={(notes) => setNotes(notes)}
           />

                <Text style={{color:'red'}}>{err_notes}</Text>
  
         <View style={{width:300,marginTop:20}}>
            <Button style={{width:300,marginTop:10}} title="Submit Order" onPress={()=> Create()} />
            </View>
  
          </View>


    </ScrollView>
</SafeAreaView>
    )
}

/*
export default class CheckingOut extends Component {

    constructor(props){
      super(props);
      this.state = {
        location:'',
        notes:'',
        err_notes:'',
        err_location:''
      }
      this.Create = this.Create.bind(this)
    }

    Create() {
        const {location,notes,err_notes,err_location} = this.state;

        if(location.trim() == '' ){
            this.setState({err_location:'Kindly add your delivery location'})
       } else {
           this.setState({err_location:''})
       }

       if(err_location.trim() == ''){


        const SendForm = async() => {

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
            
              const docRef = await addDoc(collection(db, "Appointments"), {
                Date: year+'-'+month+'-'+day,
                Day: day,
                Month: month,
                Notes: notes,
                Status: 1,
                UserKey:uid,
                Year:year,
                Timestamp: serverTimestamp()
                });
                console.log("Document written with ID: ", docRef.id);
                onSubmit();
            }
          
          }
              SendForm();

       }

    }

    render(){
        return (
<SafeAreaView>
    <ScrollView>


    <View style={{margin:20}}>
     
           <Text style={{marginTop:5}}>Delivery Location:</Text>
          <TextInput style={{marginTop:'8%',height:80,borderWidth:1,width:300}} 
          onChangeText={(location) => this.setState({location})} />

         <Text style={{color:'red'}}>{this.state.err_location}</Text>

           <Text style={{marginTop:5}}>Notes (Optional):</Text>
           <TextInput style={{marginTop:'8%',height:80,width:300,borderWidth:1,backgroundColor:'#f7f3f0',borderWidth:2}}
           onChangeText={(notes) => this.setState({notes})}
           />

                <Text style={{color:'red'}}>{this.state.err_notes}</Text>
  
         <View style={{width:300,marginTop:20}}>
            <Button style={{width:300,marginTop:10}} title="Submit Request" onPress={()=> this.Create()} />
            </View>
  
          </View>


    </ScrollView>
</SafeAreaView>
)
    }
}
*/
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
        borderRadius:6,
        backgroundColor:'white'
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