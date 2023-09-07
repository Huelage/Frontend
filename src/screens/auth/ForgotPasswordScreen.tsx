import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { AuthNavigationProps } from "@interfaces";
import { useAppTheme } from "@hooks";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SubmitButton, CustomTextInput } from "@components/auth";
import { Controller, useForm } from "react-hook-form";
import { fonts, shadowStyle } from "@utils";
import { StatusBar } from "expo-status-bar";
import { LoginInfoInterface } from "@interfaces";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const { navigate } = useNavigation<AuthNavigationProps>();
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors },
  } = useForm<LoginInfoInterface>({ mode: "onChange" });
  const resetPassword = () => {
    // Implement your logic to send a password reset email to the provided email address.
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <TouchableOpacity onPress={() => navigate("Login")}>
            <Ionicons name="ios-arrow-back" size={34} color="black" />
          </TouchableOpacity>
          <Text style={styles.introText}>Forgot Password</Text>
        </View>

        <View style={styles.mainBox}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name="lock-reset" size={60} color="white" />
          </View>
          <Text style={styles.infoText}>
            Please enter your registered Email address to receive a verification
            code.
          </Text>
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
                returnKeyType="next"
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
          <SubmitButton label="Reset Password" onSubmit={resetPassword} />
        </View>
      </View>
    </>
  );
};

export default ForgotPasswordScreen;

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
  iconWrap: {
    backgroundColor: "#4caf50",
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: "center",
    padding: 20,
    alignSelf: "center",
  },
  mainBox: {
    flex: 1,
    gap: 10,
    marginTop: hp("15%"),
  },

  infoText: {
    fontFamily: fonts.I_600,
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    fontFamily: fonts.I_500,
    fontSize: 16,
    borderColor: "#93b1a4",
    borderRadius: 11,
    borderWidth: 2,
    height: 65,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
