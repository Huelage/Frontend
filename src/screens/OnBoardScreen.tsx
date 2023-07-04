import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fonts } from '../utils/fontEnum';

const OnBoardScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logoImage} source={require('../../assets/images/onboardLogo.png')} />
            <Text style={styles.welcomeText}>OnBoardScreen</Text>
        </View>
    );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: "#4CAF50",
        flex: 1,
        justifyContent: 'center'
    },
    logoImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
    },
    welcomeText: {
        fontFamily: fonts.C_400,
        letterSpacing: 1.5,
        color: 'white',
        fontSize: 30
    }
});