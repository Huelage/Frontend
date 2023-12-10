import { useAppTheme } from "@hooks";
import { DropDataInterface } from "@interfaces";
import { fonts } from "@utils";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Layout, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import DropItem from "./DropItem";

interface CustomDropdownProps {
  data: DropDataInterface[];
  label: string,
  isError?: boolean;
  value?: string;
  onChange: (val: string) => void;
}

const CustomDropdown = ({ data, label, isError, value, onChange }: CustomDropdownProps) => {
  const { color } = useAppTheme();
  const dropHeight = useSharedValue(0);
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState("");

  const animatedDropHeight = useAnimatedStyle(() => ({
    height: interpolate(dropHeight.value, [0, 1], [0, 96 * data.length])
  }));
  const onSelect = (value: string) => {
    setSelected(value);
    onChange(value);
    setIsDropOpen(false);
  };

  useEffect(() => {
    dropHeight.value = withTiming(isDropOpen ? 1 : 0, { duration: 200 * data.length });
  }, [data, isDropOpen]);
  useEffect(() => {
    setSelected(value || "");
  }, [value]);
  return (
    <View style={styles.dropContainer} testID="custom dropdown">
      <Text style={[styles.dropLabel, { color: color.mainText }]}>{label}</Text>
      <TouchableOpacity onPress={() => setIsDropOpen(!isDropOpen)} style={[styles.mainBox, { borderColor: isError ? color.danger : color.mainGreen }]} testID="dropdown toggle">
        <Text style={{ color: selected ? color.mainText : color.mainTextDim }}>{selected ? selected : "Select options..."}</Text>
      </TouchableOpacity>
      <Animated.FlatList
        data={isDropOpen ? data : []}
        keyExtractor={(item, idx) => `${item.value}-${idx}`}
        itemLayoutAnimation={Layout.springify().damping(15).delay(150)}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onSelect(item.value)} testID={`dropdown item ${item.value}`}>
            <DropItem item={item} idx={index} totalItems={data.length - 1} />
          </TouchableOpacity>
        )}
        contentContainerStyle={[styles.optionBox]}
        style={animatedDropHeight}
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
  mainBox: {
    borderRadius: 10,
    borderWidth: 2,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 15
  },
  dropInput: {
    fontFamily: fonts.I_400,
    fontSize: 16
  },
  optionBox: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 5
  },

});