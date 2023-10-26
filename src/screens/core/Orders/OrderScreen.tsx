import { mockOrderItems } from '@api/mock';
import { SubmitButton } from '@components/auth';
import { CustomFilterBox } from '@components/misc';
import { OrderSummaryElement } from '@containers/User';
import { useAppTheme } from '@hooks';
import { FilterGroup, OrderInterface, UserOrdersTabProps } from '@interfaces';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '@utils';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';

dayjs.extend(isBetween);
const getDateDiff = (category: string, date: string) => {
  const now = dayjs(), orderDate = dayjs(date);
  const today = now.startOf('day');
  const yesterday = today.subtract(1, 'day');
  const lastWeek = today.subtract(1, 'week');
  const lastMonth = today.subtract(1, 'month');
  switch (category) {
    case 'Today':
      return orderDate.isBetween(now, today);
    case 'Yesterday':
      return orderDate.isBetween(now, yesterday);
    case 'Last week':
      return orderDate.isBetween(now, lastWeek);
    case 'Last month':
      return orderDate.isBetween(now, lastMonth);
  }
};
const getStatus = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "Pending";
  }
};

interface OrderScreenInterface {
  testEmpty?: boolean;
}

const OrderScreen = ({ testEmpty }: OrderScreenInterface) => {
  const { color } = useAppTheme();
  const { navigate } = useNavigation<UserOrdersTabProps>();
  const [filteredOrder, setFilteredOrder] = useState<OrderInterface[]>([]);
  const [filterByStatus, setFilterByStatus] = useState<string[]>([]);
  const [filterByDate, setFilterByDate] = useState<string>("");
  const orderNow = () => navigate("Vendors", { screen: "Main" });

  const sortedOrders = useMemo(() => (
    [...mockOrderItems].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  ), [mockOrderItems]);
  const filterStatus = (checked: boolean, status: string) => {
    if (checked) setFilterByStatus(prev => [...prev, status]);
    else setFilterByStatus(prev => prev.filter(item => item !== status));
  };
  const filterDate = (date: string) => setFilterByDate(prev => prev === date ? "" : date);
  const filterItems: FilterGroup[] = [
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
  ];

  useEffect(() => {
    const newFiltered = sortedOrders.filter(order =>
      (!filterByStatus.length || filterByStatus.includes(getStatus(order.status))) &&
      (!filterByDate || getDateDiff(filterByDate, order.orderedAt))
    );
    setFilteredOrder(newFiltered);
  }, [filterByDate, filterByStatus, sortedOrders]);
  return (
    <View style={[styles.container, { backgroundColor: color.mainBg }]} testID='order screen'>
      {testEmpty || !mockOrderItems.length ? (
        <View style={styles.noOrdersBox}>
          <Image source={require("@images/myorderscreen.png")} testID='order empty image' />
          <Text style={[styles.noOrdersBoxText, { color: color.accentText }]}>You haven't made any order with Huelage</Text>
          <SubmitButton label='Order Now' onSubmit={orderNow} />
        </View>
      ) : (
        <View style={styles.ordersBox}>
          <View style={styles.subHeader} testID='order box header'>
            <Text style={[styles.subHeaderText, { color: color.mainText }]}>You have made {mockOrderItems.length} orders in total</Text>
            <CustomFilterBox defaultFilter='Status' filterItems={filterItems} />
          </View>
          <Animated.FlatList
            contentContainerStyle={styles.statusList}
            data={filteredOrder}
            itemLayoutAnimation={Layout.springify().damping(15).delay(150)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <OrderSummaryElement {...item} />}
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  noOrdersBox: {
    gap: 30,
    justifyContent: 'center',
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
    padding: 20,
    width: "100%"
  },
  subHeader: {
    alignItems: 'center',
    flexDirection: "row",
    gap: 20,
    justifyContent: 'space-between',
    zIndex: 2
  },
  subHeaderText: {
    fontFamily: fonts.I_600I,
    fontSize: 16,
    opacity: 0.7
  },
  statusList: {
    gap: 15
  }
});