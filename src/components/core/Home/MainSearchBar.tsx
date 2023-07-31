import { Ionicons } from '@expo/vector-icons';
import { fonts } from '@utils';
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

const MainSearchBar = () => {
  return (
    <View style={styles.homeSearchBox}>
      <Ionicons name="search" size={24} color="#29A40A" />
      <TextInput
        style={styles.homeSearchInput}
        placeholder='Search dishes...'
        placeholderTextColor="#626262"
      />
      <View style={styles.homeSearchBoxFilter}>
        <Image style={styles.homeSearchBoxFilterIcon} source={require('@icons/home-group.png')} />
      </View>
    </View>
  );
};

export default MainSearchBar;

const styles = StyleSheet.create({
  homeSearchBox: {
    alignItems: 'center',
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    height: 44,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  homeSearchBoxFilter: {
    alignItems: 'center',
    backgroundColor: "#29A40A",
    borderRadius: 5,
    height: 30,
    justifyContent: 'center',
    width: 30
  },
  homeSearchBoxFilterIcon: {
    height: 18,
    width: 18
  },
  homeSearchButton: {
    alignItems: 'center',
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  homeSearchInput: {
    color: 'rgba(0, 0, 0, .7)',
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 14,
    height: 30
  },
  homeSearchText: {
    color: "#4CAF50",
    fontFamily: fonts.I_700,
    fontSize: 18
  },
});