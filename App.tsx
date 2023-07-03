import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardScreen from "./src/screens/OnBoardScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoard">
        <Stack.Screen name="OnBoard" component={OnBoardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;