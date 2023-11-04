import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { FilterGroup, FilterItem } from "@interfaces";
import { fonts } from "@utils";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomBox from "./CustomBox";
import CustomPopupModal from "./CustomPopupModal";

interface CustomFilterBoxInterface {
  filterItems: FilterGroup[];
  defaultFilter: string;
}

const CustomFilterBox = ({ filterItems, defaultFilter }: CustomFilterBoxInterface) => {
  const { color } = useAppTheme();
  const [currentGroup, setCurrentGroup] = useState<string>(defaultFilter);
  const [currentGroupItems, setCurrentGroupItems] = useState<FilterItem[]>([]);
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<{ group: string, id: string; }[]>([]);

  const groups = useMemo(() => filterItems.map(item => item.label), [filterItems]);
  const groupTypeMapping = useMemo(() => {
    const mapping: Record<string, string> = {};
    filterItems.forEach(item => mapping[item.label] = item.type);
    return mapping;
  }, [filterItems]);

  const isChecked = useCallback((itemId: string) => !!checkedItems.find(check => check.id === itemId), [checkedItems]);
  const handleCheck = useCallback((item: FilterItem) => {
    if (isChecked(item.id)) {
      setCheckedItems(checkedItems.filter(check => check.id !== item.id));
      item.onPress(false);
    } else {
      let newCheckedItems: { group: string, id: string; }[] = checkedItems;
      if (groupTypeMapping[currentGroup] === "SINGLE")
        newCheckedItems = checkedItems.filter(check => check.group != item.groupId);
      setCheckedItems([...newCheckedItems, { id: item.id, group: item.groupId }]);
      item.onPress(true);
    }
  }, [groupTypeMapping, checkedItems, currentGroup]);

  useEffect(() => {
    setCurrentGroupItems(filterItems.find(item => item.label === currentGroup)?.items || []);
  }, [currentGroup]);
  return (
    <View testID="custom filter box">
      <TouchableOpacity style={styles.container} onPress={() => setIsFilterBoxVisible(!isFilterBoxVisible)} testID="toggle filter box">
        <CustomBox bgColor={color.cardBg2} height={50} r={50} pad={6} width={120} left={-6} />
        <Text style={[styles.titleText, { color: color.mainText }]}>Filter by</Text>
        <FontAwesome name="angle-down" size={18} color={color.mainText} />
      </TouchableOpacity>
      <CustomPopupModal setShowModal={setIsFilterBoxVisible} showModal={isFilterBoxVisible}>
        <View style={styles.filterBox}>
          <FlatList
            data={groups}
            horizontal
            contentContainerStyle={styles.filterHeader}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setCurrentGroup(item)} style={[styles.filterHeaderButton, { borderColor: item === currentGroup ? color.mainGreen : "transparent" }]} testID="filter header item">
                <Text style={[styles.filterHeaderText, { color: item === currentGroup ? color.mainGreen : color.mainText }]}>{item}</Text>
              </TouchableOpacity>
            )}
            testID="filter header list"
          />
          <FlatList
            data={currentGroupItems}
            ItemSeparatorComponent={() => <View style={styles.filterItemSeperator} />}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCheck(item)} testID="filter item">
                <View style={styles.filterItem}>
                  <Text style={[styles.filterItemText, { color: isChecked(item.id) ? color.mainGreen : color.mainText }]}>{item.name}</Text>
                  {isChecked(item.id) ? <Ionicons name="checkmark" size={24} color={color.mainGreen} testID={`${item.name} checkmark`} /> : null}
                </View>
              </TouchableOpacity>
            )}
            testID="filter items list"
          />
        </View>
      </CustomPopupModal>
    </View>
  );
};

export default CustomFilterBox;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    width: 110
  },
  titleText: {
    fontFamily: fonts.I_600,
    fontSize: 14
  },
  filterBox: {
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    width: wp("100%")
  },
  filterHeader: {
    alignItems: "center",
    borderColor: "#BCB5B5",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
    width: "100%"
  },
  filterHeaderButton: {
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  filterHeaderText: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "capitalize"
  },
  filterItem: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    height: 45,
    width: wp("100%") - 60,
  },
  filterItemSeperator: {
    height: 1,
    backgroundColor: "#BCB5B5"
  },
  filterItemText: {
    fontFamily: fonts.I_400
  }
});