// DatabaseSettings.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const DatabaseSettings = () => {
  const [dbUrl, setDbUrl] = useState('');

  const testConnection = () => {
    if (!dbUrl) {
      Alert.alert('Error', 'Please enter a valid database URL');
      return;
    }

    // Simulate testing the database connection
    Alert.alert('Database Connection', `Testing connection to ${dbUrl}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Database Settings</Text>
      <TextInput
        style={styles.input}
        value={dbUrl}
        onChangeText={setDbUrl}
        placeholder="Enter database URL"
      />
      <Button
        title="Test Database Connection"
        onPress={testConnection}
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
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default DatabaseSettings;
