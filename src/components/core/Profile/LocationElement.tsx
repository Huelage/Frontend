import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { LocationInterface } from '@interfaces';
import { fonts } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, SlideOutLeft } from 'react-native-reanimated';

interface LocationElementInterface {
  location: LocationInterface;
  initialMode: React.MutableRefObject<boolean>;
  idx: number;
  removeLocation: (id: string) => void;
}

const LocationElement = ({ location: { name, locationId }, initialMode, idx, removeLocation }: LocationElementInterface) => {
  const { color } = useAppTheme();
  return (
    <Animated.View
      entering={FadeInUp.delay(initialMode.current ? 100 * idx + 100 : 0)}
      exiting={SlideOutLeft.duration(100)}
      style={[styles.container, { borderColor: color.mainGreen }]}
      testID="location element"
    >
      <Text style={[styles.location, { color: color.mainText }]}>{name}</Text>
      <TouchableOpacity onPress={() => removeLocation(locationId)} testID={`remove button ${locationId}`}>
        <Feather name="trash-2" size={24} color={color.danger} />
      </TouchableOpacity>
    </Animated.View>
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