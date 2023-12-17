import { CustomBox } from "@components/misc";
import { AntDesign, FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts, showError } from "@utils";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface DetailElementInterface {
  label: string;
  value: string;
  verifible?: boolean;
  editable?: boolean;
  isVerified?: boolean;
  verify?: () => void;
  edit?: (val: string) => void;
}

const DetailElement = ({ label, value, verifible, editable, isVerified, verify, edit }: DetailElementInterface) => {
  const { color } = useAppTheme();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(value);

  const handleEdit = () => {
    if (isEditing) {
      if (value === newValue) showError("There was no value change");
      else edit!(newValue);
      setIsEditing(false);
    } else setIsEditing(true);
  };
  return (
    <View style={styles.container} testID="detail element">
      <Text style={[styles.elementHeader, { color: color.mainText }]}>{label}</Text>
      <View style={styles.elementBody}>
        <CustomBox width={wp("100%") - 30} height={90} pad={6} r={10} />
        {isEditing ? (
          <TextInput
            style={[styles.homeSearchInput, { color: color.searchText }]}
            placeholder="Search dishes..."
            onChangeText={setNewValue}
            value={newValue}
            placeholderTextColor={color.searchText}
            selectionColor={color.mainGreen}
          />
        ) : (
          <Text style={[styles.elementText, { color: color.mainText }]}>{value}</Text>
        )}
        {verifible ? (
          isVerified ? (
            <View testID="verified">
              <MaterialIcons name="verified" size={24} color="#1A30FF" />
            </View>
          ) : (
            <TouchableOpacity onPress={verify} testID="unverified">
              <Octicons name="unverified" size={24} color={color.danger} />
            </TouchableOpacity>
          )
        ) : null}
        {(editable && !!edit) ? (
          <TouchableOpacity onPress={handleEdit}>
            {isEditing ? (
              <FontAwesome name="send-o" size={24} color={color.mainGreen} />
            ) : (
              <AntDesign name="edit" size={24} color={color.mainGreen} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default DetailElement;

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  elementHeader: {
    fontFamily: fonts.I_600,
    fontSize: 18,
    left: 10
  },
  elementBody: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 30
  },
  elementText: {
    fontFamily: fonts.I_300,
    fontSize: 18,
    letterSpacing: 1.1,
    margin: 30
  },
  homeSearchInput: {
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 15,
    marginVertical: 15,
    marginLeft: 30,
    marginRight: 10,
    paddingVertical: 18
  }
});