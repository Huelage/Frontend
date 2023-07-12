import { Ionicons } from '@expo/vector-icons';
import { fonts } from '@utils';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  isPass: boolean;
}

const CustomTextInput = ({ label, isPass, ...inputProps }: CustomTextInputProps) => {
  const [showText, setShowText] = useState<boolean>(!isPass);

  const toggleShowText = () => setShowText(show => !show);
  return (
    <View style={styles.inputContainer}>
      <View style={styles.input}>
        <TextInput
          secureTextEntry={!showText}
          style={styles.textInput}
          placeholder={label}
          placeholderTextColor="#BCB5B5"
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
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    flexDirection: "row",
    gap: 10,
    width: "100%"
  },
  inputContainer: {
    borderColor: "#47CA4C",
    borderRadius: 10,
    borderWidth: 2,
    height: 55,
    paddingHorizontal: 15,
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