import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { REQUEST_PHONE_VERIFICATION } from "@api/graphql";
import { getEntity, setCredentials } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { CustomTextInput, SubmitButton } from "@components/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { ResetPasswordInterface, UserProfileTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChangePhoneScreen = () => {
  const entity = useAppSelector(getEntity);
  if (!entity) return null;
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { navigate, goBack } = useNavigation<UserProfileTabProps>();
  const [requestVerification, { data, loading }] = useMutation(REQUEST_PHONE_VERIFICATION);
  const { handleSubmit, control, formState: { errors } } = useForm<ResetPasswordInterface>({ mode: "onChange" });
  const onSubmit = async (data: ResetPasswordInterface) => {
    const input = { entityId: entity.id, phone: data.phone?.replace(/[\s-.]/g, "") };
    try {
      await requestVerification({ variables: { input } });
    } catch {}
  };
  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    if (data) {
      const phone = data.updatePhone.phone;
      const updatedEntity = { ...entity, phone };
      dispatch(setCredentials({ entity: updatedEntity }));
      navigate("VerifyPhone");
    }
  }, [data]);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={dismissKeyboard} testID="change phone screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]} testID="header box">
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Change Phone Number</Text>
      </View>
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} contentContainerStyle={styles.mainBox}>
        <Animated.View sharedTransitionTag="reset password icons" style={[styles.iconWrap, { backgroundColor: color.mainGreen }]} testID="screen icon">
          <MaterialCommunityIcons name="lock-reset" size={100} color="white" />
        </Animated.View>
        <Text style={[styles.infoText, { color: color.mainText }]}>Please enter your new phone number receive to a verification code.</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, ref } }) => (
            <CustomTextInput
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.phone}
              isPhone
              keyboardType="number-pad"
              label="Phone Number"
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSubmit)}
              innerRef={ref}
              returnKeyType="done"
            />
          )}
          name="phone"
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^\+\d{1,}[\s-\.]\d{3}[\s-\.]\d{3}[\s-\.]\d{4}/,
              message: "Phone number is invalid"
            }
          }}
        />
        <SubmitButton label="Change Number" isLoading={loading} onSubmit={handleSubmit(onSubmit)} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ChangePhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
