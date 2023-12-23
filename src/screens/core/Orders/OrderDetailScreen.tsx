import { OverviewBox } from "@components/core/Cart";
import { OrderDetailDelivery, TrackOrder } from "@components/core/Order";
import { ScreenHeader } from "@components/misc";
import { OrderDetailItem } from "@containers/User";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserOrdersTabOrderDetailRouteProps, UserOrdersTabProps } from "@interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fonts, getStatus, orderStatRank } from "@utils";
import React, { useMemo } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OrderDetailScreen = () => {
  const { params: { order } } = useRoute<UserOrdersTabOrderDetailRouteProps>();
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<UserOrdersTabProps>();

  const canCancel = orderStatRank[order.status] >= 1;
  const totals = useMemo(() => ([
    { name: "Subtotal", amount: order.subTotal },
    { name: "Delivery", amount: order.deliveryFee },
    { name: "Total", amount: order.deliveryFee + order.subTotal }
  ]), []);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="order detail screen">
      <ScreenHeader title="Order Summary" goBack={goBack} />
      <ScrollView>
        <View style={styles.order}>
          <View style={styles.orderHeader} testID="order header box">
            <View style={styles.orderHeaderMain}>
              <Image source={require("@icons/orderChef.png")} />
              <Text style={[styles.orderHeaderMainText, { color: color.mainText }]}>Your order</Text>
            </View>
            <Text style={[styles.orderHeaderText, { color: color.mainTextDim }]}>You have {order.orderItems.length} item{order.orderItems.length === 1 ? "" : "s"} from {order.vendorName}</Text>
          </View>
          <FlatList
            contentContainerStyle={styles.detailItemList}
            data={order.orderItems}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <OrderDetailItem {...item} />
            )}
            testID="order detail item list"
          />
          <OrderDetailDelivery fromAddress={order.vendorAddress} toAddress={order.deliveryAddress} />
          {getStatus(order.status) === "Pending" ? (
            <>
              <TrackOrder order={order} />
              {orderStatRank[order.status] >= 3 ? (
                <TouchableOpacity style={[styles.actionButton, { borderColor: color.mainGreen }]} testID="call rider button">
                  <Text style={[styles.actionButtonText, { color: color.mainText }]}>Call Rider</Text>
                  <Feather name="phone-call" size={24} color={color.mainGreen} />
                </TouchableOpacity>
              ) : !canCancel ? (
                <TouchableOpacity style={[styles.actionButton, { borderColor: color.danger }]} testID="cancel order button">
                  <Text style={[styles.actionButtonText, { color: color.danger }]}>Cancel Order</Text>
                  <MaterialIcons name="cancel" size={24} color={color.danger} />
                </TouchableOpacity>
              ) : null}
            </>
          ) : null}
          <OverviewBox totals={totals} paymentMethod={order.paymentBreakdown} />
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
  order: {
    flex: 1,
    gap: 30,
    minHeight: "100%",
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