import { MainSearchBar } from '@components/core/Home';
import { Categories, PopularFood, PopularRestaurant } from '@containers';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ gap: 15 }}>
          <MainSearchBar />
          <Image style={styles.heroImage} source={require('@images/heroImg.png')} />
          <PopularFood />
          <PopularRestaurant />
          <Categories />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heroImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    height: undefined,
    marginTop: -10
  }
});