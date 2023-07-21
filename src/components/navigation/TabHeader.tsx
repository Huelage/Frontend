import { Feather } from '@expo/vector-icons';
import { AuthNavigationProps } from '@interfaces';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { fonts } from '@utils';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TabHeader = () => {
  const { navigate } = useNavigation<AuthNavigationProps>();
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image style={styles.headerImage} source={require('@images/beejay_dp.png')} />
        <View style={styles.headerBox}>
          <View style={styles.headerTextBox}>
            <Text style={styles.headerText1}>Good morning</Text>
            <Text style={styles.headerText2}>John Jane Doe</Text>
          </View>
          <TouchableOpacity onPress={() => navigate("Cart")}>
            <Feather name="menu" size={32} color="black" />
          </TouchableOpacity>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  headerTextBox: {
    alignItems: 'flex-start',
  },
  headerText1: {
    fontFamily: fonts.I_400,
    fontSize: 15
  },
  headerText2: {
    fontFamily: fonts.I_700,
    fontSize: 20
  }
});