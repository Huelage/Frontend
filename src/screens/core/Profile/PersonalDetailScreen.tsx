import { useAppSelector } from "@api/app/appHooks";
import { REFRESH_OTP, REQUEST_EMAIL_VERIFICATION } from "@api/graphql";
import { getEntity } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { DetailElement } from "@components/core/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserProfileTabProps } from "@interfaces";
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
  const [sendPhoneOTP] = useMutation(REFRESH_OTP);
  const [sendEmailOTP] = useMutation(REQUEST_EMAIL_VERIFICATION);
  const { goBack, navigate } = useNavigation<UserProfileTabProps>();
  const verifyEmail = async () => {
    await sendEmailOTP({ variables: { email: entity.email } });
    navigate("VerifyEmail");
  };
  const verifyPhone = async () => {
    const input = { entityId: entity.id, phone: entity.phone };
    await sendPhoneOTP({ variables: { input } });
    navigate("VerifyPhone");
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={dismissKeyboard} testID="personal detail screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Personal Details</Text>
      </View>
      <ScrollView>
        <View style={styles.detailBody}>
          <DetailElement label="First Name" value={entity.firstName as string} />
          <DetailElement label="Last Name" value={entity.lastName as string} />
          <DetailElement label="Phone Number" value={entity.phone} verifible isVerified={entity.isPhoneVerified} verify={verifyPhone} />
          <DetailElement label="Email Address" value={entity.email} verifible isVerified={entity.isEmailVerified} verify={verifyEmail} />
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
  detailBody: {
    flex: 1,
    gap: 25,
    paddingHorizontal: 20,
    paddingVertical: 30
  }
});