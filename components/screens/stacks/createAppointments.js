import React,{Component,componentDidMount} from 'react';
import { Text, View,Button,Image,SafeAreaView,StyleSheet,ScrollView,TextInput } from 'react-native';
import {getAuth} from "firebase/auth"
import { collection, addDoc,getFirestore,serverTimestamp } from "firebase/firestore"; 

export default class CreateAppointment extends Component {

  constructor(props){
    super(props)
    this.state = {
      day:'',
      month:'',
      year: '',
      notes:'',
      err_day:'',
      err_month:'',
      err_year:'',
      err_notes:''
    }
    this.Create = this.Create.bind(this)
  }

 Create() {
  const {day,month,year,notes,err_day,err_month,err_year,err_notes} = this.state;

  var date = new Date()
  let count = 0;

if(day.trim() == '' || day.trim() < 1 || day.trim() > 31){
    this.setState({err_day:'Enter valid day'})
} else {
    this.setState({err_day:''})
}

if(month.trim() == '' || month.trim() < 1 || month.trim() > 12){
    this.setState({err_month:'Enter valid month'})
} else {
    this.setState({err_month:''})
}

if(year.trim() == '' || year.trim().length != 4){
    this.setState({err_year:'Enter valid year'})
    console.log(year.trim().length)
} else {
    this.setState({err_year:''})
}

if(notes.trim() == '' ){
     this.setState({err_notes:'Kindly add Notes'})
} else {
    this.setState({err_notes:''})
}

console.log({count})
/* This is the code for the Create Appointment page. */

if(err_day.trim() == '' && err_month.trim() == '' && err_year.trim() == '' && err_notes.trim() == ''){
    alert("Successful")

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
    info()

}

  const onSubmit = () => {
    this.props.navigation.navigate('PendingAppointments')
  }


}



  render() {
 
   /* This is the code for the UI of the Create Appointment page. */
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{margin:20}}>
          <TextInput style={{marginTop:'8%',height:50,borderWidth:1,width:300}}
           placeholder="DD" keyboardType="number-pad" onChangeText={(day) => this.setState({day})}/>

           <Text style={{color:'red'}}>{this.state.err_day}</Text>
  
          <TextInput style={{marginTop:'8%',height:50,borderWidth:1,width:300}}
           placeholder="MM" keyboardType="number-pad" onChangeText={(month) => this.setState({month})} />

           <Text style={{color:'red'}}>{this.state.err_month}</Text>
  
          <TextInput style={{marginTop:'8%',height:50,borderWidth:1,width:300}} 
          placeholder="YYYY" keyboardType="number-pad" onChangeText={(year) => this.setState({year})} />

         <Text style={{color:'red'}}>{this.state.err_year}</Text>

           <Text style={{marginTop:5}}>Notes:</Text>
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
