// History.jsx
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const History = () => {
  const [history, setHistory] = useState([
    { id: '1', action: 'Printed label for order #123' },
    { id: '2', action: 'Scanned barcode for order #124' },
    { id: '3', action: 'Updated order status for #125' },
  ]);

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>{item.action}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Button
        title="Clear History"
        onPress={clearHistory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default History;
