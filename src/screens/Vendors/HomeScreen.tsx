import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '@hooks';
import { OrderOverview } from '@components/vendor/Home';

const HomeScreen = () => {
  const { color } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: color.mainBg }]}>
      <OrderOverview />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 20
  }
});