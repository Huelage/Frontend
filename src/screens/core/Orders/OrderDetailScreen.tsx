import { mockOrderItems } from '@api/mock';
import { OverviewBox } from '@components/core/Cart';
import { OrderDetailDelivery, TrackOrder } from '@components/core/Order';
import { OrderDetailItem } from '@containers/User';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { UserOrdersTabOrderDetailRouteProps, UserOrdersTabProps } from '@interfaces';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { fonts, getStatus, orderStatRank } from '@utils';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const totals = [
  { name: 'Subtotal', amount: 7800 },
  { name: 'Delivery', amount: 1000 },
  { name: 'Total', amount: 8800 }
];
const paymentMethod = [
  { name: "cash", amount: 8000 },
  { name: "huenit wallet", amount: 800 }
];

const OrderDetailScreen = () => {
  const { params: { orderId } } = useRoute<UserOrdersTabOrderDetailRouteProps>();
  const order = mockOrderItems.find(order => order.id === orderId);
  if (!order) return null;
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const canCancel = orderStatRank[order.status] >= 1;
  const { goBack } = useNavigation<UserOrdersTabProps>();
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="order detail screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]} testID='header box'>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Order Summary</Text>
      </View>
      <ScrollView>
        <View style={styles.order}>
          <View style={styles.orderHeader} testID='order header box'>
            <View style={styles.orderHeaderMain}>
              <Image source={require("@icons/orderChef.png")} />
              <Text style={[styles.orderHeaderMainText, { color: color.mainText }]}>Your order</Text>
            </View>
            <Text style={[styles.orderHeaderText, { color: color.mainTextDim }]}>You have {order.items.length} item{order.items.length === 1 ? "" : "s"} from {order.name}</Text>
          </View>
          <FlatList
            contentContainerStyle={styles.detailItemList}
            data={order.items}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <OrderDetailItem {...item} />
            )}
            testID='order detail item list'
          />
          <OrderDetailDelivery fromAddress={order.vendorAddress} toAddress={order.deliveryAddress} />
          {getStatus(order.status) === "Pending" ? (
            <>
              <TrackOrder order={order} />
              {orderStatRank[order.status] >= 3 ? (
                <TouchableOpacity style={[styles.actionButton, { borderColor: color.mainGreen }]} testID='call rider button'>
                  <Text style={[styles.actionButtonText, { color: color.mainText }]}>Call Rider</Text>
                  <Feather name="phone-call" size={24} color={color.mainGreen} />
                </TouchableOpacity>
              ) : !canCancel ? (
                <TouchableOpacity style={[styles.actionButton, { borderColor: color.danger }]} testID='cancel order button'>
                  <Text style={[styles.actionButtonText, { color: color.danger }]}>Cancel Order</Text>
                  <MaterialIcons name="cancel" size={24} color={color.danger} />
                </TouchableOpacity>
              ) : null}
            </>
          ) : null}
          <OverviewBox totals={totals} paymentMethod={paymentMethod} />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerBox: {
    alignItems: "center",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 10
  },
  backButton: {
    position: "absolute",
    top: -5,
    left: 10
  },
  headerText: {
    fontFamily: fonts.I_500,
    fontSize: 20
  },
  order: {
    gap: 30,
    paddingTop: 20
  },
  orderHeader: {
    paddingHorizontal: 30,
  },
  orderHeaderMain: {
    alignItems: "flex-end",
    flexDirection: "row"
  },
  orderHeaderMainText: {
    fontFamily: fonts.I_700,
    fontSize: 22,
    paddingBottom: 10
  },
  orderHeaderText: {
    fontFamily: fonts.I_600I,
    fontSize: 16
  },
  detailItemList: {
    gap: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  actionButton: {
    alignItems: "center",
    alignSelf: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 15,
    width: "100%"
  },
  actionButtonText: {
    fontFamily: fonts.I_700,
    fontSize: 16
  }
});