import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import initialData from '../initialData';
import { getData, storeData } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({ navigation }) {
  const [randomGame, setRandomGame] = useState([]);

  useEffect(() => {
    const getDataAsync = async () => {
      const result = await getData();
      if (result == null) {
        await storeData(initialData);
        const newResult = await getData();
        setRandomGame(newResult[Math.floor(Math.random() * newResult.length)]);
      } else {
        setRandomGame(result[Math.floor(Math.random() * result.length)]);
      }
    };

    getDataAsync();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require('../../assets/logo.png')}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.randomGame}>
          {randomGame.images != null ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', randomGame);
              }}
              style={styles.imageContainer}
            >
              <Image
                style={styles.image}
                source={
                  randomGame.images[
                    Math.floor(Math.random() * randomGame.images.length)
                  ]
                }
              />
            </TouchableOpacity>
          ) : null}
          <Text style={styles.title}>{randomGame.title}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Info',
                'This application was developed by André Nunes',
                [{ text: 'OK', onPress: () => {} }]
              );
            }}
          >
            <MaterialIcons name="info" size={30} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Games');
            }}
          >
            <MaterialIcons name="settings" size={30} color="#444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff734e',
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 30
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: 100
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'gray'
  },
  logo: {
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  randomGame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 25,
    color: '#444'
  }
});

export default Home;
