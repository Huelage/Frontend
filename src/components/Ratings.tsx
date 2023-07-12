import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { fonts } from "../utils/fontEnum";
const Ratings = () => {
  return (
    <View style={styles.Frame}>
      <Text style={styles.rating}>4.3</Text>
    </View>
  );
};

export default Ratings;
const styles = StyleSheet.create({
  Frame: {
    backgroundColor: "#47c94c",
    display: "flex",
    height: 40,
    width: "15%",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 11,
    right: "33%",
    top: "16.5%",
    shadowColor: "000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 7,
  },
  rating: {
    color: "#ffffff",
    fontFamily: fonts.I_700,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "right",
  },
});
