import { VendorTabHeader } from "@components/navigation";
import { VendorOrdersTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrderDetailScreen, OrderScreen } from "@screens/Vendor";
import React from "react";

const Stack = createNativeStackNavigator<VendorOrdersTabStackParamList>();

const VendorOrdersTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={OrderScreen} options={{ header: () => <VendorTabHeader />, headerShown: true }} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default VendorOrdersTabStack;