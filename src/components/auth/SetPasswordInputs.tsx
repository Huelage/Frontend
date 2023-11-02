import { ResetPasswordInterface } from '@interfaces';
import React from 'react';
import { Control, Controller, FieldErrors, UseFormSetFocus, UseFormWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import CustomTextInput from './CustomTextInput';

interface setPasswordInputsProps {
  isSignedIn: boolean;
  control: Control<ResetPasswordInterface, any>;
  errors: FieldErrors<ResetPasswordInterface>;
  setFocus: UseFormSetFocus<ResetPasswordInterface>;
  watch: UseFormWatch<ResetPasswordInterface>;
  submit: () => void;
}


const SetPasswordInputs = ({ isSignedIn, control, errors, setFocus, watch, submit }: setPasswordInputsProps) => {
  return (
    <View style={styles.container} testID='set password inputs'>
      {isSignedIn && (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <CustomTextInput
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.password}
              isPass={true}
              label="Old Password"
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
            label="New Password"
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
            onSubmitEditing={submit}
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
    </View>
  );
};

export default SetPasswordInputs;

const styles = StyleSheet.create({
  container: {
    gap: 30
  }
});