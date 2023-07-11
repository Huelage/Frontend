import {
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
  useFonts
} from '@expo-google-fonts/dev';
import { NavigationContainer } from "@react-navigation/native";
import { useState } from 'react';
import StackNavigator from './src/navigators/StackNavigator';
import TabNavigator from './src/navigators/TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


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
    InterTight_700Bold_Italic
  });
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);

  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isSignedIn ? <TabNavigator /> : <StackNavigator />}
      </NavigationContainer >
    </SafeAreaProvider>
  );
};

export default App;