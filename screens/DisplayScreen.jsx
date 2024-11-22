// DisplaySettings.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DisplaySettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Display Settings</Text>
      <Text>Configure display settings here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DisplaySettings;
