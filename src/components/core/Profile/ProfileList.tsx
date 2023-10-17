import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { UserProfileTabProps } from "@interfaces";

const ProfileList = () => {
  const { color } = useAppTheme();
  const { navigate } = useNavigation<UserProfileTabProps>();
  return (
    <View style={styles.container} testID="Profile List">
      <View style={styles.mainBox}>
        <TouchableOpacity style={styles.innerBox} onPress={() => navigate("UserDetails")} >
          <MaterialCommunityIcons name="account-circle-outline" size={30} color={color.mainGreen}   ></MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>     {" "}     Profile Details   </Text>
          <MaterialCommunityIcons name="chevron-right" size={30} color={color.mainText}   ></MaterialCommunityIcons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={() => navigate("Location")}>
          <MaterialCommunityIcons name="map-marker-outline" size={30} color={color.mainGreen}> </MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>    {" "}    Locations  </Text>
          <MaterialCommunityIcons name="chevron-right" size={30} color={color.mainText}  ></MaterialCommunityIcons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={() => navigate("Notification")}>
          <MaterialCommunityIcons name="bell-outline" size={30} color={color.mainGreen} ></MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>   {" "}   Notifications </Text>
          <MaterialCommunityIcons name="chevron-right" size={30} color={color.mainText} ></MaterialCommunityIcons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={() => navigate("MyOrders")}>
          <MaterialCommunityIcons name="file-check-outline" size={30} color={color.mainGreen}  ></MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>    {" "}    My Orders  </Text>
          <MaterialCommunityIcons name="chevron-right" size={30} color={color.mainText}  ></MaterialCommunityIcons>
        </TouchableOpacity><TouchableOpacity style={styles.innerBox} onPress={() => navigate("Wallet")}>
          <MaterialCommunityIcons name="wallet-outline" size={30} color={color.mainGreen}  ></MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>    {" "}    My Wallet  </Text>
          <MaterialCommunityIcons name="chevron-right" size={30} color={color.mainText}  ></MaterialCommunityIcons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={() => navigate("Referral")}>
          <MaterialCommunityIcons name="account-group" size={30} color={color.mainGreen}  ></MaterialCommunityIcons>
          <Text style={[styles.textStyle, { color: color.mainText }]}>    {" "}    Referrals  </Text>
          <MaterialCommunityIcons name="chevron-right" size={30} color={color.mainText}  ></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ProfileList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainBox: {
    gap: 10,
    flex: 1,
    alignItems: "center",
    height: hp("50%"),
  },
  innerBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    width: wp("80%"),
    textAlign: "justify",
  },
  textStyle: {
    fontSize: 24,
    fontFamily: fonts.I_500,
    fontWeight: "500",

    paddingRight: 60,
  },
});
