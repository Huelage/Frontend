import { GET_VENDOR_INFO } from "@api/graphql";
import { useQuery } from "@apollo/client";
import { CustomButton, MainSearchBar } from "@components/core/Home";
import { VendorProduct } from "@components/core/Vendor";
import { VendorLoader } from "@components/loaders";
import { StarRating } from "@components/misc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserFoodInterface, UserVendorTabProps, UserVendorsTabVendorRouteProps, VendorInterface } from "@interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fonts, foodCategories } from "@utils";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VendorScreen = () => {
  const { params: { vendorId } } = useRoute<UserVendorsTabVendorRouteProps>();
  const { data, loading } = useQuery(GET_VENDOR_INFO, { variables: { vendorId } });
  const [vendor, setVendor] = useState<VendorInterface>();
  const { goBack } = useNavigation<UserVendorTabProps>();
  const [currCategory, setCurrCategory] = useState<string>("ALL");
  const [filteredMenu, setFilteredMenu] = useState<UserFoodInterface[]>([]);
  const insets = useSafeAreaInsets();
  const { color } = useAppTheme();
  const handleSearch = (val: string) => { console.log(val); };

  useEffect(() => {
    if (vendor) {
      if (currCategory === "ALL") return setFilteredMenu(vendor.products);
      setFilteredMenu(vendor.products.filter(food => food.category === currCategory));
    }
  }, [currCategory, vendor]);
  useEffect(() => {
    if (data) {
      const res = data.getVendorProfile;
      const formattedVendor: VendorInterface = {
        id: res.vendorId, businessName: res.businessName, businessAddress: res.businessAddress,
        repName: res.repName, avgResponseTime: res.avgResponseTime, imgUrl: res.entity.imgUrl,
        products: res.products.map((item: any) => {
          return ({
            id: item.productId, name: item.name, description: item.description,
            imgUrl: item.imgUrl, category: item.food.category, isFavourite: false,
            availability: item.food.availability, pricingMethod: item.food.pricingMethod,
            preparationTime: item.food.preparationTime, packageSizes: item.food.packageSizes,
            price: item.food.price, sides: item.food.sides
          });
        }), rating: res.rating, noOfReviews: res.reviews.length
      };
      setVendor(formattedVendor);
    }
  }, [data]);
  return (
    <>
      {loading ? <VendorLoader /> : (
        <>
          <ImageBackground style={[styles.headerBox, { paddingTop: insets.top + 40 }]} source={{ uri: vendor?.imgUrl }} testID="vendor screen header">
            <TouchableOpacity style={[styles.backButton, { backgroundColor: color.mainGreen }]} onPress={goBack} testID="go back">
              <MaterialCommunityIcons name="chevron-left" size={35} color="black" style={{ left: -1 }} />
            </TouchableOpacity>
            <MainSearchBar searchFunc={handleSearch} />
          </ImageBackground>
          <View style={[styles.mainBox, { backgroundColor: color.mainBg }]} testID="vendor screen">
            <View style={styles.infoBox} testID="vendor info box">
              <Text style={[styles.resName, { color: color.mainText }]}>{vendor?.businessName}</Text>
              <View style={styles.ratingBox}>
                <StarRating rating={vendor?.rating ?? 0} size={18} />
                <Text style={[styles.ratingText, { color: color.mainText }]}>({vendor?.noOfReviews} Reviews)</Text>
              </View>
              <Text style={[styles.locationText, { color: color.mainTextDim }]}>📍 {vendor?.businessAddress}</Text>
            </View>
            <FlatList
              contentContainerStyle={styles.categoryItemList}
              data={foodCategories}
              horizontal
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <CustomButton fontSize={16} label={item} height={36} inactive={item !== currCategory} onPress={() => setCurrCategory(item)} />
              )}
              testID="vendor category list"
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
            />
            <Animated.FlatList
              contentContainerStyle={styles.vendorProductList}
              data={filteredMenu}
              itemLayoutAnimation={Layout.springify().damping(15).delay(350)}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <VendorProduct item={item} vendorId={vendorId} />
              )}
              testID="vendor product list"
            />
          </View>
        </>
      )}
    </>
  );
};

export default VendorScreen;

const styles = StyleSheet.create({
  headerBox: {
    gap: 20,
    justifyContent: "center"
  },
  backButton: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginLeft: 20,
    width: 40
  },
  mainBox: {
    flex: 1,
    gap: 10,
    paddingTop: 20
  },
  infoBox: {
    gap: 5,
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  resName: {
    color: "#F0FFF0",
    fontFamily: fonts.I_700,
    fontSize: 26
  },
  ratingBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5
  },
  ratingText: {

  },
  emojiCon: {
    fontSize: 16
  },
  locationText: {
    fontFamily: fonts.I_600I,
    fontSize: 16
  },
  vendorList: {
    gap: 15,
    paddingTop: 0,
    width: wp("100%")
  },
  vendorCard: {
    paddingHorizontal: 20
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
  vendorProductList: {
    gap: 15,
    paddingBottom: 20
  }
});