import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fontEnum';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/core/CustomButton';
import Categories from '../../containers/Categories';
import PopularFood from '../../containers/PopularFood';
import PopularRestaurant from '../../containers/PopularRestaurant';
import { Image } from 'react-native';
import MainSearchBar from '../../components/core/MainSearchBar';
import HomeHero from '../../components/core/HomeHero';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ gap: 15 }}>
          <MainSearchBar />
          <HomeHero />
          {/* <Categories /> */}
          <PopularFood />
          <PopularRestaurant />
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
  categories: {
    gap: 8
  },
  categoriesText: {
    fontFamily: fonts.I_700,
    fontSize: 20,
    letterSpacing: 1
  },
  categoryButtons: {

  }
});