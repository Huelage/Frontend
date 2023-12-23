import { useAppSelector } from "@api/app/appHooks";
import { REQUEST_EMAIL_VERIFICATION, REQUEST_PHONE_VERIFICATION } from "@api/graphql";
import { getEntity } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { DetailElement } from "@components/core/Profile";
import { ScreenHeader } from "@components/misc";
import { useAppTheme } from "@hooks";
import { UserProfileTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PersonalDetailScreen = () => {
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
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={dismissKeyboard} testID="personal detail screen">
      <ScreenHeader title="Personal Details" goBack={goBack} />
      <ScrollView contentContainerStyle={styles.detailBody}>
        <DetailElement label="First Name" value={entity.firstName as string} />
        <DetailElement label="Last Name" value={entity.lastName as string} />
        <DetailElement label="Phone Number" value={entity.phone} verifible isVerified={entity.isPhoneVerified} verify={verifyPhone} />
        <DetailElement label="Email Address" value={entity.email} verifible isVerified={entity.isEmailVerified} verify={verifyEmail} />
      </ScrollView>
    </View>
  );
};

export default PersonalDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  detailBody: {
    flex: 1,
    gap: 25,
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 50
  }
});