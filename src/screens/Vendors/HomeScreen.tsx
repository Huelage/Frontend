import { OrderOverview, OrderSummary } from '@containers/Vendor';
import { useAppTheme } from '@hooks';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  const { color } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: color.mainBg }]}>
      <OrderOverview />
      <OrderSummary />

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    padding: 20
  }
});