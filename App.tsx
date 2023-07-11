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
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      {isSignedIn ? <TabNavigator /> : <StackNavigator />}
    </NavigationContainer >
  );
};

export default App;