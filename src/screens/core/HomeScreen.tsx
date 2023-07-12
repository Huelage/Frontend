import { HomeHero, MainSearchBar } from '@components/core/Home';
import { Categories, PopularFood, PopularRestaurant } from '@containers';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ gap: 15 }}>
          <MainSearchBar />
          <HomeHero />
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
  }
});