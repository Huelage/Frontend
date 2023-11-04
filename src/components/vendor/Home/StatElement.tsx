import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatElementInterface {
  title: string;
  value: number;
  Icon: ({ size }: { size: number; }) => React.JSX.Element;
}

const StatElement = ({ title, value, Icon }: StatElementInterface) => {
  const { color } = useAppTheme();
  return (
    <View style={styles.statElement} testID="stat element">
      <View style={styles.statBox}>
        <Icon size={26} />
        <Text style={[styles.statBoxText, { color: color.mainText }]}>{value}</Text>
      </View>
      <Text style={[styles.title, { color: color.mainText }]}>{title}</Text>
    </View>
  );
};

export default StatElement;

const styles = StyleSheet.create({
  statBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center"
  },
  statBoxText: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  statElement: {
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.I_300,
    fontSize: 12,
    letterSpacing: 1,
    textAlign: "center"
  }
});