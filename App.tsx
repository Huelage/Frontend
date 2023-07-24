import { store } from "@api/app/store";
import {
  InterTight_200ExtraLight_Italic,
  InterTight_300Light_Italic,
  InterTight_400Regular_Italic,
  InterTight_500Medium_Italic,
  InterTight_600SemiBold_Italic,
  InterTight_700Bold_Italic,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/dev";
import { StackNavigator, TabNavigator } from "@navigators";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    InterTight_200ExtraLight_Italic,
    Inter_300Light,
    InterTight_300Light_Italic,
    Inter_400Regular,
    InterTight_400Regular_Italic,
    Inter_500Medium,
    InterTight_500Medium_Italic,
    Inter_600SemiBold,
    InterTight_600SemiBold_Italic,
    Inter_700Bold,
    InterTight_700Bold_Italic,
  });
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);

  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {isSignedIn ? <TabNavigator /> : <StackNavigator />}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
