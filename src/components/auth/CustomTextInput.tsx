import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { fonts } from '@utils';
import React, { useState } from 'react';
import { FieldError, RefCallBack } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import PhoneInput from "react-native-phone-input";

interface CustomTextInputProps extends TextInputProps {
  label: string;
  isPhone?: boolean;
  isPass?: boolean;
  error?: FieldError;
  innerRef?: RefCallBack;
}

const CustomTextInput = ({ label, isPhone, isPass, error, ...inputProps }: CustomTextInputProps) => {
  const [showText, setShowText] = useState<boolean>(!isPass);
  const { color, theme } = useAppTheme();

  const toggleShowText = () => setShowText(show => !show);
  return (
    <View style={styles.container} testID='custom text input'>
      {isPhone ? (
        <Text style={[styles.placeholder, { color: color.mainTextDim }]}>{label}</Text>
      ) : null}
      <View style={[styles.inputContainer, error && styles.inputContainerError]}>
        <View style={styles.input}>
          {isPhone ? (
            <PhoneInput
              autoFormat
              initialCountry='ng'
              onChangePhoneNumber={inputProps.onChangeText}
              ref={inputProps.innerRef || undefined}
              textProps={{
                style: [styles.textInput, { color: color.mainText }],
                placeholder: label, placeholderTextColor: color.mainTextDim,
                selectionColor: error ? color.danger : color.mainGreen,
                secureTextEntry: !showText,
                autoCapitalize: inputProps.autoCapitalize || "none",
                autoCorrect: inputProps.autoCorrect || false,
                keyboardType: inputProps.keyboardType || "number-pad",
                onSubmitEditing: inputProps.onSubmitEditing,
                returnKeyType: inputProps.returnKeyType || "next",
                testID: "phone input"
              }}
            />
          ) : (
            <TextInput
              blurOnSubmit={false}
              secureTextEntry={!showText}
              style={[styles.textInput, { color: color.mainText }]}
              placeholder={label}
              placeholderTextColor={color.mainTextDim}
              selectionColor={error ? color.danger : color.mainGreen}
              ref={inputProps.innerRef || undefined}
              {...inputProps}
            />
          )}
          {isPass && (
            showText ? (
              <TouchableOpacity testID='pass-visibility toggle' onPress={toggleShowText}>
                <Ionicons size={24} color={color.mainText} name="eye-off" style={{ opacity: .7 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity testID='pass-visibility toggle' onPress={toggleShowText}>
                <Ionicons size={24} color={color.mainText} name="eye" style={{ opacity: .7 }} />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
      {error && <View style={[styles.errorBox, { backgroundColor: theme === "dark" ? "#181818" : "#000" }]}>
        <Text style={styles.errorText}>
          <Ionicons name="alert-circle-outline" size={16} color="white" />&nbsp;
          {error.message}
        </Text>
      </View>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    gap: 3
  },
  inputContainer: {
    borderColor: "#47CA4C",
    borderRadius: 10,
    borderWidth: 2,
    height: 40,
    paddingHorizontal: 15
  },
  inputContainerError: {
    borderColor: "#d24343"
  },
  input: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    flexDirection: "row",
    gap: 10,
    width: "100%"
  },
  errorBox: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    zIndex: 10
  },
  errorText: {
    color: 'white',
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 16,
    height: 30
  },
  placeholder: {
    fontFamily: fonts.I_400,
    fontSize: 14
  }
});