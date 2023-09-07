import React, { useState } from "react";
import { AuthNavigationProps } from "@interfaces";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import { Controller, useForm } from "react-hook-form";
import { CustomTextInput, SubmitButton } from "@components/auth";

const ChangePasswordScreen = () => {
  const { navigate } = useNavigation<AuthNavigationProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string; confirmPassword: string }>({
    mode: "onChange",
  });

  const changePassword = (data: {
    password: string;
    confirmPassword: string;
  }) => {
    // Implement the logic to change the user's password with the provided data.
  };
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <TouchableOpacity onPress={() => navigate("Login")}>
            <Ionicons name="ios-arrow-back" size={34} color="black" />
          </TouchableOpacity>
          <Text style={styles.introText}>Change Password</Text>
        </View>
        <View style={styles.mainBox}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons
              name="lock-open-plus-outline"
              size={60}
              color="white"
            />
          </View>
          <Text style={styles.infoText}>
            Your new password must be different from previously used password
          </Text>
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
                returnKeyType="done"
                value={value}
              />
            )}
            name="confirmPassword"
            rules={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === control.getValues().password ||
                "Passwords do not match",
            }}
          />
          <SubmitButton label="Save" onSubmit={handleSubmit(changePassword)} />
        </View>
      </View>
    </>
  );
};

export default ChangePasswordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp("8%"),
    marginTop: hp("8%"),
  },
  introContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  introText: {
    flex: 1,
    fontFamily: fonts.I_700,
    fontSize: 20,
    textAlign: "center",
  },

  mainBox: {
    flex: 1,
    gap: 30,
    marginTop: hp("15%"),
  },
  iconWrap: {
    backgroundColor: "#4caf50",
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: "center",
    padding: 20,
    alignSelf: "center",
  },
  infoText: {
    fontFamily: fonts.I_600,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
