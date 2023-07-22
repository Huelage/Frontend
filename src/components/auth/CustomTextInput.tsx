import { Ionicons } from '@expo/vector-icons';
import { fonts, outline } from '@utils';
import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, Text } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  isPass: boolean;
  error?: FieldError;
}

const CustomTextInput = ({ label, isPass, error, ...inputProps }: CustomTextInputProps) => {
  const [showText, setShowText] = useState<boolean>(!isPass);

  const toggleShowText = () => setShowText(show => !show);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            secureTextEntry={!showText}
            style={styles.textInput}
            placeholder={label}
            placeholderTextColor="#BCB5B5"
            selectionColor="#47CA4C"
            {...inputProps}
          />
          {isPass && (
            showText ? (
              <TouchableOpacity onPress={toggleShowText}>
                <Ionicons style={styles.textIcon} name="eye-off" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={toggleShowText}>
                <Ionicons style={styles.textIcon} name="eye" />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
      {error && <View style={styles.errorBox}>
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
    gap: 2
  },
  inputContainer: {
    borderColor: "#47CA4C",
    borderRadius: 10,
    borderWidth: 2,
    height: 48,
    paddingHorizontal: 15,
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
    padding: 10
  },
  errorText: {
    color: 'white',
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.I_500,
    fontSize: 18,
    height: 40
  },
  textIcon: {
    color: "rgba(0, 0, 0, .5)",
    fontSize: 24
  }
});