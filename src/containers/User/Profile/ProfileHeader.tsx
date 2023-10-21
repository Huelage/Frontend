import { useAppSelector } from "@api/app/appHooks";
import { getEntity } from "@api/slices/globalSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";

const ProfileHeader = () => {
  const { color } = useAppTheme();
  const entity = useAppSelector(getEntity);
  const addImage = () => console.log("add image");
  if (!entity) return null;
  return (
    <View style={styles.container} testID="profile header">
      <View style={[styles.imageBox, { backgroundColor: color.cardBg }]}>
        {!!entity.imgUrl ? (
          <Image style={styles.image} source={{ uri: entity.imgUrl }} testID="user image" />
        ) : (
          <Text style={[styles.imageText, { color: color.mainText }]}>Add an image</Text>
        )}
        <TouchableOpacity style={styles.editImage} onPress={addImage} testID="add image button">
          <MaterialCommunityIcons name="camera" size={30} color={color.mainGreen} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.nameText, { color: color.mainText }]}>{`${entity.firstName} ${entity.lastName}`}</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    marginTop: hp("5%")
  },
  imageBox: {
    alignItems: 'center',
    borderColor: "rgba(136, 136, 136, 0.5)",
    borderWidth: 1,
    borderRadius: 15,
    height: hp("15%"),
    justifyContent: 'center',
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
    position: 'absolute',
    bottom: -10,
    right: -15
  },
  nameText: {
    fontFamily: fonts.I_700,
    fontSize: 20,
    textAlign: 'center'
  }
});