import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { ProfileElementInterface, UserProfileTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProfileBoxElement = ({ label, icon, nav }: ProfileElementInterface) => {
  const { color } = useAppTheme();
  const { navigate } = useNavigation<UserProfileTabProps>();
  return (
    <TouchableOpacity onPress={() => navigate(nav)} testID="profile box element">
      <View style={styles.container}>
        <MaterialCommunityIcons name={icon} size={35} color={color.mainGreen} testID="element icon" />
        <View style={styles.detailBox}>
          <Text style={[styles.textStyle, { color: color.mainText }]}>{label}</Text>
          <MaterialCommunityIcons name="chevron-right" size={30} color={color.mainText} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileBoxElement;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 20
  },
  detailBox: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    fontFamily: fonts.I_500,
    fontSize: 20
  },
});