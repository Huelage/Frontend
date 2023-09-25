import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ProfileList2 = () => {
  const { color } = useAppTheme();
  return (
    <View style={styles.container} testID="Profile List">
      <View style={styles.mainBox}>
        <TouchableOpacity style={styles.innerBox}>
          <MaterialCommunityIcons
            name="cog-outline"
            size={30}
            color={color.mainGreen}
          ></MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>
            {" "}
            Settings
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={color.mainText}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox}>
          <MaterialCommunityIcons
            name="frequently-asked-questions"
            size={30}
            color={color.mainGreen}
          ></MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>
            {" "}
            FAQs
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={color.mainText}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox}>
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={30}
            color={color.mainGreen}
          ></MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>
            {" "}
            Help
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={color.mainText}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox}>
          <MaterialCommunityIcons
            name="information-outline"
            size={30}
            color={color.mainGreen}
          ></MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>
            {" "}
            About Us
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={color.mainText}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileList2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainBox: {
    gap: 5,
    flex: 1,
    alignItems: "center",
    height: hp("40%"),
  },
  innerBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    width: wp("80%"),
  },
  textStyle: {
    fontSize: 24,
    fontFamily: fonts.I_500,
    fontWeight: "500",
    paddingRight: 60,
  },
});
