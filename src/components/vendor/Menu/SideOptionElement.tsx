import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { SideOptionsInterface } from "@interfaces";
import { CheckBox } from "@rneui/base";
import { fonts, numberToCurrency } from "@utils";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface SideOptionElementProps {
  option?: SideOptionsInterface;
  isSide?: boolean;
  onAdd: (size: SideOptionsInterface) => void;
  onRemove: (size: SideOptionsInterface) => void;
}
interface OptionInterface {
  optionName: string;
  optionPrice: number;
  isSingle: boolean;
}

const SideOptionElement = ({ option, isSide, onAdd, onRemove }: SideOptionElementProps) => {
  const { color } = useAppTheme();
  const { handleSubmit, control, setFocus, reset } = useForm<OptionInterface>({ defaultValues: { isSingle: false } });

  const onSubmit = (data: OptionInterface) => {
    onAdd({ name: data.optionName, price: Number(data.optionPrice), isSingle: data.isSingle, groupId: "" });
    reset();
  };
  return (
    <View style={styles.container} testID="side option element">
      <View style={styles.topBox}>
        {option ? (
          <>
            <View style={[styles.valueField, { borderColor: color.mainGreen }]} testID="side option info">
              <Text style={[styles.value, { color: color.mainText }]}>{option.name}</Text>
            </View>
            <View style={[styles.valueField, { borderColor: color.mainGreen }]} testID="side option info">
              <Text style={[styles.value, { color: color.mainText }]}>{numberToCurrency(option.price)}</Text>
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
                  style={[styles.input, { borderColor: color.mainGreen }]}
                  selectionColor={color.mainGreen}
                  placeholder="Enter option name"
                  placeholderTextColor={color.mainTextDim}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  onSubmitEditing={() => setFocus("optionPrice")}
                  returnKeyType="next"
                />
              )}
              name="optionName"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, ref } }) => (
                <TextInput
                  style={[styles.input, { borderColor: color.mainGreen }]}
                  selectionColor={color.mainGreen}
                  placeholder="Enter option price"
                  placeholderTextColor={color.mainTextDim}
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={() => setFocus("isSingle")}
                  returnKeyType="done"
                  ref={ref}
                />
              )}
              name="optionPrice"
            />
          </>
        )}
        {!isSide ? (
          <TouchableOpacity onPress={() => option ? onRemove(option) : handleSubmit(onSubmit)()} style={[styles.inputRemove, { backgroundColor: color.mainGreen }]} testID="add side option">
            <AntDesign name={option ? "minus" : "plus"} size={option ? 20 : 18} color="white" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.bottomBox}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <CheckBox
              checked={option?.isSingle ?? value}
              onPress={() => onChange(!value)}
              disabled={!!option}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={color.mainGreen}
              title="Limit to one, i.e user can only buy 1 at a time"
              testID="limit to one"
              textStyle={[styles.termsText, { color: color.mainTextDim }]}
              containerStyle={styles.termsContainer}
            />
          )}
          name="isSingle"
        />
      </View>
    </View>
  );
};

export default SideOptionElement;

const styles = StyleSheet.create({
  container: {
    gap: 5
  },
  topBox: {
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
  },
  bottomBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20
  },
  termsContainer: {
    backgroundColor: "transparent",
    flex: 1,
    left: -10,
    margin: 0,
    padding: 0
  },
  termsText: {
    fontFamily: fonts.I_400I,
    fontSize: 12,
  },
});