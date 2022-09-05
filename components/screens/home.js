//import * as React from 'react';
import { Text, View,Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack  = createNativeStackNavigator()


export function HomeScreen() {
   
  return(
    <Stack.Navigator >
    <Stack.Screen name="Details" component={SettingsScreen} />
    <Stack.Screen name="Move" component={MoveScreen} />
  </Stack.Navigator>
  )

  }
  
 export function SettingsScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Moved To Screen</Text>
        <Button title='Move To' onPress={() => navigation.navigate('Move')} />
      </View>
    );
  }

  export function MoveScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Moved To Screen</Text>
      </View>
    );
  }