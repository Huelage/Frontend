import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { SideInterface, SideOptionsInterface } from "@interfaces";
import { CheckBox } from "@rneui/base";
import { fonts, showError } from "@utils";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";
import SideOptionElement from "./SideOptionElement";

interface SideElementProps {
  side?: SideInterface;
  onAdd: (side: SideInterface) => void;
  onRemove: (sideId: string) => void;
}
interface SideFormInterface {
  sideDescription: string;
  options: SideOptionsInterface[];
  isRequired: boolean;
  isMultiple: boolean;
}

const SideElement = ({ side, onAdd, onRemove }: SideElementProps) => {
  const { color } = useAppTheme();
  const [sideOptions, setSideOptions] = useState<SideOptionsInterface[]>(side?.options ?? []);
  const [optionsList, setOptionsList] = useState<SideOptionsInterface[]>([]);
  const [optionNo, setOptionNo] = useState<number>((side && side?.options.length > 2 && side.options.length) || 2);
  const { handleSubmit, control, reset } = useForm<SideFormInterface>({ defaultValues: { isMultiple: false, isRequired: false } });

  const onSubmit = (data: SideFormInterface) => {
    if (!data.sideDescription) return showError("Side description is required");
    if (data.sideDescription.trim().length < 3) return showError("Side description should be a minimum of 3 characters");
    if (sideOptions.length < 2) return showError("Side should have at least 2 options");
    const id = uuid.v4().toString();
    const newSide = {
      id, description: data.sideDescription, isRequired: data.isRequired, isMultiple: data.isMultiple,
      options: sideOptions.map(option => ({ ...option, groupId: id }))
    };
    onAdd(newSide);
    reset();
  };
  const onAddOption = (item: SideOptionsInterface) => {
    if (!item.name) return showError("Option name is required");
    if (item.name.trim().length < 3) return showError("Option name should be a minimum of 3 characters");
    if (sideOptions.find(option => option.name === item.name)) return showError("Option name already exists");
    if (Number.isNaN(item.price)) return showError("Option price is required");
    const newOptions = [...sideOptions!, item];
    setSideOptions(newOptions);
  };
  const onRemoveOption = (side: SideOptionsInterface) => {
    setSideOptions(sideOptions.filter(item => item.name !== side.name));
    if (optionNo > 2) setOptionNo(optionNo - 1);
  };
  const addOptionInput = () => sideOptions.length === optionNo && setOptionNo(optionNo + 1);

  useEffect(() => {
    if (side) {
      setOptionNo((side && side.options.length > 2 && side.options.length) || 2);
      setSideOptions(side.options);
    }
  }, [side]);
  useEffect(() => {
    setOptionsList(Array.from({ length: optionNo }, (_, i) => (sideOptions[i] as SideOptionsInterface) ?? null));
  }, [optionNo, sideOptions, side]);
  return (
    <View style={[styles.container, { borderColor: color.mainGreen }]} testID="side element">
      {side ? (
        <View style={[styles.valueField, { borderColor: color.mainGreen }]} testID="side description">
          <Text style={[styles.value, { color: color.mainText }]}>{side.description}</Text>
        </View>
      ) : (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, ref } }) => (
            <TextInput
              autoCapitalize="sentences"
              autoCorrect={false}
              style={[styles.input, { borderColor: color.mainGreen, color: color.mainText }]}
              selectionColor={color.mainGreen}
              placeholder="Enter side description"
              placeholderTextColor={color.mainTextDim}
              onChangeText={onChange}
              onBlur={onBlur}
              ref={ref}
              returnKeyType="next"
            />
          )}
          name="sideDescription"
        />
      )}
      <View style={styles.optionsBox}>
        <Text style={[styles.optionsLabel, { color: color.mainText }]}>Options *</Text>
        <FlatList
          style={styles.optionsList}
          data={optionsList}
          keyExtractor={(_, i) => i.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <SideOptionElement option={item} isSide={!!side} onAdd={onAddOption} onRemove={onRemoveOption} />
          )}
          testID="side option element list"
        />
        {!side ? (
          <TouchableOpacity onPress={addOptionInput} style={[styles.addOption, { borderColor: color.mainGreen }]} testID="add side input">
            <AntDesign name={"plus"} size={18} color={color.mainGreen} />
            <Text style={[styles.addOptionText, { color: color.mainGreen }]}>Add New Option</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.toggleBox}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <CheckBox
              checked={side?.isRequired ?? value}
              onPress={() => onChange(!value)}
              disabled={!!side}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={color.mainGreen}
              title="Side is required"
              testID="isRequired checkbox"
              textStyle={[styles.termsText, { color: color.mainText }]}
              disabledTitleStyle={[styles.termsText, { color: color.mainText }]}
              containerStyle={styles.termsContainer}
            />
          )}
          name="isRequired"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <CheckBox
              checked={side?.isMultiple ?? value}
              onPress={() => onChange(!value)}
              disabled={!!side}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={color.mainGreen}
              title="Allow multiple options selection"
              testID="isMultiple checkbox"
              textStyle={[styles.termsText, { color: color.mainText }]}
              disabledTitleStyle={[styles.termsText, { color: color.mainText }]}
              containerStyle={styles.termsContainer}
            />
          )}
          name="isMultiple"
        />
      </View>
      <TouchableOpacity onPress={() => side ? onRemove(side.id) : handleSubmit(onSubmit)()} style={[styles.submitBox, { backgroundColor: color.mainGreen }]} testID="add side button">
        <Text style={styles.submitText}>{!!side ? "Remove" : "Add"} Side</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SideElement;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    gap: 20,
    padding: 20
  },
  input: {
    borderBottomWidth: 2,
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 14,
    paddingBottom: 5,
    paddingHorizontal: 5
  },
  optionsBox: {
    gap: 5
  },
  optionsLabel: {
    fontFamily: fonts.I_600I,
    fontSize: 14
  },
  optionsList: {
    gap: 10
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
  addOption: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    paddingVertical: 6,
    width: "auto"
  },
  addOptionText: {
    fontFamily: fonts.I_400,
    fontSize: 16
  },
  toggleBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  termsContainer: {
    backgroundColor: "transparent",
    left: -10,
    margin: 0,
    padding: 0
  },
  termsText: {
    fontFamily: fonts.I_400I,
    fontSize: 12,
  },
  submitBox: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    paddingVertical: 10,
  },
  submitText: {
    color: "#fff",
    fontFamily: fonts.I_500,
    fontSize: 18,
    letterSpacing: .9
  }
});