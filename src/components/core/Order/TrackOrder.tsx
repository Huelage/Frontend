import { CustomBox } from '@components/misc';
import { FontAwesome } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { OrderInterface } from '@interfaces';
import { OrderDelivered, OrderEnRoute, OrderPreparing, OrderReady, OrderReceived, fonts, outline } from '@utils';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TrackItem from './TrackItem';

interface TrackOrderInterface {
  order: OrderInterface;
}

const trackItems = [
  { title: "Order received", desc: "Waiting for restaurant to confirm your order", Icon: OrderReceived },
  { title: "Preparing your order", desc: "Your meal is being prepared", Icon: OrderPreparing },
  { title: "Order ready", desc: "Your meal is ready and being picked up by the rider", Icon: OrderReady },
  { title: "Order en route", desc: "Your meal is on its way", Icon: OrderEnRoute },
  { title: "Order delivered", desc: "Your meal is here and can be picked up from the rider", Icon: OrderDelivered }
];

const TrackOrder = ({ order: { status, id, orderedAt, updatedAt } }: TrackOrderInterface) => {
  const { color } = useAppTheme();
  const progress = useSharedValue(0);
  const [showTrackBox, setShowTrackBox] = useState<boolean>(false);
  const [trackHeight, setTrackHeight] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const animatedTrackBox = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [0, trackHeight + 220])
  }));
  const animatedIcon = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` }]
  }));
  const handleOnLayout = useCallback((e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setTrackHeight(height * .9);
  }, []);

  useEffect(() => {
    progress.value = withTiming(showTrackBox ? 1 : 0, { duration: 500 });
  }, [showTrackBox]);
  return (
    <View style={styles.container} testID='track order'>
      <TouchableOpacity onPress={() => setShowTrackBox(!showTrackBox)} style={styles.toggleBox} testID='toggle box'>
        <CustomBox width={150} height={65} r={10} pad={6} />
        <Text style={[styles.toggleText, { color: color.mainText }]}>Track order</Text>
        <Animated.View style={animatedIcon}>
          <FontAwesome name="angle-up" size={22} color={color.mainText} />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.trackBox, animatedTrackBox]} testID='track box'>
        <CustomBox bgColor={color.cardBg2} width={wp('100%') - 33} height={trackHeight + 220} r={10} pad={6} />
        <View style={[styles.trackHeader, { borderColor: color.mainGreen }]}>
          <View style={styles.orderInfo}>
            <Text style={[styles.orderId, { color: color.mainText }]}>Order ID: {id}</Text>
            <Text style={[styles.statusBox, { color: color.mainGreen, borderColor: color.mainGreen }]}>{status}</Text>
          </View>
          <View style={styles.orderTimeInfo}>
            <Text style={[styles.orderTime, { color: color.mainText }]}>Order Date: {dayjs(orderedAt).format('D MMM, YYYY | hh:mma')}</Text>
            <Text style={[styles.orderEstimate, { color: color.mainGreen }]}>Estimated delivery: {dayjs(orderedAt).add(1, 'h').format('D MMM, YYYY | hh:mma')}</Text>
          </View>
        </View>
        <View>
          <FlatList
            contentContainerStyle={styles.trackItemList}
            data={trackItems}
            keyExtractor={item => item.title}
            scrollEnabled={false}
            ref={flatListRef}
            onLayout={handleOnLayout}
            renderItem={({ item }) => (
              <TrackItem {...item} status={status} updatedAt={updatedAt} />
            )}
            testID='track item list'
          />
          <View style={[styles.trackLine, { borderColor: color.mainGreen, height: trackHeight }]} testID='track line' />
        </View>
      </Animated.View>
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 20
  },
  toggleBox: {
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: 10,
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: 150
  },
  toggleText: {
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  trackBox: {
    gap: 20,
    overflow: 'hidden',
    paddingHorizontal: 20
  },
  trackHeader: {
    borderBottomWidth: 1,
    gap: 10,
    paddingBottom: 20,
    paddingTop: 30
  },
  orderInfo: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between"
  },
  orderId: {
    fontFamily: fonts.I_700,
    fontSize: 19,
    letterSpacing: .7
  },
  statusBox: {
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: fonts.I_400,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  orderTimeInfo: {
    gap: 5
  },
  orderTime: {
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  orderEstimate: {
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  trackItemList: {
    gap: 35
  },
  trackLine: {
    borderLeftWidth: 2,
    left: 16,
    position: "absolute",
    zIndex: -1
  }
});