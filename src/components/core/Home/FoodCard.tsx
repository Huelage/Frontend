import { CustomBox, CustomImage, CustomModal } from "@components/misc";
import { useAppTheme } from "@hooks";
import { UserFoodInterface } from "@interfaces";
import { CheckBox } from "@rneui/themed";
import { fonts } from "@utils";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FoodModalContent from "./FoodModalContent";


const FoodCard = ({ imgUrl, name, isFavourite, description }: UserFoodInterface) => {
  const { color } = useAppTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(isFavourite);
  return (
    <>
      <View style={styles.container} testID="food card">
        <CustomBox height={160} pad={6} width={wp("60%")} r={10} />
        <View style={styles.foodDetails}>
          <View style={styles.foodIntro}>
            <CustomImage imgUrl={imgUrl} imgSize={110} imgPad={5} style={styles.foodImageContainer} />
            <CheckBox
              checked={isFav}
              onPress={() => setIsFav(!isFav)}
              checkedIcon="heart"
              testID="favourite toggle"
              uncheckedIcon="heart-o"
              checkedColor="red"
              uncheckedColor={color.mainText}
              containerStyle={{ backgroundColor: color.cardBg, padding: 0, margin: 0 }}
            />
          </View>
          <TouchableWithoutFeedback testID="toggle modal" onPress={() => setShowModal(true)}>
            <View style={styles.detailBox}>
              <Text style={[styles.foodName, { color: color.mainText }]}>{name}</Text>
              <Text style={[styles.foodPrice, { color: color.mainText }]} numberOfLines={2}>{description}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <CustomModal isVisible={showModal}>
        <FoodModalContent close={setShowModal} imgUrl={imgUrl} name={name} description={description} />
      </CustomModal>
    </>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    height: 155,
    marginLeft: 10,
    marginTop: 51,
    paddingBottom: 5,
    width: wp("60%")
  },
  foodBox: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 155,
    width: wp("60%"),
  },
  foodDetails: {
    paddingHorizontal: 12,
    paddingVertical: 15
  },
  foodIntro: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 5,
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 35
  },
  detailBox: {
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  foodImageContainer: {
    alignItems: "center",
    borderRadius: 60,
    height: 120,
    justifyContent: "center",
    left: (wp("60%") - 140) / 2,
    position: "absolute",
    top: -65,
    width: 120,
    zIndex: 2
  },
  foodCalories: {
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
    justifyContent: "center"
  },
  foodCaloriesText: {
    fontFamily: fonts.I_400,
    fontSize: 12
  },
  foodName: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    textAlign: "center"
  },
  foodPrice: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: fonts.I_500,
    fontSize: 14,
    textAlign: "center"
  },
  foodRatingBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
    justifyContent: "center"
  },
  foodRating: {
    fontFamily: fonts.I_400,
    fontSize: 14,
    paddingTop: 1
  }
});