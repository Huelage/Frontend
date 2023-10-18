import { useAppDispatch } from "@api/app/appHooks";
import { REQUEST_EMAIL_VERIFICATION } from "@api/graphql";
import { setVendorStatus } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { CustomTextInput, SubmitButton } from "@components/auth";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from "@hooks";
import { AuthNavigationProps, ResetPasswordInterface } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { navigate, goBack } = useNavigation<AuthNavigationProps>();
  const [requestVerification, { data, loading }] = useMutation(REQUEST_EMAIL_VERIFICATION);
  const { handleSubmit, control, setFocus, reset, formState: { errors } } = useForm<ResetPasswordInterface>({ mode: "onChange" });
  const onSubmit = async (data: ResetPasswordInterface) => {
    reset();
    await requestVerification({ variables: { email: data.email } });
  };
  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    setTimeout(() => setFocus("email"), 0);
  }, []);
  useEffect(() => {
    if (data) {
      dispatch(setVendorStatus(data.requestEmailVerification.entityType === "VENDOR"));
      navigate("VerifyEmail", { email: data.requestEmailVerification.email });
    }
  }, [data]);
  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]} onTouchStart={dismissKeyboard} testID="forgot password screen">
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <AntDesign name="arrowleft" size={26} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Forgot Password</Text>
      </View>
      <View style={styles.mainBox}>
        <Animated.View sharedTransitionTag="reset password icons" style={[styles.iconWrap, { backgroundColor: color.mainGreen }]} testID="screen icon">
          <MaterialCommunityIcons name="lock-reset" size={100} color="white" />
        </Animated.View>
        <Text style={[styles.infoText, { color: color.mainText }]}>Please enter your registered Email address to receive a verification code.</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <CustomTextInput
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email}
              isPass={false}
              innerRef={ref}
              keyboardType="email-address"
              label="Email address"
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="send"
              value={value}
            />
          )}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[\w.+-]{3,}@[\w-]+\.[\w-]{2,}$/,
              message: "Email is invalid",
            },
          }}
        />
        <SubmitButton label="Send code" isLoading={loading} onSubmit={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

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
