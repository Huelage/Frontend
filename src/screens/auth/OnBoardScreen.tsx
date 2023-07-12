import { fonts } from '@utils';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';

const OnBoardScreen = () => {
	return (
		<LinearGradient
			colors={["#4CAF50", "#91D56C"]}
			start={{ x: 0.09, y: 1 }}
			end={{ x: 1, y: 0.02 }}
			locations={[0.74, 1]}
			style={styles.container}
		>
			<Image style={styles.logoImage} source={require('@images/onboardLogo.png')} />
			<Text style={styles.welcomeText}>OnBoardScreen</Text>
		</LinearGradient>
	);
};

export default OnBoardScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	logoImage: {
		width: 250,
		height: 250,
		borderRadius: 125,
	},
	welcomeText: {
		fontFamily: fonts.I_400,
		letterSpacing: 1.5,
		color: 'white',
		fontSize: 30
	}
});