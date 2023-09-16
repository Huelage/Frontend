import { useAppDispatch, useAppSelector } from '@api/app/appHooks';
import { getVendorStatus, setVendorStatus } from '@api/slices/globalSlice';
import { useAppTheme } from '@hooks';
import { fonts } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UserVendor = () => {
  const dispatch = useAppDispatch();
  const isVendor = useAppSelector(getVendorStatus);
  const { color } = useAppTheme();
  return (
    <View style={styles.container} testID='user vendor'>
      <TouchableOpacity
        style={[styles.buttonBox, styles.box1, { borderColor: color.mainGreen }, isVendor && { backgroundColor: color.mainGreen }]}
        onPress={() => dispatch(setVendorStatus(true))}
      >
        <Text style={[styles.textStyle, { color: color.mainText }]}>Vendor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonBox, styles.box2, { borderColor: color.mainGreen }, !isVendor && { backgroundColor: color.mainGreen }]}
        onPress={() => dispatch(setVendorStatus(false))}
      >
        <Text style={[styles.textStyle, { color: color.mainText }]}>User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserVendor;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5
  },
  buttonBox: {
    alignItems: 'center',
    borderWidth: 2,
    height: 35,
    justifyContent: 'center',
    width: 90
  },
  box1: {
    borderBottomLeftRadius: 20,
    borderRightWidth: 0,
    borderTopLeftRadius: 20
  },
  box2: {
    borderBottomRightRadius: 20,
    borderLeftWidth: 0,
    borderTopRightRadius: 20
  },
  textStyle: {
    fontFamily: fonts.I_700,
    fontSize: 16
  }
});