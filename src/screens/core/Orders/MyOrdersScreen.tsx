import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MyOrdersScreen = () => {
  return (
    <View style={styles.container} testID='my orders screen'>
      <Text>MyOrdersScreen</Text>
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});