import { GET_USER_ORDERS } from "@api/graphql";
import { useQuery } from "@apollo/client";
import { SubmitButton } from "@components/auth";
import { OrderLoader } from "@components/loaders";
import { CustomFilterBox } from "@components/misc";
import { OrderSummaryElement } from "@containers/User";
import { useAppTheme } from "@hooks";
import { FilterGroup, OrderInterface, UserOrdersTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, getDateDiff, getStatus } from "@utils";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

const OrderScreen = () => {
  const { color } = useAppTheme();
  const { navigate } = useNavigation<UserOrdersTabProps>();
  const { data, loading } = useQuery(GET_USER_ORDERS);
  const [orderItems, setOrderItems] = useState<OrderInterface[]>([]);
  const [filteredOrder, setFilteredOrder] = useState<OrderInterface[]>([]);
  const [filterByStatus, setFilterByStatus] = useState<string[]>([]);
  const [filterByDate, setFilterByDate] = useState<string>("");
  const orderNow = () => navigate("Vendors", { screen: "Main" });

  const sortedOrders = useMemo(() => (
    [...orderItems].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  ), [orderItems]);
  const filterStatus = useCallback((checked: boolean, status: string) => {
    if (checked) setFilterByStatus(prev => [...prev, status]);
    else setFilterByStatus(prev => prev.filter(item => item !== status));
  }, []);
  const filterDate = useCallback((date: string) => setFilterByDate(prev => prev === date ? "" : date), []);
  const filterItems: FilterGroup[] = useMemo(() => [
    {
      id: "status", label: "Status", type: "MULTIPLE", items: [
        { id: "1", groupId: "status", name: "Pending", onPress: checked => filterStatus(checked, "Pending") },
        { id: "2", groupId: "status", name: "Completed", onPress: checked => filterStatus(checked, "Completed") },
        { id: "3", groupId: "status", name: "Cancelled", onPress: checked => filterStatus(checked, "Cancelled") }
      ]
    },
    {
      id: "date", label: "Order date", type: "SINGLE", items: [
        { id: "4", groupId: "date", name: "Today", onPress: () => filterDate("Today") },
        { id: "5", groupId: "date", name: "Yesterday", onPress: () => filterDate("Yesterday") },
        { id: "6", groupId: "date", name: "Last week", onPress: () => filterDate("Last week") },
        { id: "7", groupId: "date", name: "Last month", onPress: () => filterDate("Last month") }
      ]
    }
  ], []);

  useEffect(() => {
    const newFiltered = sortedOrders.filter(order =>
      (!filterByStatus.length || filterByStatus.includes(getStatus(order.status))) &&
      (!filterByDate || getDateDiff(filterByDate, order.orderedAt))
    );
    setFilteredOrder(newFiltered);
  }, [filterByDate, filterByStatus, sortedOrders]);
  useEffect(() => {
    if (data) {
      const orders = data.findUserOrders;
      const formattedOrders: OrderInterface[] = orders.map((order: any) => ({
        id: order.orderId, vendorName: order.vendor.businessName, totalAmount: order.totalAmount,
        status: order.status, deliveryAddress: order.deliveryAddress, paymentStatus: order.paymentStatus,
        vendorAddress: order.vendor.businessAddress, estimatedDeliveryTime: order.estimatedDeliveryTime,
        subTotal: order.subtotal, deliveryFee: order.deliveryFee, paymentBreakdown: order.paymentBreakdown,
        orderedAt: order.orderedAt, updatedAt: order.updatedAt,
        orderItems: order.orderItems.map((item: any) => ({
          id: item.itemId, vendorId: order.vendor.vendorId,
          item_id: item.product.productId, item_name: item.product.name,
          quantity: item.quantity, portion: item.portion, price: item.price,
          size: item.size, totalPrice: item.totalPrice, extras: item.extras.map((extra: any) => ({
            name: extra.name, price: extra.price, quantity: extra.quantity ?? 1
          }))
        }))
      }));
      setOrderItems(formattedOrders);
    }
  }, [data]);
  return (
    <View style={[styles.container, { backgroundColor: color.mainBg }]} testID="order screen">
      {loading ? <OrderLoader /> : !orderItems.length ? (
        <View style={styles.noOrdersBox}>
          <Image source={require("@images/myorderscreen.png")} testID="order empty image" />
          <Text style={[styles.noOrdersBoxText, { color: color.accentText }]}>You haven't made any order with Huelage</Text>
          <SubmitButton label="Order Now" onSubmit={orderNow} />
        </View>
      ) : (
        <View style={styles.ordersBox}>
          <View style={styles.subHeader} testID="order box header">
            <Text style={[styles.subHeaderText, { color: color.mainText }]}>You have made {orderItems.length} orders in total</Text>
            <CustomFilterBox defaultFilter="Status" filterItems={filterItems} />
          </View>
          <Animated.FlatList
            contentContainerStyle={styles.statusList}
            data={filteredOrder}
            showsVerticalScrollIndicator={false}
            itemLayoutAnimation={Layout.springify().damping(15).delay(350)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigate("OrderDetail", { order: item })} testID="order element">
                <OrderSummaryElement {...item} />
              </TouchableOpacity>
            )}
            testID="order summary elements list"
          />
        </View>
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  noOrdersBox: {
    gap: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  noOrdersBoxText: {
    fontFamily: fonts.I_600I,
    fontSize: 16,
    paddingBottom: 30
  },
  ordersBox: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    width: "100%"
  },
  subHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    zIndex: 2
  },
  subHeaderText: {
    fontFamily: fonts.I_600I,
    fontSize: 16,
    opacity: 0.7
  },
  statusList: {
    gap: 15,
    paddingBottom: 20
  }
});