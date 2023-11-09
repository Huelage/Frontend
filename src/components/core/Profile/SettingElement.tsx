import { useAppTheme } from "@hooks";
import { SettingElementInterface } from "@interfaces";
import { fonts } from "@utils";
import React, { memo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SettingOptionBox from "./SettingOptionBox";

const SettingElement = ({ title, Icon, options }: SettingElementInterface) => {
  const { color } = useAppTheme();
  return (
    <View style={styles.container} testID="setting element">
      <View style={[styles.iconBox, { backgroundColor: color.mainGreen }]} testID="setting icon">
        <Icon />
      </View>
      <View style={styles.detailBox}>
        <Text style={[styles.title, { color: color.mainText }]}>{title}</Text>
        <FlatList
          style={styles.contentContainer}
          data={options}
          scrollEnabled={false}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => <SettingOptionBox {...item} />}
          testID="setting box list"
        />
      </View>
    </View>
  );
};

export default memo(SettingElement);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    padding: 20
  },
  contentContainer: {
    gap: 10
  },
  iconBox: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  detailBox: {
    flex: 1,
    gap: 15,
    paddingTop: 8
  },
  title: {
    fontFamily: fonts.I_600,
    fontSize: 22,
    letterSpacing: 1
  }
});