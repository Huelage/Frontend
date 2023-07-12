import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../utils/fontEnum';

interface ButtonProps {
  label: string;
  height: number;
  fontSize: number;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}
const CustomButton = ({ label, icon, height, fontSize, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={{ height }} onPress={onPress}>
      <View style={styles.buttonBox}>
        <Text style={{ ...styles.buttonText, fontSize }}>{label}</Text>
        {icon && <Ionicons name={icon} size={20} color="white" />}
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
    gap: 8,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  buttonText: {
    color: "#fff",
    fontFamily: fonts.I_700,
  }
});