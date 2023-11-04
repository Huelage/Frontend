import { useAppTheme } from "@hooks";
import { fonts, shadowStyle } from "@utils";
import React, { BaseSyntheticEvent } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SubmitProps {
	label: string;
	isLoading?: boolean;
	onSubmit: ((e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>) | (() => void);
}

const SubmitButton = ({ label, isLoading, onSubmit }: SubmitProps) => {
	const { color } = useAppTheme();
	return (
		<TouchableOpacity onPress={onSubmit} testID="submit button">
			<View style={[styles.loginButton, { backgroundColor: color.mainGreen }]}>
				{isLoading ? (
					<ActivityIndicator testID="loader" />
				) : (
					<Text style={styles.loginText}>{label}</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default SubmitButton;

const styles = StyleSheet.create({
	loginButton: {
		alignItems: "center",
		borderRadius: 10,
		height: 45,
		justifyContent: "center",
		width: "100%",
		...shadowStyle
	},
	loginText: {
		color: "#fff",
		fontFamily: fonts.I_700,
		fontSize: 18
	}
});