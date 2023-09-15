import { OrderOverview, OrderSummary, ReviewList } from '@containers/Vendor';
import { useAppTheme } from '@hooks';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  const { color } = useAppTheme();
  return (
    <View style={{ backgroundColor: color.mainBg }} testID='vendor home screen'>
      <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
        <View style={styles.container}>
          <OrderOverview />
          <OrderSummary />
          <ReviewList />
        </View>
      </ScrollView>
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