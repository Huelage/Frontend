import { CustomBox, FastImage } from "@components/misc";
import { useAppTheme } from "@hooks";
import { UserVendorTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export interface VendorResCardInterface {
	address: string;
	id: string;
	imgUrl: string;
	name: string;
}

const VendorResCard = ({ address, id, imgUrl, name }: VendorResCardInterface) => {
	const { color } = useAppTheme();
	const { navigate } = useNavigation<UserVendorTabProps>();
	return (
		<View style={[styles.container]} testID="vendor res card">
			<CustomBox bgColor={color.cardBg2} height={100} width={wp("100%") - 30} pad={6} r={10} />
			<FastImage testId="restaurant image" style={styles.image} src={imgUrl} />
			<View style={styles.details}>
				<Text style={[styles.name, { color: color.mainText }]}>{name}</Text>
				<Text numberOfLines={2} style={[styles.location, { color: color.mainText }]}>{address}</Text>
			</View>
			<TouchableOpacity onPress={() => navigate("VendorHome", { vendorId: id })} style={styles.buttonBox} testID="view vendor">
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