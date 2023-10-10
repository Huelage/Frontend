import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '@hooks';
import { Feather } from '@expo/vector-icons';
import { fonts } from '@utils';
import { LocationInterface } from '@interfaces';

interface LocationElementInterface {
  location: LocationInterface;
  removeLocation: (id: string) => void;
}

const LocationElement = ({ location: { name, id }, removeLocation }: LocationElementInterface) => {
  const { color } = useAppTheme();
  return (
    <View style={[styles.container, { borderColor: color.mainGreen }]} testID='location element'>
      <Text style={[styles.location, { color: color.mainText }]}>{name}</Text>
      <TouchableOpacity onPress={() => removeLocation(id)} testID='remove button'>
        <Feather name="trash-2" size={24} color="rgba(233, 50, 35, .6)" />
      </TouchableOpacity>
    </View>
  );
};

export default LocationElement;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 2,
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-between',
    paddingBottom: 25,
    paddingRight: 10,
    paddingTop: 10
  },
  location: {
    fontFamily: fonts.I_400,
    fontSize: 16,
    flex: 1
  }
});