import { useAppTheme } from '@hooks';
import { fonts } from '@utils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

interface OrderDetailDeliveryInterface {
  fromAddress: string;
  toAddress: string;
}

const OrderDetailDelivery = ({ fromAddress, toAddress }: OrderDetailDeliveryInterface) => {
  const { color } = useAppTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.elementHeader, { color: color.mainText }]}>Delivery details</Text>
      <View style={styles.elementBody}>
        <View style={styles.element}>
          <Text style={styles.elementIcon}>📍</Text>
          <Text style={[styles.elementText, { color: color.mainTextDim }]}>{fromAddress}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.elementIcon}>📪</Text>
          <Text style={[styles.elementText, { color: color.mainTextDim }]}>{toAddress}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailDelivery;

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingHorizontal: 20,
    width: widthPercentageToDP('100%') - 40
  },
  elementHeader: {
    fontFamily: fonts.I_700,
    fontSize: 22
  },
  elementBody: {
    gap: 5
  },
  element: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  elementIcon: {
    fontSize: 30
  },
  elementText: {
    fontFamily: fonts.I_400,
    fontSize: 16
  }
});