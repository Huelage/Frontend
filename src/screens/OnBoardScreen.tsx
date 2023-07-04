import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fonts } from '../utils/fontEnum';

const OnBoardScreen = () => {
    return (
        <View style={styles.container}>
            <Text>OnBoardScreen</Text>
        </View>
    );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: "#4CAF50",
        flex: 1,
        fontFamily: fonts.I_500,
        justifyContent: 'center'
    }
});