import { useAppSelector } from "@api/app/appHooks";
import { CHANGE_PASSWORD } from "@api/graphql";
import { getEntity } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { SetPasswordInputs, SubmitButton } from "@components/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { AuthNavigationProps, ResetPasswordInterface } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, showSuccess } from "@utils";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChangePasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const { color } = useAppTheme();
  const entity = useAppSelector(getEntity);
  if (!entity) return null;
  const [setPassword, { data, loading }] = useMutation(CHANGE_PASSWORD);
  const { goBack } = useNavigation<AuthNavigationProps>();
  const { handleSubmit, control, setFocus, watch, reset, formState: { errors } } = useForm<ResetPasswordInterface>({ mode: "onChange" });
  const onSubmit = async (data: ResetPasswordInterface) => {
    reset();
    const input = { entityId: entity.id, oldPassword: data.oldPassword, password: data.password, confirmPassword: data.confirmPassword };
    await setPassword({ variables: { input } });
  };
  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    setTimeout(() => setFocus("oldPassword"), 0);
  }, []);
  useEffect(() => {
    if (data) {
      showSuccess("Your password has been changed successfully");
      goBack();
    }
  }, [data]);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={dismissKeyboard} testID="change password screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]} testID="header box">
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Change Password</Text>
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

export default ChangePasswordScreen;

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
  },
  inputContainer: {
    flex: 1,
    gap: 25,
    // paddingHorizontal: wp("8%") + 8,
    // paddingVertical: hp("4%"),
    width: "100%",
  },
});
