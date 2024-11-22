import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const OrderTable = ({ data }) => (
  <ScrollView style={styles.container}>
    {data.length > 0 ? (
      <>
        <View style={styles.row}>
          {Object.keys(data[0]).map((key) => (
            <Text key={key} style={styles.headerCell}>{key}</Text>
          ))}
        </View>
        {data.map((row, index) => (
          <View key={index} style={styles.row}>
            {Object.values(row).map((value, valueIndex) => (
              <Text key={valueIndex} style={styles.cell}>{value.toString()}</Text>
            ))}
          </View>
        ))}
      </>
    ) : (
      <Text style={styles.noDataText}>No data to display</Text>
    )}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default OrderTable;