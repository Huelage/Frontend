import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { fonts } from '../../utils/fontEnum';

const TabHeader = ({ navigation, route, options }: BottomTabHeaderProps) => {
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image style={styles.headerImage} source={require('../../../assets/images/beejay_dp.png')} />
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Hi, Beejay</Text>
          <Feather name="menu" size={32} color="black" />
        </View>
      </View>
    </>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: "row",
    gap: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: hp("8%"),
    paddingBottom: 10
  },
  headerBox: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  headerText: {
    fontFamily: fonts.O_700,
    fontSize: 22
  }
});