import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fontEnum';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/core/CustomButton';
import Categories from '../../containers/Categories';
import PopularFood from '../../containers/PopularFood';
import PopularRestaurant from '../../containers/PopularRestaurant';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ gap: 15 }}>
          <Text style={styles.homeSearchText}>What would you like to eat?</Text>
          <View style={styles.homeSearchBox}>
            <TextInput
              style={styles.homeSearchInput}
              placeholder='Search for Restaurant/Food'
            />
            <View style={styles.homeSearchButton}>
              <Ionicons name="search" size={36} color="white" />
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
    fontFamily: fonts.O_700,
    fontSize: 20,
    letterSpacing: 1
  },
  categoryButtons: {

  },
  homeSearchBox: {
    alignItems: 'center',
    borderColor: "#4CAF50",
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    height: 60,
    paddingLeft: 15,
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
    fontFamily: fonts.O_400,
    fontSize: 18,
    height: 45
  },
  homeSearchText: {
    color: "#4CAF50",
    fontFamily: fonts.O_700,
    fontSize: 18
  },
});