import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fonts, shadowStyle } from '@utils';
import { useAppTheme } from '@hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OverviewBoxProps {
  totals: { name: string, amount: number; }[];
  checkout: () => void;
}

const OverviewBox = ({ totals, checkout }: OverviewBoxProps) => {
  const insets = useSafeAreaInsets();
  const { color } = useAppTheme();
  return (
    <View style={[styles.overviewBox, { backgroundColor: color.cardBg, paddingBottom: insets.bottom }]} testID='overview box'>
      <View style={styles.overviewList}>
        {totals.map((total, idx) => (
          <View key={idx} style={[styles.overviewItem, idx !== 2 && styles.overviewItemSeperator]}>
            <Text style={[idx === 2 ? styles.overviewMainText : styles.overviewSubText, { color: color.mainText }]}>{total.name}</Text>
            <Text style={[idx === 2 ? styles.overviewMainAmount : styles.overviewSubAmount, { color: idx === 2 ? color.mainText : "#626262" }]}>₦ {total.amount}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={checkout} style={[styles.overviewButton, { backgroundColor: color.mainGreen }]}>
        <Text style={styles.overviewButtonText} testID='checkout button'>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OverviewBox;

const styles = StyleSheet.create({
  overviewBox: {
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 30
  },
  overviewList: {
    gap: 10,
    width: "100%"
  },
  overviewItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  overviewItemSeperator: {
    borderBottomWidth: 1,
    borderColor: "#BCB5B5",
  },
  overviewSubText: {
    fontFamily: fonts.I_500,
    fontSize: 17
  },
  overviewSubAmount: {
    color: "#626262",
    fontFamily: fonts.I_600,
    fontSize: 16
  },
  overviewMainText: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  overviewMainAmount: {
    fontFamily: fonts.I_600,
    fontSize: 18
  },
  overviewButton: {
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: wp("80%"),
    ...shadowStyle
  },
  overviewButtonText: {
    color: "white",
    fontFamily: fonts.I_600,
    fontSize: 18
  }
});