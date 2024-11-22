import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import OrderLookupScreen from '../../screens/OrderLookupScrees';
import AppNavigator from '../../components/AppNaigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../../context/ThemeContext.jsx';
//import { ScanProvider } from '../../context/ScanContext';
import { NavigationIndependentTree } from '@react-navigation/native';
const App = () => {
  return (
    <ThemeProvider>
    <NavigationIndependentTree>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NavigationIndependentTree>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;