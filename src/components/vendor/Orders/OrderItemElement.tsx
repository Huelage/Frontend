import { useAppSelector } from "@api/app/appHooks";
import { getOrderItemRenderType } from "@api/slices/globalSlice";
import { CustomBox } from "@components/misc";
import { useAppTheme } from "@hooks";
import { OrderItemInterface, itemExtraInterface } from "@interfaces";
import { fonts, numberToCurrency } from "@utils";
import React, { useState } from "react";
import { FlatList, LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Row, Rows, Table } from "react-native-table-component";

const itemToTable = (items: itemExtraInterface[]) => {
  return items.map(item => ([item.name, (item.quantity ?? 1), numberToCurrency(item.price * (item.quantity ?? 1))]));
};
const gridHeader = ["Name", "Quantity", "Price"];

const OrderItemElement = ({ extras, quantity, item_name, totalPrice }: OrderItemInterface) => {
  const { color } = useAppTheme();
  const isGrid = useAppSelector(getOrderItemRenderType);
  const [height, setHeight] = useState<number>(0);

  const handleOnLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  };
  return (
    <View style={[styles.container]} onLayout={handleOnLayout} testID="order item element">
      <CustomBox bgColor={color.cardBg2} height={height + 10} pad={6} r={20} width={wp("100%") - 36} />
      <View style={styles.headerBox} testID="header box">
        <Text style={[styles.headerText, { color: color.mainText }]} testID="order item quantity">x{quantity}</Text>
        <Text style={[styles.headerText, { color: color.mainText, flex: 1 }]} testID="order item name">{item_name}</Text>
        <Text style={[styles.totalPrice, { color: color.mainText }]} testID="order item total">{numberToCurrency(totalPrice)}</Text>
      </View>
      {!!extras ? (
        <>
          <Text style={[styles.extraHeader, { color: color.mainText }]}>Extras: </Text>
          {isGrid ? (
            <View testID="extra items table">
              <Table>
                <Row data={gridHeader} style={{ ...styles.tableHeader, backgroundColor: color.mainGreenOpaque }} textStyle={{ ...styles.tableHeaderText, color: color.mainGreen }} />
                <Rows data={itemToTable(extras)} style={styles.tableRow} textStyle={{ ...styles.tableRowText, color: color.mainText }} />
              </Table>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={styles.orderItemList}
              data={extras}
              keyExtractor={(_, idx) => idx.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Text style={[styles.listItems, { color: color.mainText }]}>{`${item.quantity ? `${item.quantity} ` : ""}${item.name} for ${numberToCurrency(item.price * (item.quantity ?? 1))}`}</Text>
              )}
              testID="extra items list"
            />
          )}
        </>
      ) : null}
    </View>
  );
};

export default OrderItemElement;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    padding: 20
  },
  headerBox: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: fonts.I_700,
    fontSize: 20,
  },
  totalPrice: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    paddingTop: 5
  },
  extraHeader: {
    fontFamily: fonts.I_600,
    fontSize: 18
  },
  tableHeader: {
    height: 30
  },
  tableHeaderText: {
    fontFamily: fonts.I_700,
    fontSize: 15,
    textAlign: "center"
  },
  tableRow: {
    height: 25
  },
  tableRowText: {
    fontFamily: fonts.I_500,
    textAlign: "center"
  },
  orderItemList: {
    gap: 5,
    paddingBottom: 5
  },
  listItems: {
    fontFamily: fonts.I_500,
    fontSize: 15
  }
});