import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

interface CustomDropdownProps {
  data: { key: string, value: string, disabled?: boolean; }[];
  label: string,
  isError?: boolean;
  onChange: (val: string) => void;
}

const CustomDropdown = ({ data, label, isError, onChange }: CustomDropdownProps) => {
  const { color } = useAppTheme();
  const [selected, setSelected] = useState("");

  return (
    <View style={styles.dropContainer} testID="custom dropdown">
      <Text style={[styles.dropLabel, { color: color.mainText }]}>{label}</Text>
      <SelectList
        setSelected={setSelected}
        onSelect={() => onChange(selected)}
        data={data}
        save="value"
        arrowicon={<FontAwesome name="angle-down" size={20} color={color.mainTextDim} />}
        closeicon={<Ionicons name="close-outline" size={24} color={color.mainText} />}
        searchicon={<Ionicons name="search-outline" size={20} color={color.mainText} style={{ marginRight: 10 }} />}
        boxStyles={{ ...styles.dropBox, borderColor: isError ? color.danger : color.mainGreen }}
        inputStyles={{ ...styles.dropInput, color: color.mainText }}
        dropdownStyles={{ borderColor: color.mainGreen }}
        dropdownTextStyles={{ color: color.mainText }}
        disabledItemStyles={{ backgroundColor: color.cardBg2 }}
        disabledTextStyles={{ color: color.mainTextDim }}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropContainer: {
    gap: 5
  },
  dropLabel: {
    fontFamily: fonts.I_600,
    fontSize: 16
  },
  dropBox: {
    borderWidth: 2,
    paddingVertical: 10
  },
  dropInput: {
    fontFamily: fonts.I_400,
    fontSize: 16
  }
});