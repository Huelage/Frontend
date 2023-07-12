import { Ionicons } from '@expo/vector-icons';
import { fonts } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  label: string;
  height: number;
  fontSize: number;
  icon?: keyof typeof Ionicons.glyphMap;
  inactive?: boolean;
  onPress: () => void;
}
const CustomButton = ({ label, icon, height, fontSize, inactive, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={{ height }} onPress={onPress}>
      <View style={[styles.buttonBox, inactive && styles.buttonInactive]}>
        <Text style={[styles.buttonText, { fontSize }, inactive && styles.buttonTextInactive]}>{label}</Text>
        {icon && <Ionicons name={icon} size={20} color={inactive ? "#626262" : "white"} />}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonBox: {
    alignItems: 'center',
    backgroundColor: "#47CA4C",
    borderRadius: 24,
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  buttonInactive: {
    backgroundColor: 'rgba(188, 181, 181, 0.38)'
  },
  buttonText: {
    color: "#fff",
    fontFamily: fonts.I_700,
  },
  buttonTextInactive: {
    color: "#626262"
  }
});