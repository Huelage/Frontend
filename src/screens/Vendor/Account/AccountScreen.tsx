import { useAppSelector } from "@api/app/appHooks";
import { getEntity } from "@api/slices/globalSlice";
import { ProfileNavBox } from "@components/core/Profile";
import { ImageUploader } from "@containers/Misc";
import { useAppTheme } from "@hooks";
import { ProfileElementInterface } from "@interfaces";
import { fonts } from "@utils";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const nav1: ProfileElementInterface[] = [
  { label: "Account Details", icon: "account-circle-outline", nav: "AccountDetails" },
  { label: "My Wallet", icon: "wallet-outline", nav: "Wallet" },
  { label: "Settings", icon: "cog-outline", nav: "Setting" },
  { label: "FAQs", icon: "frequently-asked-questions", nav: "FAQ" },
  { label: "Help", icon: "help-circle-outline", nav: "Help" },
  { label: "About Us", icon: "information-outline", nav: "About" },
];

const AccountScreen = () => {
  const entity = useAppSelector(getEntity);
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();

  const addImage = (imgUrl: string) => console.log(imgUrl);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="profile screen">
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={styles.profileHeader}>
          <ImageUploader prevImage={entity?.imgUrl} onUpload={addImage} />
          <Text style={[styles.nameText, { color: color.mainText }]}>{entity?.businessName}</Text>
        </View>
        <View style={styles.navBox}>
          <ProfileNavBox elements={nav1} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    gap: 30,
    paddingBottom: 30
  },
  navBox: {
    gap: 15,
  },
  profileHeader: {
    alignItems: "center",
    gap: 20,
    marginTop: hp("5%")
  },
  nameText: {
    fontFamily: fonts.I_700,
    fontSize: 20,
    textAlign: "center"
  }
});
