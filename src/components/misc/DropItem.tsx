import { FontAwesome } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { DropDataInterface } from "@interfaces";
import { fonts, shadowStyle } from "@utils";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, ZoomOut } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface DropItemInterface {
  idx: number;
  item: DropDataInterface;
  totalItems: number;
}

const DropItem = ({ item, idx, totalItems }: DropItemInterface) => {
  const { color } = useAppTheme();
  return (
    <Animated.View
      entering={FadeInUp.delay(100 + idx * 100)}
      exiting={ZoomOut.delay(100 + (totalItems - idx) * 100)}
      style={[styles.optionItem, { backgroundColor: color.main }]}
    >
      <View style={[styles.optionImageBox, { backgroundColor: color.main }]}>
        <Image source={{ uri: item.imgUrl }} style={styles.optionImage} />
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.headerText, { color: color.mainText }]}>{item.value}</Text>
        {item.desc ? <Text style={[styles.descText, { color: color.mainTextDim }]}>{item.desc}</Text> : null}
      </View>
      <TouchableOpacity style={[styles.iconBox, { backgroundColor: color.main }]}>
        <FontAwesome name="angle-right" size={24} color={color.mainGreen} style={{ marginLeft: 2 }} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DropItem;

const styles = StyleSheet.create({
  optionItem: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    height: 80,
    left: 30,
    marginBottom: 15,
    padding: 20,
    width: wp("100%") - 110,
    ...shadowStyle
  },
  optionImageBox: {
    alignItems: "center",
    borderRadius: 20,
    height: 60,
    justifyContent: "center",
    left: -30,
    padding: 10,
    position: "absolute",
    width: 60,
    ...shadowStyle
  },
  optionImage: {
    borderRadius: 25,
    height: 50,
    width: 50
  },
  infoBox: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20
  },
  headerText: {
    fontFamily: fonts.I_700,
    fontSize: 20,
  },
  descText: {
    fontFamily: fonts.I_300,
    fontSize: 12
  },
  iconBox: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    right: -20,
    width: 40,
    ...shadowStyle
  }
});