import { mockRestaurants } from "@api/mock";
import { CustomBox } from "@components/misc";
import { useAppTheme } from "@hooks";
import { UserVendorTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const VendorResCard = ({ resId }: { resId: string; }) => {
	const { color } = useAppTheme();
	const { navigate } = useNavigation<UserVendorTabProps>();
	const restaurant = mockRestaurants.find(res => res.id === resId);
	return (
		<View style={[styles.container]} testID="vendor res card">
			<CustomBox height={100} width={wp("100%") - 30} pad={6} r={10} />
			<Image testID="restaurant image" style={styles.image} source={{ uri: restaurant?.imgUrl }} />
			<View style={styles.details}>
				<Text style={[styles.name, { color: color.mainText }]}>{restaurant?.name}</Text>
				<Text numberOfLines={2} style={[styles.location, { color: color.mainText }]}>{restaurant?.location}</Text>
			</View>
			<TouchableOpacity onPress={() => navigate("VendorHome", { vendorId: resId })} style={styles.buttonBox} testID="view vendor">
				<Text style={styles.button}>View</Text>
			</TouchableOpacity>
		</View>
	);
};

export default memo(VendorResCard);

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		gap: 15,
		justifyContent: "center",
		paddingLeft: 20,
		paddingRight: 10,
		paddingVertical: 10
	},
	details: {
		flex: 1,
		gap: 5,
		justifyContent: "center"
	},
	image: {
		borderRadius: 35,
		height: 70,
		width: 70
	},
	name: {
		fontFamily: fonts.I_600,
		fontSize: 14
	},
	location: {
		fontFamily: fonts.I_400,
		fontSize: 12
	},
	buttonBox: {
		alignItems: "center",
		backgroundColor: "#4CAF50",
		borderRadius: 10,
		justifyContent: "center",
		paddingHorizontal: 25,
		paddingVertical: 8
	},
	button: {
		color: "#fff",
		fontFamily: fonts.I_500,
	}
});