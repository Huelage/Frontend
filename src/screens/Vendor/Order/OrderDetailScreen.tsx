import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getOrderItemRenderType, setOrderItemRenderGrid } from "@api/slices/globalSlice";
import { ScreenHeader } from "@components/misc";
import { OrderItemElement } from "@components/vendor/Orders";
import { Entypo } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { VendorOrdersTabOrderDetailRouteProps, VendorOrdersTabProps } from "@interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fonts, numberToCurrency } from "@utils";
import dayjs from "dayjs";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OrderDetailScreen = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<VendorOrdersTabProps>();
  const { params: { order: { id, status, totalAmount, updatedAt, orderItems } } } = useRoute<VendorOrdersTabOrderDetailRouteProps>();
  const isGrid = useAppSelector(getOrderItemRenderType);
  const dispatch = useAppDispatch();

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="vendor order detail screen">
      <ScreenHeader title="Order Detail" goBack={goBack} />
      <View style={styles.mainBox}>
        <View style={[styles.mainHeader, { borderColor: color.mainTextDim }]} testID="main header box">
          <View style={styles.mainHeaderFlex}>
            <Text style={[styles.headerStatusText, { color: color.mainText }]}>Order {status}</Text>
            <Text style={[styles.headerPriceText, { color: color.mainText }]}>{numberToCurrency(totalAmount)}</Text>
          </View>
          <View style={styles.mainHeaderFlex}>
            <Text style={[styles.headerDateText, { color: color.mainTextDim }]}>{dayjs(updatedAt).format("D MMM, YYYY | hh:mma")}</Text>
          </View>
          <View style={[styles.headerIdBox, { backgroundColor: color.cardBg, borderColor: color.mainGreen }]}>
            <Text style={[styles.headerIdText, { color: color.mainText }]}>Order #{id.split("-")[0].toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.itemsHeader} testID="order items header box">
          <Text style={[styles.itemsHeaderText, { color: color.mainText }]}>Order Items</Text>
          <TouchableOpacity onPress={() => dispatch(setOrderItemRenderGrid(!isGrid))} testID="toggle order item render type">
            <Entypo name={isGrid ? "list" : "grid"} size={26} color={color.mainText} />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.orderItemsList}
          data={orderItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <OrderItemElement {...item} />
          )}
          showsVerticalScrollIndicator={false}
          testID="order items list"
        />
        <View style={styles.actionButtons} testID="action buttons">
          <TouchableOpacity style={styles.buttonBase}>
            <View style={[styles.buttonIcon, { borderColor: color.mainGreen }]}>
              <Entypo name="check" size={30} color={color.mainGreen} />
            </View>
            <Text style={[styles.buttonText, { color: color.mainText }]}>Accept Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBase}>
            <View style={[styles.buttonIcon, { borderColor: color.danger }]}>
              <Entypo name="cross" size={30} color={color.danger} />
            </View>
            <Text style={[styles.buttonText, { color: color.mainText }]}>Reject Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainBox: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  mainHeader: {
    borderBottomWidth: 1,
    gap: 5,
    paddingBottom: 15
  },
  mainHeaderFlex: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between"
  },
  headerStatusText: {
    fontFamily: fonts.I_700,
    fontSize: 20,
    textTransform: "capitalize"
  },
  headerPriceText: {
    fontFamily: fonts.I_700,
    fontSize: 18
  },
  headerDateText: {
  },
  headerIdBox: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  headerIdText: {
    fontFamily: fonts.I_600,
    fontSize: 15
  },
  itemsHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 10
  },
  itemsHeaderText: {
    fontFamily: fonts.I_600,
    fontSize: 16
  },
  orderItemsList: {
    gap: 10,
    paddingBottom: 20
  },
  actionButtons: {
    flexDirection: "row",
    gap: 20
  },
  buttonBase: {
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    padding: 10
  },
  buttonText: {
    fontFamily: fonts.I_600,
    fontSize: 16
  },
  buttonIcon: {
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: "center",
    padding: 5
  }
});