import { VendorTabHeader } from "@components/navigation";
import { VendorOrdersTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrderScreen } from "@screens/Vendor";
import React from "react";

const Stack = createNativeStackNavigator<VendorOrdersTabStackParamList>();

const VendorOrdersTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={OrderScreen} options={{ header: () => <VendorTabHeader /> }} />
    </Stack.Navigator>
  );
};

export default VendorOrdersTabStack;