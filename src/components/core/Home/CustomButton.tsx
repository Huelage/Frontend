import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  label: string;
  height: number;
  fontSize: number;
  icon?: keyof typeof Ionicons.glyphMap;
  inactive?: boolean;
  onPress: () => void;
}

const CustomButton = ({ label, icon, height, fontSize, inactive, onPress }: ButtonProps) => {
  const { color } = useAppTheme();
  return (
    <TouchableOpacity style={{ height }} onPress={onPress} testID="custom button">
      <View style={[styles.buttonBox, { backgroundColor: inactive ? "rgba(188, 181, 181, 0.25)" : color.mainGreen }]}>
        <Text style={[styles.buttonText, { fontSize }, inactive && { color: color.mainTextDim }]}>{label}</Text>
        {icon && <Ionicons name={icon} size={20} color={inactive ? color.mainText : "white"} testID="button icon" />}
      </View>
    </TouchableOpacity>
  );
};

export default memo(CustomButton);

const styles = StyleSheet.create({
  buttonBox: {
    alignItems: "center",
    backgroundColor: "#47CA4C",
    borderRadius: 24,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  buttonInactive: {
    backgroundColor: "rgba(188, 181, 181, 0.25)"
  },
  buttonText: {
    color: "#fff",
    fontFamily: fonts.I_700,
    textTransform: "capitalize"
  },
  buttonTextInactive: {
    color: "#626262"
  }
});