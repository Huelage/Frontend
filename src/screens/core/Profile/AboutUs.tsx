import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Keyboard } from "react-native";
import { useAppTheme } from "@hooks";
import { UserNavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const AboutUs = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const dismissKeyboard = () => Keyboard.dismiss();
  const { goBack } = useNavigation<UserNavigationProps>();
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={dismissKeyboard} testID="AboutUs screen">
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>AboutUs</Text>
      </View>
      <View style={[styles.headerUnderline, { backgroundColor: color.mainGreen }]} />
    </View>
  );
};
export default AboutUs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
  },
  headerBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  headerUnderline: {
    height: 2
  },
  backButton: {
    position: "absolute",
    left: 10
  },
  headerText: {
    fontFamily: fonts.I_500,
    fontSize: 20
  },
});
