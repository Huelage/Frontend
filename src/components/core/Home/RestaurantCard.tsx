import { CustomBox, StarRating } from "@components/misc";
import { useAppTheme } from "@hooks";
import { RestaurantInterface, UserTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React from "react";
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const RestaurantCard = ({ id, name, imgUrl, rating, location }: RestaurantInterface) => {
  const { color } = useAppTheme();
  const { navigate } = useNavigation<UserTabProps>();
  return (
    <View style={styles.container} testID="restaurant card">
      <CustomBox width={wp("60%")} height={230} pad={6} r={15} />
      <Image testID="restuarant image" style={styles.resImage} source={{ uri: imgUrl }} />
      <TouchableWithoutFeedback onPress={() => navigate("Vendors", { screen: "VendorHome", params: { vendorId: id }, initial: false })} testID="details box">
        <View style={styles.detailsBox}>
          <Text style={[styles.resName, { color: color.mainText }]}>{name}</Text>
          <StarRating rating={rating} />
          <Text style={[styles.resLocation, { color: color.mainGreen }]} numberOfLines={2}>{location}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    height: 230,
    marginLeft: 10,
    width: wp("60%")
  },
  resImage: {
    borderRadius: 15,
    height: 100,
    left: 6,
    width: wp("60%") - 20
  },
  detailsBox: {
    gap: 5,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 20
  },
  resName: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    textAlign: "center"
  },
  resLocation: {
    color: "#38742A",
    fontFamily: fonts.I_500,
    fontSize: 14,
    textAlign: "center"
  }
});
