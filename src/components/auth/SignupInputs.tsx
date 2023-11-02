import { SignUpInfoInterface } from '@interfaces';
import React from 'react';
import { Control, Controller, FieldErrors, UseFormSetFocus } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import CustomTextInput from './CustomTextInput';

interface signupInputsProps {
  isVendor: boolean;
  control: Control<SignUpInfoInterface, any>;
  errors: FieldErrors<SignUpInfoInterface>;
  setFocus: UseFormSetFocus<SignUpInfoInterface>;
  submit: () => void;
}

const SignupInputs = ({ isVendor, control, errors, setFocus, submit }: signupInputsProps) => {
  return (
    <View style={styles.container} testID='signup inputs'>
      {isVendor ? (
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize="words"
                autoCorrect={false}
                error={errors.businessName}
                label="Business Name"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus("businessAddress")}
                innerRef={ref}
                returnKeyType="next"
                value={value}
              />
            )}
            name="businessName"
            rules={{
              required: "Business name is required",
              minLength: {
                value: 3,
                message: "Business name should be a minimum of 3 charaters",
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize="words"
                autoCorrect={false}
                error={errors.businessAddress}
                label="Business Address"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus("repName")}
                innerRef={ref}
                returnKeyType="next"
                value={value}
              />
            )}
            name="businessAddress"
            rules={{
              required: "Business address is required",
              minLength: {
                value: 3,
                message: "Business address should be a minimum of 3 charaters",
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize="words"
                autoCorrect={false}
                error={errors.repName}
                label="Vendor's Name"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus("email")}
                innerRef={ref}
                returnKeyType="next"
                value={value}
              />
            )}
            name="repName"
            rules={{
              required: "Vendor's name is required",
              minLength: {
                value: 3,
                message: "Vendor's name should be a minimum of 3 charaters",
              },
            }}
          />
        </>
      ) : (
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize="words"
                autoCorrect={false}
                error={errors.firstName}
                label="First Name"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus("lastName")}
                innerRef={ref}
                returnKeyType="next"
                value={value}
              />
            )}
            name="firstName"
            rules={{
              required: "First name is required",
              minLength: {
                value: 3,
                message: "First name should be a minimum of 3 characters",
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize="words"
                autoCorrect={false}
                error={errors.lastName}
                label="Last Name"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus("email")}
                innerRef={ref}
                returnKeyType="next"
                value={value}
              />
            )}
            name="lastName"
            rules={{
              required: "Last name is required",
              minLength: {
                value: 3,
                message: "Last name should be a minimum of 3 characters",
              },
            }}
          />
        </>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <CustomTextInput
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.email}
            keyboardType="email-address"
            label="Email Address"
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={() => setFocus("phone")}
            innerRef={ref}
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <CustomTextInput
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.phone}
            isPhone
            keyboardType="number-pad"
            label="Phone Number"
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={() => setFocus("password")}
            innerRef={ref}
            returnKeyType="next"
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <CustomTextInput
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.password}
            isPass
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={() => !isVendor && submit()}
            innerRef={ref}
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
    </View>
  );
};

export default SignupInputs;

const styles = StyleSheet.create({
  container: {
    gap: 20
  }
});