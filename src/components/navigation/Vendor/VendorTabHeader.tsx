import { useAppTheme } from '@hooks';
import { VendorNavigationProps } from '@interfaces';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '@utils';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import OrderBar from './OrderBar';
import { useAppDispatch } from '@api/app/appHooks';
import { setAuthStatus } from '@api/slices/globalSlice';

const VendorTabHeader = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<VendorNavigationProps>();
  const inset = useSafeAreaInsets();
  const { color } = useAppTheme();
  return (
    <>
      <StatusBar style="auto" />
      <ImageBackground style={[styles.container, { paddingTop: inset.top + 20 }]} source={require('@images/salado.png')}>
        <View style={styles.headerBox}>
          <Text testID='vendor name' style={styles.resName}>Salado Cafeteria</Text>
          <TouchableOpacity onPress={() => dispatch(setAuthStatus(false))}>
            <View testID='notification button' style={[styles.navButton, { backgroundColor: color.cardBg }]}>
              <Svg height={20} width={20} viewBox="0 0 18 21">
                <Path fill={color.mainText} d="M17.7361 13.2639L15.875 11.4029V8.9375C15.8729 7.23376 15.2391 5.59133 14.0962 4.3278C12.9533 3.06427 11.3825 2.26939 9.6875 2.09688V0.6875H8.3125V2.09688C6.61752 2.26939 5.04671 3.06427 3.90382 4.3278C2.76092 5.59133 2.12713 7.23376 2.125 8.9375V11.4029L0.263937 13.2639C0.134997 13.3928 0.0625389 13.5677 0.0625 13.75V15.8125C0.0625 15.9948 0.134933 16.1697 0.263864 16.2986C0.392795 16.4276 0.567664 16.5 0.75 16.5H5.5625V17.0342C5.54754 17.9064 5.85497 18.7534 6.42585 19.413C6.99674 20.0725 7.79093 20.4982 8.65625 20.6085C9.13418 20.6559 9.61675 20.6027 10.0729 20.4524C10.5291 20.3021 10.9487 20.058 11.3049 19.7358C11.661 19.4136 11.9458 19.0204 12.1408 18.5815C12.3359 18.1426 12.437 17.6678 12.4375 17.1875V16.5H17.25C17.4323 16.5 17.6072 16.4276 17.7361 16.2986C17.8651 16.1697 17.9375 15.9948 17.9375 15.8125V13.75C17.9375 13.5677 17.865 13.3928 17.7361 13.2639ZM11.0625 17.1875C11.0625 17.7345 10.8452 18.2591 10.4584 18.6459C10.0716 19.0327 9.54701 19.25 9 19.25C8.45299 19.25 7.92839 19.0327 7.54159 18.6459C7.1548 18.2591 6.9375 17.7345 6.9375 17.1875V16.5H11.0625V17.1875ZM16.5625 15.125H1.4375V14.0346L3.29856 12.1736C3.4275 12.0447 3.49996 11.8698 3.5 11.6875V8.9375C3.5 7.47881 4.07946 6.07986 5.11091 5.04841C6.14236 4.01696 7.54131 3.4375 9 3.4375C10.4587 3.4375 11.8576 4.01696 12.8891 5.04841C13.9205 6.07986 14.5 7.47881 14.5 8.9375V11.6875C14.5 11.8698 14.5725 12.0447 14.7014 12.1736L16.5625 14.0346V15.125Z" />
              </Svg>
              <View testID='quantity badge' style={styles.notificationBubble}>
                <Text style={styles.notificationNo}>6</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <OrderBar />
      </ImageBackground>
    </>
  );
};

export default VendorTabHeader;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  headerBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  navButton: {
    alignItems: 'center',
    backgroundColor: "#F0FFF0",
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  notificationBubble: {
    alignItems: 'center',
    backgroundColor: "#E93223",
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
  },
  notificationNo: {
    color: "#fff",
    fontFamily: fonts.I_600,
    fontSize: 12
  },
  resName: {
    color: "#F0FFF0",
    fontFamily: fonts.I_700,
    fontSize: 30
  }
});