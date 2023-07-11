import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fontEnum';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/core/CustomButton';
import Categories from '../../containers/Categories';
import PopularFood from '../../containers/PopularFood';
import PopularRestaurant from '../../containers/PopularRestaurant';
import { Image } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ gap: 15 }}>
          <View style={styles.homeSearchBox}>
            <Ionicons name="search" size={24} color="#29A40A" />
            <TextInput
              style={styles.homeSearchInput}
              placeholder='Search dishes...'
            />
            <View style={styles.homeSearchBoxFilter}>
              <Image style={styles.homeSearchBoxFilterIcon} source={require('../../../assets/icons/home-group.png')} />
            </View>
          </View>
          <Categories />
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
    backgroundColor: "#fff",
    paddingHorizontal: 20
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

  },
  homeSearchBox: {
    alignItems: 'center',
    backgroundColor: "#F3F3F3",
    borderRadius: 24,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    height: 55,
    marginTop: 10,
    paddingHorizontal: 15
  },
  homeSearchBoxFilter: {
    alignItems: 'center',
    backgroundColor: "#29A40A",
    borderRadius: 5,
    height: 35,
    justifyContent: 'center',
    width: 35
  },
  homeSearchBoxFilterIcon: {
    height: 20,
    width: 20
  },
  homeSearchButton: {
    alignItems: 'center',
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  homeSearchInput: {
    color: 'rgba(0, 0, 0, .7)',
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 18,
    height: 45
  },
  homeSearchText: {
    color: "#4CAF50",
    fontFamily: fonts.I_700,
    fontSize: 18
  },
});