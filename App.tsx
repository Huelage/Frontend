import {
  BerkshireSwash_400Regular,
  InterTight_300Light_Italic,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  useFonts
} from '@expo-google-fonts/dev';
import { NavigationContainer } from "@react-navigation/native";
import { useState } from 'react';
import StackNavigator from './src/navigators/StackNavigator';
import TabNavigator from './src/navigators/TabNavigator';


const App = () => {
  const [fontsLoaded] = useFonts({
    Cooper_Black_Regular: require('./assets/fonts/Cooper_Black_Regular.ttf'),
    Inter_200ExtraLight,
    Inter_300Light,
    InterTight_300Light_Italic,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    BerkshireSwash_400Regular,
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic
  });
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);

  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      {isSignedIn ? <TabNavigator /> : <StackNavigator />}
    </NavigationContainer >
  );
};

export default App;