import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts, shadowStyle } from "@utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ControllerInterface {
  quantity: number;
  increase: () => void;
  decrease: () => void;
}

const QuantityController = ({ quantity, increase, decrease }: ControllerInterface) => {
  const { color } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: color.cardBg }]} testID="quantity controller">
      <TouchableOpacity onPress={decrease} testID="decrease quantity" style={[styles.buttonBox, { backgroundColor: color.mainGreen }]} >
        <AntDesign name="minus" size={12} color="white" />
      </TouchableOpacity>
      <Text style={[styles.quantity, { color: color.mainText }]} testID="quantity value">{quantity}</Text>
      <TouchableOpacity onPress={increase} testID="increase quantity" style={[styles.buttonBox, { backgroundColor: color.mainGreen }]} >
        <AntDesign name="plus" size={12} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityController;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    ...shadowStyle
  },
  buttonBox: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  quantity: {
    fontFamily: fonts.I_600,
    fontSize: 16
  }
});