import { useAppTheme } from "@hooks";
import { OrderStatus } from "@interfaces";
import { fonts, orderStatRank } from "@utils";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface TrackItemInterface {
  title: string;
  desc: string;
  updatedAt: string;
  Icon: React.FC<{ size: number, color: string; }>;
  status: OrderStatus;
}
const titleStatusMap: Record<string, OrderStatus> = { "Order received": "PENDING", "Preparing your order": "PREPARING", "Order ready": "READY", "Order en route": "EN_ROUTE", "Order delivered": "DELIVERED" };

const TrackItem = ({ title, desc, updatedAt, Icon, status }: TrackItemInterface) => {
  const { color } = useAppTheme();
  const isChecked = useMemo(() => (orderStatRank[titleStatusMap[title]] <= orderStatRank[status]), [status]);
  return (
    <View style={styles.container} testID="track item">
      <View style={[styles.itemIconBox, { backgroundColor: isChecked ? color.mainGreen : color.cardBg2, borderColor: isChecked ? "#FFF" : "#BCB5B5" }]} testID="item icon">
        <Icon size={22} color={isChecked ? "#FFF" : "#BCB5B5"} />
      </View>
      <View style={styles.itemBox}>
        <View style={styles.itemHeader}>
          <Text style={[styles.itemTitle, { color: isChecked ? color.mainText : color.mainTextDim }]}>{title}</Text>
          {titleStatusMap[title] === status ? <Text style={[styles.itemTime, { color: color.mainGreen }]} testID="update time">{dayjs(updatedAt).format("hh:mma")}</Text> : null}
        </View>
        <Text style={[styles.itemInfo, { color: isChecked ? color.mainText : color.mainTextDim }]}>{desc}</Text>
      </View>
    </View>
  );
};

export default TrackItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10
  },
  itemIconBox: {
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    height: 35,
    justifyContent: "center",
    width: 35
  },
  itemBox: {
    gap: 5,
    width: wp("100%") - 125
  },
  itemHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  itemTitle: {
    fontFamily: fonts.I_600,
    fontSize: 16
  },
  itemTime: {
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  itemInfo: {
    fontFamily: fonts.I_400I,
    fontSize: 14
  }
});