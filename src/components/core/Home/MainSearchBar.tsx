import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { fonts } from '@utils';
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

const MainSearchBar = () => {
  const { color } = useAppTheme();
  return (
    <View style={[styles.homeSearchBox, { backgroundColor: color.searchBg }]}>
      <Ionicons name="search" size={24} color="#29A40A" />
      <TextInput
        style={[styles.homeSearchInput, { color: color.searchText }]}
        placeholder='Search dishes...'
        placeholderTextColor={color.searchText}
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
  homeSearchInput: {
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 14,
    height: 30
  }
});