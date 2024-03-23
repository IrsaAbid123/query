import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useGetDataQuery, useGetDataByIdQuery, useDeleteDataMutation, usePostDataMutation } from './redux/getDataSlice';

const App = () => {
  // Get all the data
  const { data, isError, isLoading, isSuccess } = useGetDataQuery();
  const [items, setItems] = useState([]);

  // Function to log data by id
  const getApi = () => {
    setItems(data);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}>
        {/* Get method */}
        <TouchableOpacity style={styles.btn} onPress={getApi}>
          <Text style={styles.txt}>Get Data by Get Method</Text>
        </TouchableOpacity>

        {/* Display items */}
        {items.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  btn: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  txt: {
    color: 'black',
    fontSize: 15,
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
  },
});
