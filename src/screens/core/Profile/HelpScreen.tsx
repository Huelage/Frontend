import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserNavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HelpScreen = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<UserNavigationProps>();
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="help screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Help</Text>
      </View>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
  },
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
    top: -5,
    left: 10
  },
  headerText: {
    fontFamily: fonts.I_500,
    fontSize: 20
  },
});