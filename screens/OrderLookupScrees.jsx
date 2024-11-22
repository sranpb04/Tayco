import React, { useState, useEffect, useRef } from 'react';
import {  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import  {LinearGradient}  from 'expo-linear-gradient';
import  {MaterialIcons}  from '@expo/vector-icons';
import supabase from '../utils/supabaseClient';
import { useTheme}  from '../context/ThemeContext';
import  {Camera} from 'expo-camera';

const OrderLookupScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  const cameraRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset or fetch data when the screen is focused
    });

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setInputText(data);
    setOrderId(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanning(false);
  };

  const searchOrder = async () => {
    if (!orderId.trim()) {
      Alert.alert('Error', 'Please enter a valid Order ID.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('joined')
        .select('*')
        .eq('order_nr', orderId.trim());

      if (error) throw error;

      setOrderData(data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch order data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderOrderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Label', { orderData: [item] })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Order # {item.order_nr}</Text>
        <Text style={styles.cardSubtitle}>Item: {item.item_number}</Text>
        <Text style={styles.cardDescription}>{item.item_description}</Text>
        <Text style={styles.cardDate}>Plant Date: {item.plant_date}</Text>
      </View>
    </TouchableOpacity>
  );

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <LinearGradient
      colors={['#F0F4FD', '#FFFFFF']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Order Lookup</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Order ID"
          value={orderId}
          onChangeText={setOrderId}
        />
        <TouchableOpacity style={styles.iconButton} onPress={() => setScanning(true)}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={searchOrder}>
          <MaterialIcons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {scanning ? (
        <View style={StyleSheet.absoluteFillObject}>
          <Camera
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeScannerSettings={{
              barCodeTypes: ['qr', 'ean13'],
            }}
          />
          <TouchableOpacity
            style={styles.closeScannerButton}
            onPress={() => setScanning(false)}
          >
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : orderData.length > 0 ? (
        <FlatList
          data={orderData}
          renderItem={renderOrderCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No data to display</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#FFF',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  searchButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#999',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 15,
  },
  cardContent: {
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});

export default OrderLookupScreen;
