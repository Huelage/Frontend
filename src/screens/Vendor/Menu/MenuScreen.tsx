import { mockFoods } from '@api/mock';
import { CustomButton } from '@components/core/Home';
import { MenuItem } from '@components/vendor/Menu';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { UserFoodInterface } from '@interfaces';
import { fonts, foodCategories } from '@utils';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';

interface MenuScreenInterface {
  testEmpty?: boolean;
}

const MenuScreen = ({ testEmpty }: MenuScreenInterface) => {
  const [currCategory, setCurrCategory] = useState<string>("ALL");
  const [filteredMenu, setFilteredMenu] = useState<UserFoodInterface[]>([]);
  const foods = mockFoods;
  const { color } = useAppTheme();

  useEffect(() => {
    if (currCategory === "ALL") return setFilteredMenu(foods);
    setFilteredMenu(foods.filter(food => food.category === currCategory));
  }, [currCategory]);
  return (
    <View style={[styles.container, { backgroundColor: color.mainBg }]} testID='menu screen'>
      {testEmpty || !mockFoods.length ? (
        <View style={styles.noOrdersBox}>
          <Image source={require("@images/myorderscreen.png")} testID='order empty image' />
          <Text style={[styles.noOrdersBoxText, { color: color.accentText }]}>You don't have any item in your menu</Text>
        </View>
      ) : (
        <View style={styles.order}>
          <Text style={[styles.categoriesText, { color: color.mainText }]}>Categories</Text>
          <FlatList
            data={foodCategories}
            horizontal
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <View style={styles.categoryItem}>
                <CustomButton fontSize={16} label={item} height={36} inactive={item !== currCategory} onPress={() => setCurrCategory(item)} />
              </View>
            )}
            testID='category list'
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          />
          <Animated.FlatList
            contentContainerStyle={styles.menuItemList}
            data={filteredMenu}
            itemLayoutAnimation={Layout.springify().damping(15).delay(350)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MenuItem item={item} />
            )}
          />
        </View>
      )}
      <TouchableOpacity style={[styles.addItem, { backgroundColor: color.mainGreen }]} testID='add item button'>
        <Feather name="plus" size={34} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  noOrdersBox: {
    gap: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  noOrdersBoxText: {
    fontFamily: fonts.I_600I,
    fontSize: 16,
    paddingBottom: 30
  },
  order: {
    flex: 1,
    gap: 15,
    paddingTop: 20
  },
  categoriesText: {
    fontFamily: fonts.I_700,
    fontSize: 20,
    paddingBottom: 5,
    paddingHorizontal: 20
  },
  categoryItem: {
    paddingLeft: 20
  },
  categoryContainer: {
    flexGrow: 0,
    paddingBottom: 20
  },
  menuItemList: {
    gap: 15,
    paddingBottom: 80
  },
  addItem: {
    alignItems: 'center',
    borderRadius: 30,
    bottom: 20,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 60
  }
});