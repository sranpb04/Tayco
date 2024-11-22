// LabelComponent.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Barcode from 'react-native-barcode-svg';

const LabelComponent = ({ order, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, isSelected && styles.selectedContainer]}>
        <View style={styles.headerContainer}>
          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderNumber}>ORDER # {order.orderNumber}</Text>
            <Text style={styles.itemNumber}>ITEM # {order.itemNumber}</Text>
          </View>
          <View style={styles.barcodeContainer}>
            <Barcode
              value="650775"
              format="CODE128"
              width={1}
              height={40}
              maxWidth={80}
            />
          </View>
        </View>
        <Text style={styles.description}>{order.description}</Text>
        <Text style={styles.plantDate}>PLANT DATE: {order.plantDate}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantity}>____/{order.quantity} QTY</Text>
          <Text style={styles.boxes}>____ of ____ BOXES</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 300,
    height: 170,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
  },
  orderInfoContainer: {
    flex: 1,
  },
  barcodeContainer: {
    width: 80,
    height: 40,
    marginLeft: 10,
  },
  selectedContainer: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
    borderWidth: 2,
  },
  orderNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemNumber: {
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    textAlign: 'center',
    marginVertical: 5,
  },
  plantDate: {
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  quantity: {
    flexGrow: 1,
    textAlign: 'left',
  },
  boxes: {
    flexGrow: 1,
    textAlign: 'right',
  },
});

export default LabelComponent;