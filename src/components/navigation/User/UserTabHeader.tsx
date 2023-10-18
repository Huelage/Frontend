import { useAppDispatch } from '@api/app/appHooks';
import { clearCredentials, switchTheme } from '@api/slices/globalSlice';
import { useAppTheme } from '@hooks';
import { UserNavigationProps } from '@interfaces';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const UserTabHeader = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<UserNavigationProps>();
  const inset = useSafeAreaInsets();
  const { color, theme } = useAppTheme();
  const imgLight = Image.resolveAssetSource(require('@icons/toggle_light.png')).uri;
  const imgDark = Image.resolveAssetSource(require('@icons/toggle_dark.png')).uri;
  const toggleTheme = () => dispatch(switchTheme(theme === 'light' ? 'dark' : 'light'));
  const logout = () => dispatch(clearCredentials());
  const goToCart = () => navigate("Cart");
  return (
    <View style={[styles.container, { backgroundColor: color.mainBg, paddingTop: inset.top }]}>
      <Text testID='greeting text' style={[styles.headerGreeting, { color: color.mainText }]}>Good morning</Text>
      <View style={styles.headerBox}>
        <View style={styles.headerDetail}>
          <TouchableOpacity onPress={logout}>
            <Image testID='user image' style={styles.headerImage} source={require('@images/beejay_dp.png')} />
          </TouchableOpacity>
          <Text testID='username' style={[styles.headerName, { color: color.mainText }]}>John Jane Doe</Text>
        </View>
        <View style={styles.headerAction}>
          <TouchableOpacity testID='theme toggle' onPress={toggleTheme}>
            <Image style={styles.headerToggle} source={{ uri: theme === 'dark' ? imgLight : imgDark }} />
          </TouchableOpacity>
          <TouchableOpacity testID='cart button' onPress={goToCart}>
            <Svg height={25} width={25} viewBox="0 0 30 30">
              <Path fill={color.mainText} d="M1.25 0C0.918479 0 0.600537 0.131696 0.366117 0.366117C0.131696 0.600537 0 0.918479 0 1.25C0 1.58152 0.131696 1.89946 0.366117 2.13388C0.600537 2.3683 0.918479 2.5 1.25 2.5H1.865C2.13643 2.50047 2.40033 2.58928 2.61682 2.753C2.83331 2.91672 2.99063 3.14646 3.065 3.4075L7.03 17.2825C7.25426 18.0655 7.72735 18.7542 8.37775 19.2445C9.02816 19.7348 9.82051 20 10.635 20H22.0575C22.8071 20.0001 23.5396 19.7756 24.1603 19.3554C24.7811 18.9351 25.2616 18.3385 25.54 17.6425L29.225 8.4275C29.3765 8.04831 29.4328 7.6378 29.389 7.23183C29.3452 6.82586 29.2026 6.43679 28.9737 6.09865C28.7449 5.7605 28.4366 5.48357 28.076 5.29205C27.7154 5.10053 27.3133 5.00026 26.905 5H6.12L5.4675 2.72C5.24381 1.93693 4.77129 1.24797 4.12135 0.757241C3.47141 0.266517 2.67939 0.00071092 1.865 0H1.25ZM9.435 16.5925L6.835 7.5H26.9025L23.2175 16.715C23.1246 16.9467 22.9645 17.1453 22.7578 17.2852C22.551 17.4251 22.3071 17.4999 22.0575 17.5H10.635C10.3636 17.4995 10.0997 17.4107 9.88318 17.247C9.66669 17.0833 9.50937 16.8535 9.435 16.5925ZM11.25 30C11.7425 30 12.2301 29.903 12.6851 29.7145C13.14 29.5261 13.5534 29.2499 13.9017 28.9017C14.2499 28.5534 14.5261 28.14 14.7145 27.6851C14.903 27.2301 15 26.7425 15 26.25C15 25.7575 14.903 25.2699 14.7145 24.8149C14.5261 24.36 14.2499 23.9466 13.9017 23.5983C13.5534 23.2501 13.14 22.9739 12.6851 22.7855C12.2301 22.597 11.7425 22.5 11.25 22.5C10.2554 22.5 9.30161 22.8951 8.59835 23.5983C7.89509 24.3016 7.5 25.2554 7.5 26.25C7.5 27.2446 7.89509 28.1984 8.59835 28.9017C9.30161 29.6049 10.2554 30 11.25 30ZM11.25 27.5C10.9185 27.5 10.6005 27.3683 10.3661 27.1339C10.1317 26.8995 10 26.5815 10 26.25C10 25.9185 10.1317 25.6005 10.3661 25.3661C10.6005 25.1317 10.9185 25 11.25 25C11.5815 25 11.8995 25.1317 12.1339 25.3661C12.3683 25.6005 12.5 25.9185 12.5 26.25C12.5 26.5815 12.3683 26.8995 12.1339 27.1339C11.8995 27.3683 11.5815 27.5 11.25 27.5ZM21.25 30C21.7425 30 22.2301 29.903 22.6851 29.7145C23.14 29.5261 23.5534 29.2499 23.9017 28.9017C24.2499 28.5534 24.5261 28.14 24.7145 27.6851C24.903 27.2301 25 26.7425 25 26.25C25 25.7575 24.903 25.2699 24.7145 24.8149C24.5261 24.36 24.2499 23.9466 23.9017 23.5983C23.5534 23.2501 23.14 22.9739 22.6851 22.7855C22.2301 22.597 21.7425 22.5 21.25 22.5C20.2554 22.5 19.3016 22.8951 18.5983 23.5983C17.8951 24.3016 17.5 25.2554 17.5 26.25C17.5 27.2446 17.8951 28.1984 18.5983 28.9017C19.3016 29.6049 20.2554 30 21.25 30ZM21.25 27.5C20.9185 27.5 20.6005 27.3683 20.3661 27.1339C20.1317 26.8995 20 26.5815 20 26.25C20 25.9185 20.1317 25.6005 20.3661 25.3661C20.6005 25.1317 20.9185 25 21.25 25C21.5815 25 21.8995 25.1317 22.1339 25.3661C22.3683 25.6005 22.5 25.9185 22.5 26.25C22.5 26.5815 22.3683 26.8995 22.1339 27.1339C21.8995 27.3683 21.5815 27.5 21.25 27.5Z" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserTabHeader;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5
  },
  foodBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 155,
    width: wp("100%"),
  },
  headerGreeting: {
    fontFamily: fonts.I_400,
    fontSize: 12
  },
  headerBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerDetail: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between'
  },
  headerAction: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center'
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 25
  },
  headerName: {
    fontFamily: fonts.I_700,
    fontSize: 18
  },
  headerToggle: {
    width: 30,
    height: 30
  }
});