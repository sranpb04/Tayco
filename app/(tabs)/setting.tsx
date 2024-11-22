
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import Mailer from 'react-native-mail';
import { useTheme } from '../../context/ThemeContext';

const SettingsScreen = () => {
  // Use ThemeContext
  const { isDarkMode, toggleTheme, fontSize, setFontSize, brightness, setBrightness } = useTheme();
  const [userName, setUserName] = useState('');
  const [bugDetails, setBugDetails] = useState('');

  // Remove local state for isDarkMode, brightness, and fontSize

  const handleSendBugReport = () => {
    if (!userName || !bugDetails) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    Mailer.mail({
      subject: 'Bug Report',
      recipients: ['sranpb30@gmail.com'],
      body: `User: ${userName}\nBug Details: ${bugDetails}`,
      isHTML: false,
    }, (error, event) => {
      if (error) {
        Alert.alert('Error', 'Could not send bug report.');
      } else {
        Alert.alert('Success', 'Bug report sent successfully!');
        setUserName('');
        setBugDetails('');
      }
    });
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      <Text style={[styles.header, { fontSize: fontSize + 4, color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Settings</Text>

      {/* Display Settings */}
      <View style={styles.section}>
        <Text style={[styles.title, { fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Display</Text>
        <Text style={{ fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }}>Brightness</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={brightness}
          onValueChange={setBrightness}
        />
        <View style={styles.row}>
          <Text style={{ fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
        <Text style={{ fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }}>Font Size</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={30}
          value={fontSize}
          onValueChange={setFontSize}
        />
      </View>

      {/* Barcode Scanning History */}
      <View style={styles.section}>
        <Text style={[styles.title, { fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }]}>History</Text>
        <Button title="View Scanned Barcodes History" onPress={() => {/* Implement functionality */}} />
      </View>

      {/* Printer Settings */}
      <View style={styles.section}>
        <Text style={[styles.title, { fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Printer Settings</Text>
        <Button title="Configure Printer" onPress={() => {/* Implement functionality */}} />
      </View>

      {/* Report Bug */}
      <View style={styles.section}>
        <Text style={[styles.title, { fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Report Bug</Text>
        <TextInput
          style={[styles.input, { fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }]}
          placeholder="Your Name"
          value={userName}
          onChangeText={setUserName}
          placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
        />
        <TextInput
          style={[styles.input, { fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }]}
          placeholder="Bug Details"
          value={bugDetails}
          onChangeText={setBugDetails}
          multiline
          placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
        />
        <Button title="Send Bug Report" onPress={handleSendBugReport} />
      </View>

      {/* About Software */}
      <View style={styles.section}>
        <Text style={[styles.title, { fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }]}>About Software</Text>
        <Text style={{ fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }}>Build No: 1.0.0</Text>
        <Text style={{ fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }}>Publish Date: 2024-11-01</Text>
        <Text style={{ fontSize, color: isDarkMode ? '#FFFFFF' : '#000000' }}>Last Updated: 2024-11-18</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkMode: {
    backgroundColor: '#121212',
    color: '#FFFFFF',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default SettingsScreen;
