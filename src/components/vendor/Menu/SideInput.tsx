import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { SideInterface } from "@interfaces";
import { fonts } from "@utils";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SideElement from "./SideElement";

interface SideInputProps {
  sides?: SideInterface[];
  isSubmitted?: boolean;
  onChange: (sizes: SideInterface[]) => void;
}

const SideInput = ({ sides, isSubmitted, onChange }: SideInputProps) => {
  const { color } = useAppTheme();
  const [foodSides, setFoodSides] = useState<SideInterface[]>([]);
  const [inputNo, setInputNo] = useState<number>(0);

  const onAdd = (side: SideInterface) => {
    onChange([...sides!, side]);
    setFoodSides([]);
  };
  const onRemove = (sideId: string) => {
    onChange(sides!.filter(item => item.id !== sideId));
    setInputNo(inputNo - 1);
  };
  const addSideInput = () => sides?.length === inputNo && setInputNo(inputNo + 1);

  useEffect(() => {
    if (sides?.length) setInputNo(sides.length);
  }, [sides]);
  useEffect(() => {
    setFoodSides(Array.from({ length: inputNo }, (_, i) => sides![i] ?? null));
  }, [inputNo, sides]);
  useEffect(() => {
    if (isSubmitted) {
      setFoodSides([]);
      setInputNo(0);
    }
  }, [isSubmitted]);
  return (
    <View style={styles.container} testID="side input">
      <Text style={[styles.label, { color: color.mainText }]}>Sides</Text>
      <FlatList
        contentContainerStyle={styles.packageSizes}
        data={foodSides}
        keyExtractor={(_, i) => i.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <SideElement side={item} onAdd={onAdd} onRemove={onRemove} />
        )}
        testID="side element list"
      />
      <TouchableOpacity onPress={addSideInput} style={[styles.addPackage, { borderColor: color.mainGreen }]} testID="add side input">
        <AntDesign name={"plus"} size={18} color={color.mainGreen} />
        <Text style={[styles.addPackageText, { color: color.mainGreen }]}>Add New Side</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SideInput;

const styles = StyleSheet.create({
  container: {
    gap: 5
  },
  label: {
    fontFamily: fonts.I_600,
    fontSize: 16
  },
  packageSizes: {
    gap: 10
  },
  addPackage: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 6,
    width: "auto"
  },
  addPackageText: {
    fontFamily: fonts.I_400,
    fontSize: 16
  }
});