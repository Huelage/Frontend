import { VendorTabHeader } from "@components/navigation";
import { VendorAccountTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "@screens/Vendor";
import React from "react";

const Stack = createNativeStackNavigator<VendorAccountTabStackParamList>();

const VendorAccountTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={AccountScreen} options={{ header: () => <VendorTabHeader /> }} />
    </Stack.Navigator>
  );
};

export default VendorAccountTabStack;