import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fonts } from '@utils';
import { useAppTheme } from '@hooks';

interface OverViewElementProps {
  value: number;
  label: string;
  iconColor: string;
}

const OverviewElement = ({ value, label, iconColor }: OverViewElementProps) => {
  const { color } = useAppTheme();
  return (
    <View style={styles.overviewElement}>
      <Text style={[styles.overviewElementValue, { color: color.mainText }]}>{value}</Text>
      <View style={styles.overviewElementLabel}>
        <View style={[styles.overviewElementLabelIcon, { backgroundColor: iconColor }]} />
        <Text style={[styles.overviewElementLabelText, { color: color.mainText }]}>{label}</Text>
      </View>
    </View>
  );
};

export default OverviewElement;

const styles = StyleSheet.create({
  overviewElement: {
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center'
  },
  overviewElementValue: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  overviewElementLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center'
  },
  overviewElementLabelIcon: {
    borderRadius: 6,
    height: 12,
    width: 12
  },
  overviewElementLabelText: {
    fontFamily: fonts.I_300,
    fontSize: 12
  }
});