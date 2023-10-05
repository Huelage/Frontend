import { FontAwesome } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { fonts } from '@utils';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const OrderBar = ({ initVal }: { initVal?: number; }) => {
  const { color } = useAppTheme();
  const progress = useSharedValue(initVal || 20);
  const animatedWidth = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));
  const animatedDisplay = useAnimatedStyle(() => ({
    display: progress.value > 50 ? "flex" : "none",
    opacity: progress.value > 75 ? 1 : 0
  }));
  const animatedOpacity = useAnimatedStyle(() => ({
    display: progress.value > 80 ? "flex" : "none",
    opacity: progress.value > 95 ? 1 : 0
  }));
  useEffect(() => {
    progress.value = withTiming(100, { duration: 1000 });
  }, []);
  return (
    <Animated.View style={[styles.container, { backgroundColor: color.mainBg }, animatedWidth]} testID='order bar'>
      <View style={[styles.orderNoBox, { backgroundColor: color.mainGreen }]}>
        <Text testID='new orders' style={styles.orderNo}>{"30".padStart(2, "0")}</Text>
      </View>
      <Animated.Text testID='order type' style={[styles.orderType, animatedDisplay, { color: color.mainText }]}>New Orders</Animated.Text>
      <View style={styles.orderAction}>
        <Animated.Text testID='order cta' style={[styles.orderActionText, animatedOpacity, { color: color.mainText }]}>Manage Orders</Animated.Text>
        <TouchableOpacity testID='to orders' style={styles.orderActionButton}>
          <FontAwesome name="angle-right" size={16} color={color.mainText} style={{ left: 1 }} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default OrderBar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-between',
    padding: 5
  },
  orderNoBox: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
    // height: 35,
    justifyContent: 'center',
    // width: 35
  },
  orderNo: {
    color: '#fff',
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  orderType: {
    flex: 1,
    fontFamily: fonts.I_600,
    fontSize: 14
  },
  orderAction: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center'
  },
  orderActionButton: {
    alignItems: 'center',
    borderColor: "#BCB5B5",
    borderRadius: 13,
    borderWidth: 1,
    height: 25,
    justifyContent: 'center',
    width: 25
  },
  orderActionText: {
    fontFamily: fonts.I_400,
    fontSize: 12
  }
});