import { ScrollView,SafeAreaView,StyleSheet, Text, View,TouchableOpacity,Image,FlatList } from 'react-native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign'
import Info from './prescriptionInfo';
import { GetData } from './prescriptions';
import { AppointmentOptions } from './selectAppointments';
import { PendingData } from './PendingAppointments';
import { ActiveAppointments } from './activeAppointments';
import { DoneAppointments } from './doneAppointments';
import CreateAppointment from './createAppointments';
import Orders from './Orders';
import Cart from './cart';
import CheckingOut from './checkingout';
import OrdersView from './OrdersView';
import PrescriptionView from './prescriptionItem';
import ChangePassword from './changepassword';

import { selectCount,minus,plus } from '../../../reduxModern/reducer/cartSlice';

import { useSelector,useDispatch } from 'react-redux';

const HomeStack = createNativeStackNavigator();

let mainPicUrl = "https://firebasestorage.googleapis.com/v0/b/dnk-pharmacy.appspot.com/o/appimages%2Fdnk.jpeg?alt=media&token=d6c5e4bf-612a-4282-a218-6c1379b9aa83";


function HomeScreen(props){
  return(
    <SafeAreaView>

    <ScrollView>   

  <View style={{width:'100%'}}>

  <Image style={styles.productImage} source={{uri:mainPicUrl}} 
   resizeMode="stretch"
    resizeMethod="resize"
    />

   
{/* <FlatList
        data={exercises}
        style={{
          paddingHorizontal: 20,
          marginTop: -60,
        }}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={item => item.title}
        renderItem={({item}) => <ExerciseItem exercise={item} />}
      /> */}

  <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Display')}>
     <View>
      <Text>Drugs</Text>
    </View>
    </TouchableOpacity>

  <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Pharmacy')}>
    <View style={styles.container}>
    <Text>Shop</Text>
    </View>
    </TouchableOpacity>

   </View>

   <View style={{width:'100%',marginTop:'5%'}}>

   <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Appointments')}>
     <View style={styles.container}>
      <Text>Appointments</Text>
    </View>
    </TouchableOpacity>


    <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Orders')}>
    <View style={styles.container}>
    <Text>Orders</Text>
    </View>
    </TouchableOpacity>

    
   </View>

    </ScrollView>
    </SafeAreaView>
  );

  //PendingAppointments
}

export default function Home(props) {

const count = useSelector(selectCount).length;

  return (
      <HomeStack.Navigator screenOptions={{
       headerStyle: {
         backgroundColor:'#3b3e40',
       },
       headerTintColor: '#cfc8c8',
       headerTitleStyle: {
         fontWeight:'bold',
         color:'white'
       }
     }}>

<HomeStack.Screen name="HomeMain" component ={HomeScreen} options={{ headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="Pharmacy" component ={Info} options={{ headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="Display" component ={GetData} options={{ headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="Prescription" component ={PrescriptionView} options={{ 
   headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="Cart" component ={Cart} options={{ headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="CheckOut" component ={CheckingOut} options={{ headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="Appointments" component ={AppointmentOptions} options={{ headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="Orders" component ={Orders} options={{  headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="Order" component ={OrdersView} options={{ 
  headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="PendingAppointments" component ={PendingData} options={{ 
   headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="ActiveAppointments" component ={ActiveAppointments} options={{ 
   headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />


<HomeStack.Screen name="DoneAppointments" component ={DoneAppointments} options={{ 
   headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

<HomeStack.Screen name="CreateAppointmets" component ={CreateAppointment} options={{ 
   headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

    
<HomeStack.Screen name="Password" component ={ChangePassword} options={{ 
  headerRight: () => (
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={styles.Cover}>
          <Text style={styles.Number}>{count}</Text>
      </View>

            <Icons name="shoppingcart"
      size={27} color="#f7f7f2"
      >  </Icons>
      </TouchableOpacity>
        </View>
          ) }} />

     </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'40%',
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    margin:5,
   height:100,
    textAlign: 'center',
    marginLeft:'5%',
    cursor:'pointer'
  },
  Cover : {
    position:'absolute',
    borderRadius:15,
    backgroundColor: 'rgba(95,197,123,0.8)',
    width:20,
    alignItems:'center',
    height:20,
    justifyContent:'center',
    right:15,
    bottom:20
} ,
    Number : {
        color:'white',
        fontWeight:'bold'
    },
    productImage: {
      height:250
    }
});
