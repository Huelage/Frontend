import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";
import { ProfileInfo, ProfileList, ProfileList2, } from "@components/core/Profile";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";

const ProfileScreen = () => {
  const { color } = useAppTheme();

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView
        style={[styles.container, { backgroundColor: color.mainBg }]}
        testID="profile screen"
      >
        <View style={styles.mainBox}>
          <ProfileInfo />
          <ProfileList />
        </View>
        <View style={[styles.horizontalLine, { backgroundColor: color.mainGreen }]}></View>
        <ProfileList2 />
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainBox: {
    flex: 1,
    gap: 50,
    marginTop: hp("5%"),
  },
  horizontalLine: {
    height: 3,
    marginBottom: 50,
    marginTop: 15,
  },
});
