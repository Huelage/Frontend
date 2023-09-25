import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "@hooks";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { fonts } from "@utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileInfo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { color } = useAppTheme();

  return (
    <View style={styles.container} testID="profile Info">
      <View style={styles.mainBox}>
        <View style={styles.imageWrap}>
          <View style={styles.imageBox}></View>
          <TouchableOpacity style={styles.changeImageIcon}>
            <MaterialCommunityIcons
              name="camera"
              size={30}
              color={color.mainGreen}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.profileText, { color: color.mainText }]}>
          John Jane Doe
        </Text>
        <TouchableOpacity
          style={[styles.Edit, { borderColor: color.mainGreen }]}
        >
          <Text style={[styles.editText, { color: color.mainGreen }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  mainBox: {
    gap: 20,
    flex: 1,
    alignItems: "center",
  },
  imageWrap: {
    width: wp("33%"),
    height: hp("16%"),
  },
  imageBox: {
    width: wp("30%"),
    height: hp("15%"),
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  changeImageIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  Edit: {
    width: "30%",
    height: "15%",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 10,
  },
  editText: {
    fontSize: 20,
    fontFamily: fonts.I_400,
    fontWeight: "600",
  },
  profileText: {
    fontFamily: fonts.I_500,
    fontWeight: "700",
    fontSize: 26,
  },
});
