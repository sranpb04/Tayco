// PrinterSettings.jsx
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button, Alert } from 'react-native';

const PrinterSettings = () => {
  const [isPrinterEnabled, setIsPrinterEnabled] = useState(false);

  const togglePrinter = () => {
    setIsPrinterEnabled(prevState => !prevState);
    Alert.alert('Printer Status', isPrinterEnabled ? 'Printer Disabled' : 'Printer Enabled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Printer Settings</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Enable Printer</Text>
        <Switch
          value={isPrinterEnabled}
          onValueChange={togglePrinter}
        />
      </View>
      <Button
        title="Test Printer"
        onPress={() => Alert.alert('Printer Test', 'This is a printer test.')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
});

export default PrinterSettings;
