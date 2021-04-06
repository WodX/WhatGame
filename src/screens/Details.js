import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import Carousel from '../components/Carousel';

function Details({ route: { params: data }, navigation }) {
  useEffect(() => {
    navigation.setOptions({ title: data.title });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Carousel images={data.images} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text>{data.description}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  infoContainer: {
    padding: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Details;
