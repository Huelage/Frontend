import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { PackageSize } from "@interfaces";
import { fonts, showError } from "@utils";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PackageSizeElement from "./PackageSizeElement";

interface PackageSizeInputProps {
  sizes: { name: string, price: number; }[];
  onChange: (sizes: PackageSize[]) => void;
}

const PackageSizeInput = ({ sizes, onChange }: PackageSizeInputProps) => {
  const { color } = useAppTheme();
  const [packSizes, setPackSizes] = useState<PackageSize[]>();
  const [inputNo, setInputNo] = useState<number>(2);

  const onAdd = (size: PackageSize) => {
    if (!size.name) return showError("Package name is required");
    if (size.name.trim().length < 3) return showError("Package name should be a minimum of 3 characters");
    if (sizes.find(item => item.name === size.name)) return showError("Package name already exists");
    if (!size.price) return showError("Package price is required");
    onChange([...sizes, size]);
  };
  const onRemove = (size: PackageSize) => {
    onChange(sizes.filter(item => item.name !== size.name));
    if (inputNo > 2) setInputNo(inputNo - 1);
  };
  const addSizeInput = () => sizes.length === inputNo && setInputNo(inputNo + 1);

  useEffect(() => {
    if (sizes.length > 2) setInputNo(sizes.length);
  }, [sizes]);
  useEffect(() => {
    setPackSizes(Array.from({ length: inputNo }, (_, i) => sizes[i] ?? null));
  }, [inputNo, sizes]);
  return (
    <View style={styles.container} testID="package size input">
      <Text style={[styles.label, { color: color.mainText }]}>Package Sizes *</Text>
      <FlatList
        contentContainerStyle={styles.packageSizes}
        data={packSizes}
        keyExtractor={(_, i) => i.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <PackageSizeElement value={item} onAdd={onAdd} onRemove={onRemove} />
        )}
        testID="package size element list"
      />
      <TouchableOpacity onPress={addSizeInput} style={[styles.addPackage, { borderColor: color.mainGreen }]} testID="add size input">
        <AntDesign name={"plus"} size={18} color={color.mainGreen} />
        <Text style={[styles.addPackageText, { color: color.mainGreen }]}>Add Package Size</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PackageSizeInput;

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