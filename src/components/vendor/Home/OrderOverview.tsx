import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '@hooks';
import { Svg, Path } from 'react-native-svg';

const OrderOverview = () => {
  const { color } = useAppTheme();
  return (
    <View style={styles.container}>
      <View style={styles.statElement}>
        <View style={styles.statBox}>
          <Text style={[styles.statBoxText, { color: color.mainText }]}>600</Text>
        </View>
        <Text style={[styles.title, { color: color.mainText }]}>Order Overview</Text>
      </View>
    </View>
  );
};

export default OrderOverview;

const styles = StyleSheet.create({
  container: {

  },
  statBox: {

  },
  statBoxText: {

  },
  statElement: {

  },
  title: {

  }
});