// LabelScreen.jsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity, FlatList, StatusBar ,Button,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import LabelComponent from '../components/LabelComponent';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useTheme } from '../context/ThemeContext';

const LabelScreen = ({ route, navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { orderData } = route.params;
  const [selectedLabels, setSelectedLabels] = useState({});
  // Added state for selectedPrinter
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  const toggleLabelSelection = (index) => {
    setSelectedLabels(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const generateHTML = (data) => {
    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            @page {
              size: 4in 2in;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
            }
            .container {
              width: 4in;
              height: 2in;
              padding: 0.2in;
              border: 1px solid black;
              box-sizing: border-box;
              background: white;
              position: relative;
            }
            .order-number {
              font-weight: bold;
              font-size: 16pt;
              margin-bottom: 0.1in;
            }
            .item-number {
              font-size: 16pt;
              font-weight: bold;
              margin-bottom: 0.1in;
            }
            .description {
              font-size: 10pt;
              color: #333;
              text-transform: uppercase;
              margin-bottom: 0.05in;
            }
            .color {
              font-style: italic;
              font-size: 10pt;
              margin-bottom: 0.05in;
            }
            .plant-date {
              font-size: 8pt;
              margin-bottom: 0.1in;
            }
            .quantity-line {
              font-size: 12pt;
            }
            .fake-barcode {
              position: absolute;
              top: 0.2in;
              right: 0.2in;
              width: 0.8in;
              height: 0.4in;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .barcode-line {
              width: 2px;
              height: 100%;
              background: black;
            }
          </style>
        </head>
        <body>
          ${data.map(order => `
            <div class="container">
              <div class="order-number">ORDER # ${order.order_nr.padStart(6, '0')}</div>
              <div class="item-number">ITEM # ${order.item_number}</div>
              <div class="description">${order.item_description}</div>
              <div class="color">COLOR</div>
              <div class="plant-date">PLANT DATE ${order.plant_date}</div>
              <div class="quantity-line">/${order.quantity} QTY _____/_____BOXES</div>
              <div class="fake-barcode">
                ${Array(20).fill().map(() => `<div class="barcode-line"></div>`).join('')}
              </div>
            </div>
          `).join('')}
        </body>
      </html>
    `;
  };
  
  const printLabels = async () => {
    try {
      const html = generateHTML(orderData);
      const options = {
        html,
        width: '4in',
        height: '2in',
        printerUrl: selectedPrinter?.url,
      };
  
      await Print.printAsync(options);
      Alert.alert('Print Complete', `${orderData.length} label(s) printed successfully.`);
    } catch (error) {
      console.error('Error printing labels:', error);
      Alert.alert('Print Error', 'Failed to print labels');
    }
  }
  const printToPDF = async () => {
    try {
      const html = generateHTML(orderData);
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };


  const selectPrinter = async () => {
    if (Platform.OS === 'ios') {
      const printer = await Print.selectPrinterAsync();
      setSelectedPrinter(printer);
    }
  };


      
  return (

    
    <View style={[styles.container,{ backgroundColor: theme.background }]}>
    <View style={[styles.buttonContainer,{ backgroundColor: theme.background }]}>
      
      <Button title="Print Labels" onPress={printLabels} />
      <Button title="Generate PDF" onPress={printToPDF} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
    <ScrollView contentContainerStyle={[styles.scrollContainer,{ backgroundColor: theme.background }]}>
      {orderData.map((order, index) => (
        <LabelComponent
          key={index}
          order={{
            orderNumber: order.order_nr,
            itemNumber: order.item_number,
            description: order.item_description,
            plantDate: order.plant_date,
            quantity: order.quantity,
          }}
          isSelected={selectedLabels[index]}
          onPress={() => toggleLabelSelection(index)}
        />
      ))}
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

export default LabelScreen;