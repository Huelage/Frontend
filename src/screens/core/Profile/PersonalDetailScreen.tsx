import { useAppSelector } from "@api/app/appHooks";
import { getEntity } from "@api/slices/globalSlice";
import { DetailElement } from "@components/core/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserNavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React from "react";
import { Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PersonalDetailScreen = () => {
  const { color } = useAppTheme();
  const entity = useAppSelector(getEntity);
  if (!entity) return null;
  const insets = useSafeAreaInsets();
  const dismissKeyboard = () => Keyboard.dismiss();
  const { goBack } = useNavigation<UserNavigationProps>();
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={dismissKeyboard} testID="personal detail screen">
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Personal Details</Text>
      </View>
      <View style={[styles.headerUnderline, { backgroundColor: color.mainGreen }]} />
      <ScrollView>
        <View style={styles.cartBody}>
          <DetailElement label="First Name" value={entity.firstName as string} />
          <DetailElement label="Last Name" value={entity.lastName as string} />
          <DetailElement label="Phone Number" value={entity.phone} verifible />
          <DetailElement label="Email Address" value={entity.email} verifible isVerified />
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalDetailScreen;

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
  cartBody: {
    flex: 1,
    gap: 25,
    paddingHorizontal: 20,
    paddingVertical: 30
  }
});