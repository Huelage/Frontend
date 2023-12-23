import { FAQElement } from "@components/core/Profile";
import { ScreenHeader } from "@components/misc";
import { useAppTheme } from "@hooks";
import { UserProfileTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const faqs = [
  { id: "1", question: "How do I place an order?", answer: "You can place an order by clicking on the menu icon on the top left corner of the screen. You can then select the category of food you want to order from. You can also search for a specific restaurant or food item using the search bar at the top of the screen. Once you have found the restaurant or food item you want to order, click on it to view the menu. Select the food items you want to order and click on the cart icon at the top right corner of the screen to view your cart. You can then click on the checkout button to place your order." },
  { id: "2", question: "How do I pay for my order?", answer: "You can pay for your order using your debit card, credit card or your wallet balance. You can also pay on delivery." },
  { id: "3", question: "How do I cancel my order?", answer: "You can cancel your order by clicking on the cancel button on the order details page. You can only cancel an order if it has not been accepted by the restaurant." }
];

const FAQScreen = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [currTab, setCurrTab] = useState<string>("");
  const { goBack } = useNavigation<UserProfileTabProps>();

  const toggleTab = (id: string) => setCurrTab(prev => prev === id ? "" : id);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="faq screen">
      <ScreenHeader title="FAQ" goBack={goBack} />
      <View style={styles.mainBox}>
        <Text style={[styles.mainText, { color: color.mainText }]}>Frequently Asked Questions</Text>
        <FlatList
          contentContainerStyle={styles.faqList}
          data={faqs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => toggleTab(item.id)}>
              <FAQElement {...item} isActive={item.id === currTab} />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainBox: {
    gap: 20,
    padding: 20
  },
  mainText: {
    fontFamily: fonts.I_700,
    fontSize: 18
  },
  faqList: {
    gap: 10
  }
});
