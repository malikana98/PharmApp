import { ScrollView,SafeAreaView,StyleSheet,Text, View,TouchableOpacity,Button } from 'react-native';


export function AppointmentOptions(props){
console.log({props})
return(

<SafeAreaView>
<ScrollView>

<Button title='Request For Appointment' onPress={() => props.navigation.navigate('CreateAppointmets')} /> 

<TouchableOpacity style={styles.container} onPress = {() => props.navigation.navigate('PendingAppointments')}>
<View style={styles.infoCover}>
<Text style={styles.info}>Pending</Text>
</View>
</TouchableOpacity>

<TouchableOpacity style={styles.container} onPress = {() => props.navigation.navigate('ActiveAppointments')}>
<View style={styles.infoCover}>
<Text style={styles.info}>Approved</Text>
</View>
</TouchableOpacity>

<TouchableOpacity style={styles.container} onPress = {() => props.navigation.navigate('DoneAppointments')}>
<View style={styles.infoCover}>
<Text style={styles.info}>Cleared</Text>
</View>
</TouchableOpacity>

</ScrollView>
</SafeAreaView>


);



}


const styles = StyleSheet.create({
    container: {
      width:'98%',
      backgroundColor: 'white',
      marginTop:'5%',
      marginLeft:'1%',
      cursor:'pointer',
      borderRadius:10,
      height:100,
    },
    infoCover: {
     height:30,
     margin:'auto'
    },
    info: {
    textSize:25,
    textAlign:'center',
    justifyContent:'center'
    }
   
  });