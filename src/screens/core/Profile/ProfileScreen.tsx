import { ProfileInfo, ProfileList, ProfileList2, } from "@components/core/Profile";
import { useAppTheme } from "@hooks";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProfileScreen = () => {
  const { color } = useAppTheme();

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView style={[styles.container, { backgroundColor: color.mainBg }]} testID="profile screen">
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
