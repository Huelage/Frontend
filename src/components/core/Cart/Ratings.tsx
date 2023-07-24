import { Ionicons } from "@expo/vector-icons";
import { fonts, shadowStyle } from "@utils";
import { StyleSheet, Text, View } from "react-native";

const Ratings = () => {
  return (
    <View style={styles.Frame}>
      <Text style={styles.rating}>4.3</Text>
      <View style={styles.ratingIcon}>
        <Ionicons name="star" size={28} color="#FFD700" />
      </View>
    </View>
  );
};

export default Ratings;
const styles = StyleSheet.create({
  Frame: {
    backgroundColor: "#47c94c",
    display: "flex",
    height: 43,
    marginLeft: 10,
    width: "15%",
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 11,
    alignItems: "stretch",

    ...shadowStyle,
  },
  rating: {
    color: "#ffffff",
    fontFamily: fonts.I_700,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "right",
  },
  ratingIcon: {
    bottom: "100%",
  },
});
