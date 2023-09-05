import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { fonts, shadowStyle } from '@utils';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CartOverview = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const totals = [
    { name: 'Subtotal', amount: 7800 },
    { name: 'Delivery', amount: 1000 },
    { name: 'Total', amount: 8800 }
  ];
  return (
    <View style={styles.container}>
      <View style={[styles.promoBox, { backgroundColor: color.cardBg }]}>
        <MaterialCommunityIcons name="ticket-percent-outline" size={26} color={color.searchText} />
        <TextInput
          style={[styles.promoInput, { color: color.searchText }]}
          placeholder='Promo Code'
          selectionColor={color.mainGreen}
          placeholderTextColor={color.searchText}
        />
        <TouchableOpacity style={[styles.promoButton, { backgroundColor: color.mainGreen }]}>
          <Text style={styles.promoButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.overviewBox, { backgroundColor: color.cardBg, paddingBottom: insets.bottom }]}>
        <View style={styles.overviewList}>
          {totals.map((total, idx) => (
            <View key={idx} style={[styles.overviewItem, idx !== 2 && styles.overviewItemSeperator]}>
              <Text style={[idx === 2 ? styles.overviewMainText : styles.overviewSubText, { color: color.mainText }]}>{total.name}</Text>
              <Text style={[idx === 2 ? styles.overviewMainAmount : styles.overviewSubAmount, { color: idx === 2 ? color.mainText : "#626262" }]}>₦ {total.amount}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={[styles.overviewButton, { backgroundColor: color.mainGreen }]}>
          <Text style={styles.overviewButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartOverview;

const styles = StyleSheet.create({
  container: {
    gap: 20
  },
  promoBox: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 10,
    paddingLeft: 15,
  },
  promoInput: {
    flex: 1,
    fontFamily: fonts.I_600,
    fontSize: 15,
    height: 40,
    letterSpacing: .8
  },
  promoButton: {
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...shadowStyle
  },
  promoButtonText: {
    color: "white",
    fontFamily: fonts.I_600,
    fontSize: 16
  },
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