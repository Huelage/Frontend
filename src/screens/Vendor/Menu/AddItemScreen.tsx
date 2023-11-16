import { AddMenuInputs } from "@components/vendor/Menu";
import { ImageUploader } from "@containers/Misc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { AddFoodInterface, VendorMenuTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddItemScreen = () => {
  const { color } = useAppTheme();
  const [image, setImage] = useState<string>("");
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<VendorMenuTabProps>();
  const { handleSubmit, control, setFocus, watch, reset, formState: { errors } } = useForm<AddFoodInterface>({ mode: "onChange" });

  const onSubmit = (data: AddFoodInterface) => { console.log(data); reset(); };
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="add item screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]} testID="header box">
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Create Food</Text>
      </View>
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} contentContainerStyle={styles.mainBox}>
        <ImageUploader prevImage={image} onUpload={setImage} />
        <AddMenuInputs control={control} errors={errors} setFocus={setFocus} submit={handleSubmit(onSubmit)} watch={watch} />
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
    padding: 20
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