import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

function List({ title, source, description, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {source ? <Image style={styles.image} source={source} /> : null}
      </View>
      <View style={styles.smallInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text numberOfLines={4}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: 5
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'gray'
  },
  smallInfo: {
    flex: 1,
    paddingHorizontal: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default List;
