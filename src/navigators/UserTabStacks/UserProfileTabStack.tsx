import { UserTabHeader } from "@components/navigation";
import { UserProfileTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "@screens/core";
import {
  AboutUs,
  FAQs,
  Help,
  Location,
  MyOrders,
  Notification,
  ProfileDetails,
  Referral,
  Setting,
  Wallet,
} from "@screens/core/Profile";
import React from "react";

const Stack = createNativeStackNavigator<UserProfileTabStackParamList>();

const UserProfileTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={ProfileScreen}
        options={{ header: () => <UserTabHeader /> }}
      />
      <Stack.Screen name="About" component={AboutUs} />
      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Locations" component={Location} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="Referral" component={Referral} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  );
};

export default UserProfileTabStack;
