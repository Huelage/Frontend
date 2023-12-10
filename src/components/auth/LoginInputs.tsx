import { useAppSelector } from "@api/app/appHooks";
import { getVendorStatus } from "@api/slices/globalSlice";
import { LoginInfoInterface } from "@interfaces";
import React from "react";
import { Control, Controller, FieldErrors, UseFormSetFocus } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import CustomTextInput from "./CustomTextInput";

interface loginInputsProps {
  loginwithsaved: boolean;
  control: Control<LoginInfoInterface, any>;
  errors: FieldErrors<LoginInfoInterface>;
  setFocus: UseFormSetFocus<LoginInfoInterface>;
  submit: () => void;
}

const LoginInputs = ({ loginwithsaved, control, errors, setFocus, submit }: loginInputsProps) => {
  const isVendor = useAppSelector(getVendorStatus);
  return (
    <View style={styles.container} testID="login inputs">
      {!loginwithsaved &&
        (isVendor ? (
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.vendorKey}
                innerRef={ref}
                label="Vendor Key"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus("password")}
                returnKeyType="next"
                value={value}
              />
            )}
            name="vendorKey"
            rules={{
              required: "Vendor ID is required",
            }}
          />
        ) : (
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email}
                innerRef={ref}
                keyboardType="email-address"
                label="Email Address"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus("password")}
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
        ))}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <CustomTextInput
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.password}
            isPass
            innerRef={ref}
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={submit}
            value={value}
          />
        )}
        name="password"
        rules={{ required: "Password is required" }}
      />
    </View>
  );
};

export default LoginInputs;

const styles = StyleSheet.create({
  container: {
    gap: 20
  }
});