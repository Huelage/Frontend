import { CustomBox } from "@components/misc";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface DetailElementInterface {
  label: string;
  value: string;
  verifible?: boolean;
  isVerified?: boolean;
  verify?: () => void;
}

const DetailElement = ({ label, value, verifible, isVerified, verify }: DetailElementInterface) => {
  const { color } = useAppTheme();
  return (
    <View style={styles.container} testID="detail element">
      <Text style={[styles.elementHeader, { color: color.mainText }]}>{label}</Text>
      <View style={styles.elementBody}>
        <CustomBox width={wp("100%") - 30} height={90} pad={6} r={10} />
        <Text style={[styles.elementText, { color: color.mainText }]}>{value}</Text>
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
    padding: 30
  },
  elementText: {
    fontFamily: fonts.I_300,
    fontSize: 18,
    letterSpacing: 1.1
  }
});