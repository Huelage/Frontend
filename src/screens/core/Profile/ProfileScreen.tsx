import { ProfileNavBox } from "@components/core/Profile";
import { ProfileHeader } from "@containers/User";
import { useAppTheme } from "@hooks";
import { ProfileElementInterface } from "@interfaces";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const nav1: ProfileElementInterface[] = [
    { label: "Profile Details", icon: "account-circle-outline", nav: "UserDetails" },
    { label: "Locations", icon: "map-marker-outline", nav: "Location" },
    { label: "My Wallet", icon: "wallet-outline", nav: "Wallet" },
    { label: "Referrals", icon: "account-group", nav: "Referral" },
  ];
  const nav2: ProfileElementInterface[] = [
    { label: "Settings", icon: "cog-outline", nav: "Setting" },
    { label: "FAQs", icon: "frequently-asked-questions", nav: "FAQ" },
    { label: "Help", icon: "help-circle-outline", nav: "Help" },
    { label: "About Us", icon: "information-outline", nav: "About" },
  ];
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="profile screen">
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <ProfileHeader />
        <View style={styles.navBox}>
          <ProfileNavBox elements={nav1} />
          <ProfileNavBox elements={nav2} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    gap: 30,
    paddingBottom: 30
  },
  navBox: {
    gap: 10,
  }
});
