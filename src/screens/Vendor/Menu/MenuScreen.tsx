import { useAppSelector } from "@api/app/appHooks";
import { GET_PRODUCTS } from "@api/graphql";
import { getEntity } from "@api/slices/globalSlice";
import { useQuery } from "@apollo/client";
import { CustomButton } from "@components/core/Home";
import { MenuItem } from "@components/vendor/Menu";
import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserFoodInterface, VendorMenuTabProps } from "@interfaces";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fonts, foodCategories } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

const MenuScreen = () => {
  const entity = useAppSelector(getEntity);
  const { data, loading, refetch } = useQuery(GET_PRODUCTS, { variables: { vendorId: entity?.id } });
  const [currCategory, setCurrCategory] = useState<string>("ALL");
  const [menuItems, setMenuItems] = useState<UserFoodInterface[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<UserFoodInterface[]>([]);
  const { color } = useAppTheme();
  const { navigate } = useNavigation<VendorMenuTabProps>();

  useEffect(() => {
    if (currCategory === "ALL") return setFilteredMenu(menuItems);
    setFilteredMenu(menuItems.filter(food => food.category === currCategory));
  }, [currCategory, menuItems]);
  useEffect(() => {
    if (data) {
      const items = data.getVendorProducts;
      setMenuItems(items.map((item: any) => ({
        id: item.productId, name: item.name, description: item.description,
        imgUrl: item.imgUrl, category: item.food.category, isFavourite: false,
        availability: item.food.availability, pricingMethod: item.food.pricingMethod,
        preparationTime: item.food.preparationTime, packageSizes: item.food.packageSizes,
        price: item.food.price, sides: item.food.sides
      })));
    }
  }, [data, loading]);
  useFocusEffect(useCallback(() => {
    refetch();
  }, [refetch]));
  return (
    <View style={[styles.container, { backgroundColor: color.mainBg }]} testID="menu screen">
      {!menuItems.length ? (
        <View style={styles.noOrdersBox}>
          <Image source={require("@images/myorderscreen.png")} testID="order empty image" />
          <Text style={[styles.noOrdersBoxText, { color: color.accentText }]}>You don't have any item in your menu</Text>
        </View>
      ) : (
        <View style={styles.order} testID="main box">
          <Text style={[styles.categoriesText, { color: color.mainText }]}>Categories</Text>
          <FlatList
            contentContainerStyle={styles.categoryItemList}
            data={foodCategories}
            horizontal
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <CustomButton fontSize={16} label={item} height={36} inactive={item !== currCategory} onPress={() => setCurrCategory(item)} />
            )}
            testID="category list"
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
            testID="menu item list"
          />
        </View>
      )}
      <TouchableOpacity onPress={() => navigate("AddItem")} style={[styles.addItem, { backgroundColor: color.mainGreen }]} testID="add item button">
        <Feather name="plus" size={34} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  noOrdersBox: {
    gap: 30,
    justifyContent: "center",
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
  categoryItemList: {
    gap: 20,
    paddingHorizontal: 20
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
    alignItems: "center",
    borderRadius: 30,
    bottom: 20,
    height: 60,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    width: 60
  }
});