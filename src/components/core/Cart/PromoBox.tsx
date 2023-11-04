import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts, shadowStyle } from "@utils";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface PromoBoxInterface {
  handleApply: (val: string) => void;
};

const PromoBox = ({ handleApply }: PromoBoxInterface) => {
  const [code, setCode] = useState<string>("");
  const { color } = useAppTheme();
  return (
    <View testID="promo box" style={[styles.promoBox, { backgroundColor: color.cardBg }]}>
      <MaterialCommunityIcons name="ticket-percent-outline" size={26} color={color.searchText} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.promoInput, { color: color.searchText }]}
        placeholder="Promo Code"
        testID="promo input"
        onChangeText={setCode}
        onSubmitEditing={() => handleApply(code)}
        selectionColor={color.mainGreen}
        placeholderTextColor={color.searchText}
      />
      <TouchableOpacity onPress={() => handleApply(code)} style={[styles.promoButton, { backgroundColor: color.mainGreen }]}>
        <Text style={styles.promoButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PromoBox;

const styles = StyleSheet.create({
  promoBox: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginHorizontal: 20,
    padding: 10,
    paddingLeft: 15
  },
  promoInput: {
    flex: 1,
    fontFamily: fonts.I_600,
    fontSize: 15,
    height: 40,
    letterSpacing: .8
  },
  promoButton: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...shadowStyle
  },
  promoButtonText: {
    color: "white",
    fontFamily: fonts.I_600,
    fontSize: 16
  },
});