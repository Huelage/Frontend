import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { PackageSize } from "@interfaces";
import { fonts, numberToCurrency } from "@utils";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface PackageSizeElementProps {
  value?: ValueInterface;
  onAdd: (size: PackageSize) => void;
  onRemove: (size: PackageSize) => void;
}
interface ValueInterface {
  name: string;
  price: number;
}

const PackageSizeElement = ({ value, onAdd, onRemove }: PackageSizeElementProps) => {
  const { color } = useAppTheme();
  const { handleSubmit, control, setFocus, reset } = useForm<ValueInterface>();

  const onSubmit = (data: ValueInterface) => {
    onAdd({ name: data.name, price: Number(data.price) });
    reset();
  };
  return (
    <View style={styles.container} testID="package size element">
      {!!value ? (
        <>
          <View style={[styles.valueField, { borderColor: color.mainGreen }]} testID="package size info">
            <Text style={[styles.value, { color: color.mainText }]}>{value.name}</Text>
          </View>
          <View style={[styles.valueField, { borderColor: color.mainGreen }]} testID="package size info">
            <Text style={[styles.value, { color: color.mainText }]}>{numberToCurrency(value.price)}</Text>
          </View>
        </>
      ) : (
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => (
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                style={[styles.input, { borderColor: color.mainGreen, color: color.mainText }]}
                selectionColor={color.mainGreen}
                placeholder="Enter package size"
                placeholderTextColor={color.mainTextDim}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={ref}
                onSubmitEditing={() => setFocus("price")}
                returnKeyType="next"
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => (
              <TextInput
                style={[styles.input, { borderColor: color.mainGreen, color: color.mainText }]}
                selectionColor={color.mainGreen}
                placeholder="Enter package price"
                placeholderTextColor={color.mainTextDim}
                keyboardType="number-pad"
                onChangeText={onChange}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
                returnKeyType="done"
                ref={ref}
              />
            )}
            name="price"
          />
        </>
      )}
      <TouchableOpacity onPress={() => value ? onRemove(value) : handleSubmit(onSubmit)()} style={[styles.inputRemove, { backgroundColor: color.mainGreen }]} testID="add package size">
        <AntDesign name={value ? "minus" : "plus"} size={value ? 20 : 18} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default PackageSizeElement;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  input: {
    borderBottomWidth: 2,
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 14,
    paddingBottom: 5,
    paddingHorizontal: 5
  },
  valueField: {
    borderBottomWidth: 2,
    flex: 1,
    paddingBottom: 5,
    paddingHorizontal: 5
  },
  value: {
    fontFamily: fonts.I_400,
    fontSize: 14
  },
  inputRemove: {
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});