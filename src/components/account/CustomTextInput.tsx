import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../utils/fontEnum';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  isPass: boolean;
}

const CustomTextInput = ({ label, isPass, ...inputProps }: CustomTextInputProps) => {
  const [showText, setShowText] = useState<boolean>(!isPass);

  const toggleShowText = () => setShowText(show => !show);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <TextInput
          secureTextEntry={!showText}
          style={styles.textInput}
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
  label: {
    alignSelf: 'flex-start',
    backgroundColor: "#fff",
    color: '#4CAF50',
    fontFamily: fonts.I_400,
    fontSize: 18,
    left: 20,
    letterSpacing: .5,
    paddingHorizontal: 5,
    position: 'absolute',
    top: -12
  },
  input: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    flexDirection: "row",
    gap: 10,
    width: "100%"
  },
  inputContainer: {
    borderColor: "#4CAF50",
    borderRadius: 15,
    borderWidth: 2,
    height: 70,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.I_300,
    fontSize: 20,
    height: 40,
    width: '100%'
  },
  textIcon: {
    color: "rgba(0, 0, 0, .5)",
    fontSize: 28
  }
});