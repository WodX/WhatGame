import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import List from '../components/List';
import { getData } from '../api';

function Games({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataAsync = async () => {
      setData(await getData());
    };

    getDataAsync();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(data) => JSON.stringify(data.id)}
        renderItem={({ item }) => (
          <List
            description={item.description}
            title={item.title}
            source={item.images[0]}
            onPress={() => {
              navigation.navigate('Details', item);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }
});

export default Games;
