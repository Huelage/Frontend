import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { clearCredentials, getGlobalState, toggleAllowLocation, toggleAllowPush, toggleTheme, toggleThemeType } from "@api/slices/globalSlice";
import { SettingElement } from "@components/core/Profile";
import { ScreenHeader } from "@components/misc";
import { Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { SettingElementInterface, UserProfileTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingScreen = () => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const globalState = useAppSelector(getGlobalState);
  const { goBack, navigate } = useNavigation<UserProfileTabProps>();
  const settings: SettingElementInterface[] = useMemo(() => ([
    {
      title: "General", Icon: () => <Fontisto name="equalizer" size={20} color="white" style={{ transform: [{ rotate: "-90deg" }] }} />, options: [
        {
          description: "Theme", options: [
            { title: "Match device setting", isToggle: true, initVal: globalState.themeType === "system", onPress: () => dispatch(toggleThemeType()) },
            { title: "Dark Mode", isToggle: true, initVal: globalState.theme === "dark", disabled: globalState.themeType === "system", onPress: () => dispatch(toggleTheme()) },
          ]
        }
      ]
    },
    {
      title: "Notifications", Icon: () => <MaterialCommunityIcons name="bell" size={24} color="white" />, options: [
        {
          options: [
            { title: "Push notifications", isToggle: true, initVal: globalState.allowPush, onPress: () => dispatch(toggleAllowPush()) },
            { title: "In-app notifications", isToggle: false, onPress: () => navigate("Toast") },
          ]
        }
      ]
    },
    {
      title: "Privacy", Icon: () => <MaterialIcons name="privacy-tip" size={24} color="white" />, options: [
        {
          options: [
            { title: "Location", isToggle: true, initVal: globalState.allowLocation, onPress: () => dispatch(toggleAllowLocation()) },
          ]
        }
      ]
    },
    {
      title: "Account", Icon: () => <MaterialCommunityIcons name="account-cog-outline" size={24} color="white" />, options: [
        {
          options: [
            { title: "Change Phone Number", isToggle: false, onPress: () => navigate("ChangePhone") },
            { title: "Change Password", isToggle: false, onPress: () => navigate("ChangePass") },
            { title: "Delete Account", isToggle: false, danger: true, onPress: () => console.log("pressed") },
            { title: "Logout", isToggle: false, danger: true, onPress: () => dispatch(clearCredentials()) }
          ]
        }
      ]
    }
  ]), [globalState]);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="setting screen">
      <ScreenHeader title="Settings" goBack={goBack} />
      <FlatList
        data={settings}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <SettingElement {...item} />}
        testID="setting list"
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
