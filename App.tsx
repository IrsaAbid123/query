import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useGetDataQuery, useGetDataByIdQuery, useDeleteDataMutation } from './redux/getDataSlice';

const App = () => {
  const [getAll, setGetAll] = useState([]);
  const [getById, setGetById] = useState(null);
  const [deletedItems, setDeletedItems] = useState([]); // State to hold deleted items
  const [selectedItemId, setSelectedItemId] = useState(); // State to hold the selected item ID

  const { data: allData } = useGetDataQuery();
  const { data: dataById } = useGetDataByIdQuery(selectedItemId); // Using selectedItemId here

  const [deleteById] = useDeleteDataMutation();

  const getApi = () => {
    setGetAll(allData);
    setGetById(null);
  };

  const getApiById = (id) => {
    setSelectedItemId(id); // Update the selected item ID
    setGetById(dataById);
    console.log(id)
    console.log(dataById)
    setGetAll([]);
  };

  const deleteDataById = async (id) => {
    try {
      const res = await deleteById(id); // Delete the item with the provided ID
      console.warn(res);
      setDeletedItems(res); // Add deleted item to the list
      console.warn(res)
      setGetById(null);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.btn} onPress={getApi}>
          <Text style={styles.txt}>Get All Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={getApiById}>
          <Text style={styles.txt}>Get Product by ID</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={deleteDataById}>
          <Text style={styles.txt}>Delete Data by ID</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {getAll.map((item, index) => (
          <TouchableOpacity onPress={() => getApiById(item.id)} key={index}>
            <View style={styles.itemContainer}>
              <Image style={styles.img} source={{ uri: item.image }} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.itemTitleTxt}>{item.title}</Text>
                <Text numberOfLines={2}>{item.description}</Text>
                <View style={styles.priceAndRating}>
                  <Text style={styles.price}>${item.price}</Text>
                  <Text style={styles.rating}>{item.rating.rate}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteDataById(item.id)}>
                  <Text style={styles.deleteBtn}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {getById && (
          <View style={styles.itemContainer}>
            <Image style={styles.img} source={{ uri: getById.image }} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.itemTitleTxt}>{getById.title}</Text>
              <Text numberOfLines={2}>{getById.description}</Text>
              <View style={styles.priceAndRating}>
                <Text style={styles.price}>${getById.price}</Text>
                <Text style={styles.rating}>{getById.rating.rate}</Text>
              </View>
            </View>
          </View>
        )}
        {/* Display deleted items
        {deletedItems && (
          <View style={styles.itemContainer}>
            <Text style={styles.deletedItemText}>{deletedItems.title} - Deleted</Text>
          </View>
        )} */}
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'white'
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
  img: {
    height: 150,
    width: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  itemTitleTxt: {
    maxWidth: '50%',
    fontWeight: '700',
    color: 'black',
    fontSize: 17,
  },
  priceAndRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 140,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  price: {
    color: 'green',
    fontSize: 15,
  },
  rating: {
    color: 'orange',
  },
  deleteBtn: {
    backgroundColor: 'red',
    maxWidth: '25%',
    textAlign: 'center',
    padding: 8,
    borderRadius: 10,
    color: 'white',
    marginTop: 10,
  },
  deletedItemText: {
    color: 'red',
  },
});
