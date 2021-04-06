import React, { useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions
} from 'react-native';

function Carousel({ images }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={styles.scrollContainer}>
      <ScrollView
        horizontal={true}
        style={styles.scrollViewStyle}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
      >
        {images.map((image, imageIndex) => {
          return (
            <View style={{ width: windowWidth, height: 250 }} key={imageIndex}>
              <ImageBackground source={image} style={styles.card} />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {images.map((image, imageIndex) => {
          const color = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1)
            ],
            outputRange: ['silver', '#ff734e', 'silver'],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={imageIndex}
              style={[styles.normalDot, { backgroundColor: color }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: 275
  },
  card: {
    flex: 1
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    borderColor: '#ff734e',
    backgroundColor: 'silver',
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Carousel;
