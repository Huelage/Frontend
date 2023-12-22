import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { SET_PASSWORD } from "@api/graphql";
import { getVendorStatus, setCredentials } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { SetPasswordInputs, SubmitButton } from "@components/auth";
import { ImageUploader } from "@containers/Misc";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { AuthNavigationProps, ImageUploadRouteProps, ResetPasswordInterface, SetPasswordRouteProps } from "@interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fonts, setItem } from "@utils";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ImageUploadScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { color } = useAppTheme();
  const isVendor = useAppSelector(getVendorStatus);
  const { params: { entity, accessToken } } = useRoute<ImageUploadRouteProps>();
  const { goBack } = useNavigation<AuthNavigationProps>();

  const skip = () => dispatch(setCredentials({ accessToken, entity }));
  const onUpload = (imgUrl: string) => {
    console.log({ imgUrl });
    dispatch(setCredentials({ accessToken, entity }));
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]} testID="image upload screen">
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <AntDesign name="arrowleft" size={26} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Set Profile Picture</Text>
      </View>
      <View style={styles.mainBox}>
        <View style={styles.mainBoxHeader}>
          <Text style={[styles.mainText, { color: color.mainText }]}>Select your profile picture</Text>
          <ImageUploader buttonGap={50} buttonPadV={10} iconSize={35} onUpload={onUpload} right={30} size={hp("25%")} />
        </View>
        {!isVendor ? (
          <TouchableOpacity onPress={skip} style={styles.skipButton}>
            <Text style={[styles.skipText, { color: color.mainTextDim }]}>Skip {">>"}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default ImageUploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  backButton: {
    position: "absolute",
    left: 20
  },
  headerText: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  mainBox: {
    alignItems: "center",
    flex: 1,
    gap: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 70
  },
  mainBoxHeader: {
    alignItems: "center",
    gap: 50,
    justifyContent: "center"
  },
  mainText: {
    fontFamily: fonts.I_700,
    fontSize: 18
  },
  skipButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
    width: "50%"
  },
  skipText: {
    color: "#1A30FF",
    fontFamily: fonts.I_500,
    fontSize: 16
  }
});
