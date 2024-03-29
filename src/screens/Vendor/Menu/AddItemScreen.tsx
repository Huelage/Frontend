import { ADD_FOOD_ITEM } from "@api/graphql";
import { useMutation } from "@apollo/client";
import { AddMenuInputs } from "@components/vendor/Menu";
import { ImageUploader } from "@containers/Misc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { AddFoodInterface, VendorMenuTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, showError, showSuccess } from "@utils";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddItemScreen = () => {
  const { color } = useAppTheme();
  const [imgUrl, setImgUrl] = useState<string>("");
  const insets = useSafeAreaInsets();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { goBack } = useNavigation<VendorMenuTabProps>();
  const [addFood, { data }] = useMutation(ADD_FOOD_ITEM);
  const { handleSubmit, control, setFocus, watch, reset, formState: { errors } } = useForm<AddFoodInterface>({ mode: "onChange" });

  const onSubmit = async (data: AddFoodInterface) => {
    if (!imgUrl) return showError("Please upload an image");
    const input = { ...data, imgUrl };
    input.price = data.price ? Number(data.price) : 0;
    input.preparationTime = data.preparationTime ? Number(data.preparationTime) : 0;
    await addFood({ variables: { input } });
  };

  useEffect(() => {
    if (data) {
      showSuccess("Food added to your menu successfully");
      reset();
      setImgUrl("");
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 500);
    }
  }, [data]);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="add item screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]} testID="header box">
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Create Food</Text>
      </View>
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} contentContainerStyle={styles.mainBox}>
        <ImageUploader clear={isSubmitted} prevImage={imgUrl} onUpload={setImgUrl} />
        <AddMenuInputs isSubmitted={isSubmitted} control={control} errors={errors} setFocus={setFocus} submit={handleSubmit(onSubmit)} watch={watch} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerBox: {
    alignItems: "center",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 10
  },
  backButton: {
    position: "absolute",
    top: -5,
    left: 10
  },
  headerText: {
    fontFamily: fonts.I_500,
    fontSize: 20
  },
  mainBox: {
    alignItems: "center",
    gap: 30,
    padding: 20,
    paddingBottom: 30
  },
  imageBox: {
    alignItems: "center",
    borderColor: "rgba(76, 175, 80, .5)",
    borderWidth: 1,
    borderRadius: hp("7.5%"),
    height: hp("15%"),
    justifyContent: "center",
    width: wp("33%")
  },
  image: {
    borderRadius: 15,
    height: "100%",
    width: "100%"
  },
  imageText: {
    fontFamily: fonts.I_300,
    fontSize: 14
  },
  editImage: {
    position: "absolute",
    bottom: 0,
    right: 5
  },
});