import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const OrderInput = ({ orderId, setOrderId, onSearch, onScanPress }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={orderId}
      onChangeText={(text) => setOrderId(text.trim())}
      placeholder="Enter Order ID"
      keyboardType="numeric"
    />
    <Button title="Scan" onPress={onScanPress} />
    <Button title="Search" onPress={onSearch} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
});

export default OrderInput;