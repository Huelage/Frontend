import { CustomTextInput, SubmitButton } from "@components/auth";
import { AddFoodInterface } from "@interfaces";
import { categories, pricingMethods } from "@utils";
import React, { useState } from "react";
import { Control, Controller, FieldErrors, UseFormSetFocus, UseFormWatch } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import PackageSizeInput from "./PackageSizeInput";
import SideInput from "./SideInput";

interface addFoodInputsProps {
  control: Control<AddFoodInterface, any>;
  errors: FieldErrors<AddFoodInterface>;
  setFocus: UseFormSetFocus<AddFoodInterface>;
  watch: UseFormWatch<AddFoodInterface>;
  submit: () => void;
}

const pricePlaceholder = (pricingMethod: string) => {
  if (pricingMethod === "PRICE") return "Minimum Price";
  if (pricingMethod === "PORTION") return "Price per portion";
  return "Price";
};

const AddMenuInputs = ({ control, errors, setFocus, submit, watch }: addFoodInputsProps) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const addFood = () => {
    submit();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 1000);
  };
  return (
    <View style={styles.container} testID="add menu inputs">
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <CustomTextInput
            autoCapitalize="words"
            autoCorrect={false}
            error={errors.name}
            label="Food Name *"
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={() => setFocus("description")}
            innerRef={ref}
            returnKeyType="next"
            value={value}
          />
        )}
        name="name"
        rules={{
          required: "Food name is required",
          minLength: {
            value: 3,
            message: "Food name should be a minimum of 3 charaters",
          },
        }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <CustomTextInput
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.description}
            label="Food Description *"
            onBlur={onBlur}
            onChangeText={onChange}
            innerRef={ref}
            returnKeyType="next"
            value={value}
          />
        )}
        name="description"
        rules={{
          required: "Food description is required",
          minLength: {
            value: 3,
            message: "Food description should be a minimum of 3 charaters",
          },
        }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <CustomTextInput
            isDrop
            data={categories}
            error={errors.category}
            label="Category *"
            onChangeText={onChange}
            innerRef={ref}
            returnKeyType="next"
            value={value}
          />
        )}
        name="category"
        rules={{ required: "Please select a category from the list" }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <CustomTextInput
            isDrop
            data={pricingMethods}
            error={errors.pricingMethod}
            label="Pricing Method *"
            onChangeText={onChange}
            innerRef={ref}
            returnKeyType="next"
            value={value}
          />
        )}
        name="pricingMethod"
        rules={{ required: "Please select a category from the list" }}
      />
      {watch("pricingMethod") ? watch("pricingMethod") === "PACKAGE" ? (
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <PackageSizeInput sizes={value ?? []} onChange={onChange} />
          )}
          name="packageSizes"
          rules={{
            required: "You need to create package sizes",
            minLength: {
              value: 2,
              message: "You need to specify at least 2 package sizes",
            }
          }}
        />
      ) : (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <CustomTextInput
              autoCorrect={false}
              error={errors.price}
              label={`${pricePlaceholder(watch("pricingMethod"))} *`}
              onBlur={onBlur}
              onChangeText={onChange}
              innerRef={ref}
              returnKeyType="next"
              value={value?.toString()}
            />
          )}
          name="price"
          rules={{ required: `${pricePlaceholder(watch("pricingMethod"))} is required` }}
        />
      ) : null}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <SideInput sides={value ?? []} onChange={onChange} isSubmitted={isSubmitted} />
        )}
        name="sides"
      />
      <SubmitButton label="Create Food" onSubmit={addFood} />
    </View>
  );
};

export default AddMenuInputs;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    width: "100%"
  }
});