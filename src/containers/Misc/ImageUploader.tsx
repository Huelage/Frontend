import { useAppSelector } from "@api/app/appHooks";
import { UPLOAD_IMAGE } from "@api/graphql";
import { getEntity } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts, showError, showSuccess } from "@utils";
import { ReactNativeFile } from "apollo-upload-client";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import React, { memo, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as mime from "react-native-mime-types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import uuid from "react-native-uuid";

interface ImageUploaderInterface {
  prevImage?: string;
  onUpload: (image: string) => void;
}

const generateFile = (uri: string, name: string) => {
  const type = mime.lookup(uri) || "image";
  const extension = mime.extension(type);
  return new ReactNativeFile({ uri, name: `${name}.${extension}`, type });
};

const ImageUploader = ({ prevImage, onUpload }: ImageUploaderInterface) => {
  const entity = useAppSelector(getEntity);
  const { color } = useAppTheme();
  const [image, setImage] = useState<string>(prevImage ?? "");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [uploadImage, { data, loading }] = useMutation(UPLOAD_IMAGE);

  const addImage = async () => {
    let res = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    if (!res.canceled) {
      setImage(res.assets[0].uri);
      setIsSelected(true);
    } else showError("Image selection cancelled");
  };

  const upload = async () => {
    const name = entity?.firstName ?? entity?.businessName ?? "image", id = uuid.v4().toString();
    const file = generateFile(image, `${name}-${id}`), input = { id, image: file };
    await uploadImage({ variables: { input } });
  };

  useEffect(() => {
    if (!!data) {
      onUpload(data.uploadImage);
      showSuccess("Image uploaded successfully");
      setIsSelected(false);
    };
  }, [data]);
  return (
    <View style={styles.container} testID="image uploader">
      <View style={[styles.imageBox, { backgroundColor: color.cardBg2 }]}>
        {!!image ? (
          <Image style={styles.image} source={{ uri: image }} testID="user image" />
        ) : (
          <Text style={[styles.imageText, { color: color.mainText }]} testID="user image alt">Add an image</Text>
        )}
        <TouchableOpacity style={styles.editImage} onPress={addImage} testID="add image button">
          <MaterialCommunityIcons name="camera" size={30} color={color.mainGreen} />
        </TouchableOpacity>
      </View>
      {isSelected ? (
        <TouchableOpacity disabled={loading} onPress={upload} style={[styles.uploadBox, { borderColor: color.mainGreen }]} testID="upload button">
          {loading ? (
            <ActivityIndicator color={color.mainGreen} size={20} testID="upload image loading" />
          ) : (
            <Text style={[styles.uploadText, { color: color.mainGreen }]} testID="upload image button">Upload Image</Text>
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default memo(ImageUploader);

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  imageBox: {
    alignItems: "center",
    borderColor: "rgba(76, 175, 80, .5)",
    borderWidth: 1,
    borderRadius: hp("7.5%"),
    height: hp("15%"),
    justifyContent: "center",
    width: hp("15%")
  },
  image: {
    borderRadius: 1000,
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
  uploadBox: {
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  uploadText: {
    fontFamily: fonts.I_600,
    fontSize: 14
  }
});