import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fonts } from '@utils';
import { useAppTheme } from '@hooks';

interface SummaryElementProps {
  value: number;
  label: string;
  iconColor: string;
}

const SummaryElement = ({ value, label, iconColor }: SummaryElementProps) => {
  const { color } = useAppTheme();
  return (
    <View style={styles.summaryElement} testID='summary element'>
      <Text style={[styles.summaryElementValue, { color: color.mainText }]}>{value}</Text>
      <View style={styles.summaryElementLabel}>
        <View testID='status icon' style={[styles.summaryElementLabelIcon, { backgroundColor: iconColor }]} />
        <Text style={[styles.summaryElementLabelText, { color: color.mainText }]}>{label}</Text>
      </View>
    </View>
  );
};

export default SummaryElement;

const styles = StyleSheet.create({
  summaryElement: {
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center'
  },
  summaryElementValue: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  summaryElementLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center'
  },
  summaryElementLabelIcon: {
    borderRadius: 6,
    height: 12,
    width: 12
  },
  summaryElementLabelText: {
    fontFamily: fonts.I_300,
    fontSize: 12
  }
});