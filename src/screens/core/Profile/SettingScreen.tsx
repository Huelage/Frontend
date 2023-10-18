import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserNavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GeneralSetting, NotificationSetting, PrivacySetting } from "@components/core/Profile";

const Settings = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<UserNavigationProps>();
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="setting screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Settings</Text>
      </View>
      <ScrollView>
        < GeneralSetting />
        <View style={[styles.horizontalLine, { backgroundColor: color.mainGreen }]}></View>
        <NotificationSetting />
        <View style={[styles.horizontalLine, { backgroundColor: color.mainGreen }]}></View>
        <PrivacySetting />
        <View style={[styles.horizontalLine, { backgroundColor: color.mainGreen }]}></View>
        <View style={styles.mainBox}>
          <View style={styles.innerBox}>
            <MaterialCommunityIcons name="account-cog" size={30} color={color.mainGreen} ></MaterialCommunityIcons>
            <Text style={[styles.textStyle, { color: color.mainText }]}>   {" "}  Account </Text>
          </View>
          <TouchableOpacity style={styles.smallContainer}>
            <Text style={[styles.textStyle2, { color: color.mainText }]}>   {" "}  Change Password </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallContainer}>
            <Text style={[styles.textStyle2, { color: color.mainText }]}>   {" "}  Delete Account </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>


  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,

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
  horizontalLine: {
    height: 3,
    marginBottom: 50,
    marginTop: 15,
  },
  mainBox: {
    gap: 10,
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "column"
  },
  textStyle: {
    fontSize: 24,
    fontFamily: fonts.I_500,
    fontWeight: "700",
  },
  textStyle2: {
    fontSize: 20,
    fontFamily: fonts.I_400,
    fontWeight: "400",
  },
  innerBox: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  smallContainer: {
    marginTop: 2,
    marginHorizontal: 55,


  }
});
