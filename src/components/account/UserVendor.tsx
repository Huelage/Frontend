import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fontEnum';

interface UserVendorProps {
  isVendor: boolean;
  onPress: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserVendor = ({ isVendor, onPress }: UserVendorProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => !isVendor && onPress(true)}>
        <Text style={isVendor ? styles.activeTextStyle : styles.textStyle}>Vendor</Text>
        {isVendor && <View style={styles.activeUnderline} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => isVendor && onPress(false)}>
        <Text style={!isVendor ? styles.activeTextStyle : styles.textStyle}>User</Text>
        {!isVendor && <View style={styles.activeUnderline} />}
      </TouchableOpacity>
    </View>
  );
};

export default UserVendor;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    paddingVertical: 5
  },
  textStyle: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    paddingBottom: 3
  },
  activeTextStyle: {
    color: '#47CA4C',
    fontFamily: fonts.I_700,
    fontSize: 16
  },
  activeUnderline: {
    borderColor: '#47CA4C',
    borderBottomWidth: 3,
    paddingTop: 3
  }
});