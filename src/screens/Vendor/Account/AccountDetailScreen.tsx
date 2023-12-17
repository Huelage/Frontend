import { useAppSelector } from "@api/app/appHooks";
import { REQUEST_EMAIL_VERIFICATION, REQUEST_PHONE_VERIFICATION } from "@api/graphql";
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

const AccountDetailScreen = () => {
  const { color } = useAppTheme();
  const entity = useAppSelector(getEntity);
  if (!entity) return null;
  const insets = useSafeAreaInsets();
  const dismissKeyboard = () => Keyboard.dismiss();
  const [sendPhoneOTP] = useMutation(REQUEST_PHONE_VERIFICATION);
  const [sendEmailOTP] = useMutation(REQUEST_EMAIL_VERIFICATION);
  const { goBack, navigate } = useNavigation<UserProfileTabProps>();
  const verifyEmail = async () => {
    try {
      await sendEmailOTP({ variables: { email: entity.email } });
      navigate("VerifyEmail");
    } catch {}
  };
  const verifyPhone = async () => {
    const input = { entityId: entity.id, phone: entity.phone };
    try {
      await sendPhoneOTP({ variables: { input } });
      navigate("VerifyPhone");
    } catch {}
  };
  const updateDetails = (val: string) => console.log({ val });
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={dismissKeyboard} testID="personal detail screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Personal Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.detailBody}>
        <DetailElement label="Rep Name" editable edit={updateDetails} value={entity.repName as string} />
        <DetailElement label="Business Name" editable edit={updateDetails} value={entity.businessName as string} />
        <DetailElement label="Business Address" editable edit={updateDetails} value={entity.businessAddress as string} />
        <DetailElement label="Phone Number" value={entity.phone} verifible isVerified={entity.isPhoneVerified} verify={verifyPhone} />
        <DetailElement label="Email Address" value={entity.email} verifible isVerified={entity.isEmailVerified} verify={verifyEmail} />
      </ScrollView>
    </View>
  );
};

export default AccountDetailScreen;

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
  detailBody: {
    gap: 25,
    paddingHorizontal: 20,
    paddingVertical: 40
  }
});