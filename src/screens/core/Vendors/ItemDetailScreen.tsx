import { mockFoods } from "@api/mock";
import { CustomButton } from "@components/core/Home";
import { CustomImage } from "@components/misc";
import { AddToCart, ItemSideElement } from "@containers/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserTabProps, UserVendorsTabItemDetailRouteProps, extraInterface } from "@interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fonts, numberToCurrency } from "@utils";
import React, { useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ItemDetailScreen = () => {
  const { params: { itemId } } = useRoute<UserVendorsTabItemDetailRouteProps>();
  const item = mockFoods.find(food => food.id === itemId);
  if (!item) return null;
  const { color } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation<UserTabProps>();
  const [packSize, setPackSize] = useState<string | null>(item.pricingMethod === "PACKAGE" ? item.packageSizes[0].name : null);
  const [extras, setExtras] = useState<extraInterface[]>([]);

  const price = item.pricingMethod === "PACKAGE" ? item.packageSizes.find(pack => pack.name === packSize)?.price as number : item.price;
  const priceMethod = useMemo(() => {
    switch (item.pricingMethod) {
      case "PORTION":
        return "per portion";
      case "PRICE":
        return "minimum price";
      case "FIXED":
        return "per plate";
      case "PACKAGE":
        return `for ${packSize} package`;
      default:
        return "";
    }
  }, [item.pricingMethod, packSize]);
  return (
    <>
      <TouchableOpacity style={[styles.backButton, { backgroundColor: color.mainGreen, top }]} onPress={goBack} testID="go back">
        <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} style={{ left: -1 }} />
      </TouchableOpacity>
      <ScrollView style={[styles.container, { backgroundColor: color.mainBg }]} testID="item detail screen">
        <View style={[styles.itemHeader, { backgroundColor: color.mainGreen, paddingTop: top }]}>
          <CustomImage imgUrl={item.imgUrl} imgSize={wp('60%')} imgPad={0} style={[styles.itemImage, { top: top + 10 }]} shadowBlur={8} shadowHeight={10} shadowColor='rgba(76, 175, 80, 0.4)' />
        </View>
        <View style={styles.itemBody}>
          <View style={styles.itemInfo}>
            <Text style={[styles.itemName, { color: color.mainText }]}>{item.name}</Text>
            <Text style={[styles.itemPrice, { color: color.mainText }]}>{numberToCurrency(price)} <Text style={{ color: color.mainGreen }}>{priceMethod}</Text></Text>
            <Text style={[styles.itemDesc, { color: color.mainTextDim }]}>{item.description}</Text>
            {item.pricingMethod === "PACKAGE" ? (
              <FlatList
                data={item.packageSizes}
                horizontal
                keyExtractor={pack => pack.name}
                renderItem={({ item }) => (
                  <CustomButton fontSize={14} label={item.name} height={30} inactive={item.name !== packSize} onPress={() => setPackSize(item.name)} />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.packageSizeList}
              />
            ) : null}
          </View>
          {!!item.sides ? (
            <FlatList
              contentContainerStyle={styles.sidesList}
              data={item.sides}
              scrollEnabled={false}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item }) => <ItemSideElement {...item} extras={extras} setExtras={setExtras} />}
            />
          ) : null}
        </View>
      </ScrollView>
      <AddToCart price={price} extras={extras} quantity={1} />
    </>
  );
};

export default ItemDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemHeader: {
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: hp("22%"),
    justifyContent: "center",
  },
  backButton: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    left: 10,
    position: "absolute",
    width: 40,
    zIndex: 9999
  },
  itemImage: {
    flex: 1,
    height: wp('60%'),
    position: 'absolute',
    width: wp('60%'),
    borderRadius: wp('30%')
  },
  itemBody: {
    gap: 30,
    paddingBottom: 70
  },
  itemInfo: {
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: wp("30%")
  },
  itemName: {
    fontFamily: fonts.I_700,
    fontSize: 28
  },
  itemDesc: {
    fontFamily: fonts.I_600I,
    fontSize: 14,
    textAlign: "center"
  },
  itemPrice: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    textTransform: "capitalize"
  },
  packageSizeList: {
    gap: 20,
    paddingTop: 10
  },
  sidesList: {
    gap: 30,
    paddingBottom: 20
  }
});
