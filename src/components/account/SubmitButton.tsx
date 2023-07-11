import React, { BaseSyntheticEvent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shadowStyle } from '../../utils';
import { fonts } from '../../utils/fontEnum';

interface SubmitProps {
	page: 'SU' | 'SI';
	onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

const SubmitButton = ({ page, onSubmit }: SubmitProps) => {
	return (
		<TouchableOpacity onPress={onSubmit}>
			<View style={styles.loginButton}>
				<Text style={styles.loginText}>{page == 'SU' ? "CREATE ACCOUNT" : "LOG IN"}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default SubmitButton;

const styles = StyleSheet.create({
	loginButton: {
		alignItems: 'center',
		backgroundColor: "#4CAF50",
		borderRadius: 10,
		height: 50,
		justifyContent: 'center',
		...shadowStyle
	},
	loginText: {
		color: "#fff",
		fontFamily: fonts.I_700,
		fontSize: 18
	}
});