import { Ionicons } from "@expo/vector-icons";
import { fonts, shadowStyle } from "@utils";
import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Ratings = () => {
  return (
    <View style={styles.Frame}>
      <Text style={styles.rating}>4.3</Text>

      <Ionicons name="star" size={18} color="#FFD700" />
    </View>
  );
};

export default Ratings;
const styles = StyleSheet.create({
  Frame: {
    alignItems: "center",
    backgroundColor: "#47CA4C",
    borderRadius: 10,
    width: wp("20%"),
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 15,
    marginTop: 4,
    ...shadowStyle,
  },
  rating: {
    color: "#ffffff",
    fontFamily: fonts.I_700,
    fontSize: 20,
    fontWeight: "700",
  },
});
