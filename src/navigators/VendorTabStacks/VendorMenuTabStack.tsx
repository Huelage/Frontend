import { VendorTabHeader } from "@components/navigation";
import { VendorMenuTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuScreen } from "@screens/Vendor";
import React from "react";

const Stack = createNativeStackNavigator<VendorMenuTabStackParamList>();

const VendorMenuTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MenuScreen} options={{ header: () => <VendorTabHeader /> }} />
    </Stack.Navigator>
  );
};

export default VendorMenuTabStack;