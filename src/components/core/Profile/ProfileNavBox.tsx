import { CustomBox } from "@components/misc";
import { ProfileElementInterface } from "@interfaces";
import React, { useState } from "react";
import { FlatList, LayoutChangeEvent, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ProfileBoxElement from "./ProfileBoxElement";

interface ProfileNavBoxInterface {
  elements: ProfileElementInterface[];
}

const ProfileNavBox = ({ elements }: ProfileNavBoxInterface) => {
  const [height, setHeight] = useState<number>(0);
  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeight(height + 30);
  };
  return (
    <View style={styles.container} testID="profile nav box">
      <CustomBox width={wp("100%") - 15} height={height} pad={6} r={10} />
      <FlatList
        data={elements}
        scrollEnabled={false}
        keyExtractor={item => item.label}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onLayout={handleLayout}
        renderItem={({ item }) => <ProfileBoxElement {...item} />}
        testID="profile nav list"
      />
    </View>
  );
};

export default ProfileNavBox;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 10
  },
  separator: {
    backgroundColor: "rgba(136, 136, 136, 0.3)",
    height: 1,
    marginHorizontal: 20
  }
});