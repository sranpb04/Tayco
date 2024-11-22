import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderLookupScreen from '../screens/OrderLookupScrees';
import LabelScreen from '../screens/LabelScreen'; // Adjust path as needed
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen'


//import Header from '../components/Header';
//import { useScan } from '../context/ScanContext';
const Stack = createStackNavigator();


const AppNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={({ navigation }) => ({
        header: () => <CustomHeader scannedCount={scannedCount}  initialRouteName="OrderLookup"/>, 
      })}
    >

        <Stack.Screen name="OrderLookup" component={OrderLookupScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Label" component={LabelScreen} options={{headerShown:false}}/>
        <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
      </Stack.Navigator>
   
  );
};


export default AppNavigator;