import React, { BaseSyntheticEvent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts, shadowStyle } from '../../utils';

interface SubmitProps {
	label: string;
	onSubmit: ((e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>) | (() => void);
}

const SubmitButton = ({ label, onSubmit }: SubmitProps) => {
	return (
		<TouchableOpacity onPress={onSubmit}>
			<View style={styles.loginButton}>
				<Text style={styles.loginText}>{label}</Text>
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
		width: '100%',
		...shadowStyle
	},
	loginText: {
		color: "#fff",
		fontFamily: fonts.I_700,
		fontSize: 18
	}
});