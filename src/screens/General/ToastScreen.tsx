import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getToastType, setToastType } from "@api/slices/globalSlice";
import { CustomBox } from "@components/misc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserProfileTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React, { useCallback, useState } from "react";
import { Image, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ToastScreen = () => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const toastType = useAppSelector(getToastType);
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<UserProfileTabProps>();
  const [height, setHeight] = useState<number>(0);

  const handleOnLayout = useCallback((e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  }, []);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="wallet screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>In-App Notifications</Text>
      </View>
      <View style={styles.mainBox}>
        <Text style={[styles.mainText, { color: color.mainTextDim }]}>Alert Toast Style</Text>
        <View style={styles.alertBox} onLayout={handleOnLayout}>
          <CustomBox bgColor={color.cardBg2} width={wp("100%") - 28} height={height + 10} r={10} pad={6} left={-4} />
          <TouchableOpacity onPress={() => dispatch(setToastType("none"))} style={styles.alertItem}>
            <Image source={toastType === "none" ? require("@images/toast_none_active.png") : require("@images/toast_none.png")} style={styles.alertItemImg} />
            <View style={[styles.alertTextBox, { backgroundColor: toastType === "none" ? color.mainGreen : color.cardBg2 }]}>
              <Text style={[styles.alertText, { color: toastType === "none" ? "white" : color.mainText }]}>None</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setToastType("banner"))} style={styles.alertItem}>
            <Image source={toastType === "banner" ? require("@images/toast_banner_active.png") : require("@images/toast_banner.png")} style={styles.alertItemImg} />
            <View style={[styles.alertTextBox, { backgroundColor: toastType === "banner" ? color.mainGreen : color.cardBg2 }]}>
              <Text style={[styles.alertText, { color: toastType === "banner" ? "white" : color.mainText }]}>Banners</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setToastType("popup"))} style={styles.alertItem}>
            <Image source={toastType === "popup" ? require("@images/toast_popup_active.png") : require("@images/toast_popup.png")} style={styles.alertItemImg} />
            <View style={[styles.alertTextBox, { backgroundColor: toastType === "popup" ? color.mainGreen : color.cardBg2 }]}>
              <Text style={[styles.alertText, { color: toastType === "popup" ? "white" : color.mainText }]}>PopUps</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={[styles.accentText, { color: color.mainTextDim }]}>Banner toasts occupy the entire status bar and top of the screen, providing a prominent display. Popups, on the other hand, are more compact, taking up only necessary space. For error messages, the None type utilizes popups, while success messages are pushed to the background.</Text>
      </View>
    </View>
  );
};

export default ToastScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  mainBox: {
    gap: 10,
    padding: 20
  },
  mainText: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    paddingLeft: 10
  },
  alertBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  alertItem: {
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  alertItemImg: {
    height: 100,
    aspectRatio: 0.48,
  },
  alertTextBox: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 3
  },
  alertText: {
    fontFamily: fonts.I_400
  },
  accentText: {
    fontFamily: fonts.I_500,
    paddingLeft: 10,
    paddingTop: 5
  }
});
