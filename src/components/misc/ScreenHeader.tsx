import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ScreenHeaderProps {
  title: string;
  goBack?: () => void;
}

const ScreenHeader = ({ title, goBack }: ScreenHeaderProps) => {
  const { color } = useAppTheme();
  return (
    <View style={[styles.headerBox, { borderColor: color.mainGreen }]}>
      <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
        <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
      </TouchableOpacity>
      <Text style={[styles.headerText, { color: color.mainText }]}>{title}</Text>
    </View>
  );
};

export default memo(ScreenHeader);

const styles = StyleSheet.create({
  headerBox: {
    alignItems: "center",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 10
  },
  backButton: {
    position: "absolute",
    top: -3,
    left: 10
  },
  headerText: {
    fontFamily: fonts.I_500,
    fontSize: 23
  }
});