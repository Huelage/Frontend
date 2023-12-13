import { useAppSelector } from "@api/app/appHooks";
import { SET_PASSWORD } from "@api/graphql";
import { getVendorStatus } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { SetPasswordInputs, SubmitButton } from "@components/auth";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { AuthNavigationProps, ResetPasswordInterface, SetPasswordRouteProps } from "@interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fonts, setItem } from "@utils";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SetPasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const { color } = useAppTheme();
  const isVendor = useAppSelector(getVendorStatus);
  const { params: { entityId } } = useRoute<SetPasswordRouteProps>();
  const [setPassword, { data, loading }] = useMutation(SET_PASSWORD);
  const { goBack, navigate } = useNavigation<AuthNavigationProps>();
  const { handleSubmit, control, setFocus, watch, reset, formState: { errors } } = useForm<ResetPasswordInterface>({ mode: "onChange" });
  const onSubmit = async (data: ResetPasswordInterface) => {
    const input = { entityId, password: data.password };
    try {
      await setPassword({ variables: { input } });
      reset();
    } catch {}
  };
  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    setTimeout(() => setFocus("password"), 0);
  }, []);
  useEffect(() => {
    if (data) {
      const res = data.forgotPassword;
      const entityId = res.entityId;
      const name = isVendor ? res.vendor.businessName : `${res.user.firstName} ${res.user.lastName}`;
      (async () => {
        await setItem("huelageEntityId", entityId);
        await setItem("huelageEntityName", name);
        await setItem("huelageEntityType", isVendor ? "VENDOR" : "USER");
      })();
      navigate("Login");
    }
  }, [data]);
  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]} onTouchStart={dismissKeyboard} testID="set password screen">
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <AntDesign name="arrowleft" size={26} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Set Password</Text>
      </View>
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} contentContainerStyle={styles.mainBox}>
        <Animated.View sharedTransitionTag="reset password icons" style={[styles.iconWrap, { backgroundColor: color.mainGreen }]} testID="screen icon">
          <MaterialCommunityIcons name="lock-open-plus-outline" size={100} color="white" />
        </Animated.View>
        <Text style={[styles.infoText, { color: color.mainText }]}>Your new password must be different from previously used password</Text>
        <SetPasswordInputs control={control} errors={errors} setFocus={setFocus} watch={watch} submit={handleSubmit(onSubmit)} />
        <SubmitButton label="Change Password" isLoading={loading} onSubmit={handleSubmit(onSubmit)} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  backButton: {
    position: "absolute",
    left: 20
  },
  headerText: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  mainBox: {
    flex: 1,
    gap: 30,
    paddingHorizontal: 20,
    paddingTop: 70
  },
  iconWrap: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 100,
    height: 160,
    justifyContent: "center",
    marginBottom: 30,
    width: 160
  },
  infoText: {
    fontFamily: fonts.I_500,
    fontSize: 14,
    textAlign: "center",
  }
});
