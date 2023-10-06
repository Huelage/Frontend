import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { SET_PASSWORD } from "@api/graphql";
import { getEntity, getVendorStatus } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { CustomTextInput, SubmitButton } from "@components/auth";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { AuthNavigationProps, ResetPasswordInterface, SetPasswordRouteProps } from "@interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fonts, setItem } from "@utils";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SetPasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { color } = useAppTheme();
  const isVendor = useAppSelector(getVendorStatus);
  const { params: { entityId } } = useRoute<SetPasswordRouteProps>();
  const isSignedIn = useAppSelector(getEntity);
  const [setPassword, { data, loading }] = useMutation(SET_PASSWORD);
  const { goBack, navigate } = useNavigation<AuthNavigationProps>();
  const { handleSubmit, control, setFocus, watch, reset, formState: { errors } } = useForm<ResetPasswordInterface>({ mode: "onChange" });
  const onSubmit = async (data: ResetPasswordInterface) => {
    reset();
    if (!isSignedIn) {
      const input = { entityId, password: data.password };
      await setPassword({ variables: { input } });
    }
  };

  useEffect(() => {
    setTimeout(() => setFocus(isSignedIn ? "oldPassword" : "password"), 0);
  }, []);
  useEffect(() => {
    if (data) {
      const res = data.forgotPassword;
      const entityId = res.entityId;
      const name = isVendor ? res.vendor.businessName : `${res.user.firstName} ${res.user.lastName}`;
      (async () => {
        await setItem("huelageEntityId", entityId);
        await setItem("huelageEntityName", name);
      })();
      navigate("Login");
    }
  }, [data]);
  return (
    <>
      <StatusBar style="auto" />
      <View style={[styles.container, { paddingTop: insets.top + 10 }]} onTouchStart={() => Keyboard.dismiss()} testID="set password screen">
        <View style={styles.headerBox}>
          <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
            <AntDesign name="arrowleft" size={26} color={color.mainText} />
          </TouchableOpacity>
          <Text style={[styles.headerText, { color: color.mainText }]}>Set Password</Text>
        </View>
        <View style={styles.mainBox}>
          <Animated.View sharedTransitionTag="reset password icons" style={[styles.iconWrap, { backgroundColor: color.mainGreen }]} testID="screen icon">
            <MaterialCommunityIcons name="lock-open-plus-outline" size={100} color="white" />
          </Animated.View>
          <Text style={[styles.infoText, { color: color.mainText }]}>Your new password must be different from previously used password</Text>
          {isSignedIn && (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.password}
                  isPass={true}
                  label="Old password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus("password")}
                  innerRef={ref}
                  returnKeyType="next"
                  value={value}
                />
              )}
              name="oldPassword"
              rules={{ required: "Old Password is required" }}
            />
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.password}
                isPass={true}
                label="New password"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus("confirmPassword")}
                innerRef={ref}
                returnKeyType="next"
                value={value}
              />
            )}
            name="password"
            rules={{
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,24}$/,
                message:
                  "• 6 to 24 characters.\n• Must include uppercase and lowercase letters, a number and a special character.\n• Allowed special characters: !@#$%^&*",
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.confirmPassword}
                isPass={true}
                innerRef={ref}
                label="Confirm Password"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(onSubmit)}
                returnKeyType="done"
                value={value}
              />
            )}
            name="confirmPassword"
            rules={{
              required: "Confirm Password is required",
              validate: value => value === watch("password") || "Passwords do not match"
            }}
          />
          <SubmitButton label="Change Password" isLoading={loading} onSubmit={handleSubmit(onSubmit)} />
        </View>
      </View>
    </>
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
