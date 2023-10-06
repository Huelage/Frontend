import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { LOGIN_USER, LOGIN_VENDOR } from "@api/graphql";
import { getVendorStatus, setCredentials } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import {
  AuthNavigate,
  LoginInputs,
  SubmitButton,
import { getVendorStatus, setAuthStatus } from "@api/slices/globalSlice";
import { AuthNavigate, CustomTextInput, SubmitButton, UserVendor, } from "@components/auth";
} from "@components/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import {
  AuthNavigationProps,
  BiometricsInterface,
  LoginInfoInterface,
  entityInterface,
} from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import {
  BiometricType,
  enableBiometrics,
  fonts,
  getBiometrics,
  getItem,
  loginWithBiometrics,
  setItem,
} from "@utils";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LoginScreen = () => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const inset = useSafeAreaInsets();
  const isVendor = useAppSelector(getVendorStatus);
  const { navigate } = useNavigation<AuthNavigationProps>();
  const [login_user, { data: uData, loading: uLoading }] =
    useMutation(LOGIN_USER);
  const [login_vendor, { data: vData, loading: vLoading }] =
    useMutation(LOGIN_VENDOR);
  const [useSaved, setUseSaved] = useState<boolean>(true);
  const [bioSpecs, setBioSpecs] = useState<BiometricsInterface | null>(null);
  const [savedDetails, setSavedDetails] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const {
    handleSubmit,
    control,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<LoginInfoInterface>({ mode: "onChange" });
  let bioDetail: (typeof BiometricType)[keyof typeof BiometricType] | null =
    null;
  if (bioSpecs?.hasBiometrics && bioSpecs?.isEnrolled) {
    bioDetail = BiometricType[bioSpecs.biometricType[0]];
  }
  const loginwithsaved: boolean =
    (!!savedDetails && useSaved) || (!!bioDetail && useSaved);

  const onSubmit: SubmitHandler<LoginInfoInterface> = async (data) => {
    let input;
    if (savedDetails && useSaved) {
      const entityId = await getItem("huelageEntityId");
      input = { entityId, password: data.password };
    } else {
      input = data;
    }
    isVendor
      ? await login_vendor({ variables: { input } })
      : await login_user({ variables: { input } });
    if (!bioDetail) {
      Alert.alert(
        "Enable Biometric Login?",
        "Enjoy quicker, secure access with biometric authentication. Enable it now?",
        [
          { text: "Enable", onPress: enableBiometrics },
          { text: "Not now", onPress: () => {} },
        ]
      );
    }
    reset();
  };

  useEffect(() => {
    const getData = async () => {
      const id = await getItem("huelageEntityId");
      const name = await getItem("huelageEntityName");
      if (id && name) {
        setSavedDetails({ id, name });
        const { hasBiometrics, isEnrolled, biometricType } =
          await getBiometrics();
        setBioSpecs({ hasBiometrics, isEnrolled, biometricType });
      }
    };
    getData();
  }, []);
  useEffect(() => {
    setTimeout(
      () =>
        setFocus(
          !loginwithsaved ? (isVendor ? "vendorKey" : "email") : "password"
        ),
      0
    );
    reset();
  }, [isVendor, loginwithsaved]);
  useEffect(() => {
    if (uData || vData) {
      const res = isVendor ? vData.signInVendor : uData.signInUser;
      let entity: entityInterface = {
        id: res.entity.entityId,
        walletId: res.entity.wallet.walletId,
        email: res.entity.email,
        phone: res.entity.phone,
        imgUrl: res.entity.imgUrl,
      };
      if (isVendor) {
        entity.repName = res.repName;
        entity.businessName = res.businessName;
        entity.businessAddress = res.businessAddress;
      } else {
        entity.firstName = res.firstName;
        entity.lastName = res.lastName;
      }
      const [accessToken, refreshToken] = [
        res.entity.accessToken,
        res.entity.refreshToken,
      ];
      const name = isVendor
        ? res.businessName
        : `${res.firstName} ${res.lastName}`;
      (async () => {
        await setItem("huelageRefreshToken", refreshToken);
        await setItem("huelageEntityId", res.entity.entityId);
        await setItem("huelageEntityName", name);
      })();
      dispatch(setCredentials({ entity, accessToken }));
    }
  }, [uData, vData]);
  return (
    <>
      <StatusBar style="auto" />
      <View
        style={[
          styles.container,
          { paddingTop: inset.top + hp("8%"), paddingBottom: inset.bottom + 5 },
        ]}
        testID="login screen"
      >
        <View style={styles.headerBox}>
          <Animated.Image
            sharedTransitionTag="huelageLogo"
            style={styles.logoImage}
            testID="logo image"
            source={require("@images/onboard_logo.png")}
          />
          <View style={styles.welcomeBox}>
            <Text style={[styles.welcomeText, { color: color.mainGreen }]}>
              Welcome Back!
            </Text>
            <Text style={[styles.welcomeName, { color: color.mainText }]}>
              {loginwithsaved ? savedDetails?.name : "Login to continue"}
            </Text>
          </View>
        </View>
        <View
          style={styles.inputContainer}
          onTouchStart={() => Keyboard.dismiss()}
        >
          <UserVendor />
          <View style={styles.inputs}>
            <LoginInputs
              isVendor={isVendor}
              loginwithsaved={loginwithsaved}
              control={control}
              errors={errors}
              setFocus={setFocus}
              submit={handleSubmit(onSubmit)}
            />
            <TouchableOpacity onPress={() => navigate("ForgotPassword")}>
              <Text style={[styles.forgotText, { color: color.mainText }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <SubmitButton
              label="LOG IN"
              isLoading={uLoading || vLoading}
              onSubmit={handleSubmit(onSubmit)}
            />
          </View>
          {loginwithsaved && bioDetail ? (
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => setUseSaved(!useSaved)}>
                <Text style={[styles.switchText, { color: color.mainGreen }]}>
                  Switch account
                </Text>
              </TouchableOpacity>
              <View style={styles.biometricBox}>
                <Text style={[styles.biometricText, { color: color.mainText }]}>
                  Login with {bioDetail?.type}
                </Text>
                <TouchableOpacity
                  onPress={loginWithBiometrics}
                  testID="biometric button"
                  style={[
                    styles.biometricButton,
                    { borderColor: color.mainGreen },
                  ]}
                >
                  <bioDetail.icon size={45} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              {loginwithsaved && (
                <View style={styles.footer}>
                  <TouchableOpacity onPress={() => setUseSaved(!useSaved)}>
                    <Text
                      style={[styles.switchText, { color: color.mainGreen }]}
                    >
                      Switch account
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <AuthNavigate page="SI" />
            </>
          )}
        </View>
        <Text style={[styles.contactText, { color: color.mainText }]}>
          <View style={{ marginTop: -7 }}>
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={24}
              color={color.mainText}
            />
          </View>{" "}
          Need help?
          <Text style={{ color: color.mainGreen }}>
            {" "}
            Chat with Huelage Support
          </Text>
        </Text>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  headerBox: {
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
  },
  logoImage: {
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  welcomeBox: {
    alignItems: "center",
    gap: 5,
  },
  welcomeText: {
    fontFamily: fonts.I_700,
    fontSize: 25,
    letterSpacing: 0.5,
  },
  welcomeName: {
    fontFamily: fonts.I_700,
    fontSize: 18,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flex: 1,
    gap: 20,
    paddingHorizontal: wp("8%") + 8,
    paddingVertical: hp("3%"),
    width: "100%",
  },
  inputs: {
    gap: 20,
  },
  forgotText: {
    alignSelf: "flex-end",
    fontFamily: fonts.I_500,
    fontSize: 16,
  },
  footer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 25,
    marginBottom: 30,
  },
  switchText: {
    fontFamily: fonts.I_400,
    fontSize: 14,
    letterSpacing: 0.7,
  },
  biometricBox: {
    alignItems: "center",
    gap: 40,
    marginBottom: 60,
  },
  biometricText: {
    fontFamily: fonts.I_500,
    fontSize: 14,
  },
  biometricButton: {
    alignItems: "center",
    borderRadius: 40,
    borderWidth: 1,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  biometricIcon: {
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  contactText: {
    fontFamily: fonts.I_400,
    fontSize: 14,
  },
});
