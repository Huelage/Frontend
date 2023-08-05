import { fonts } from '@utils';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface HeroProp {
  lead: string,
  accent: string;
  page: "SU" | "SI";
}
const Hero = ({ lead, accent, page }: HeroProp) => {
  const heroOneAccentText = page === 'SI' ? { ...styles.heroOneAccentText, marginLeft: 8 } : styles.heroOneAccentText;
  return (
    <ImageBackground resizeMode='cover' source={require('@images/authHeroBg.png')} style={[styles.heroOne]}>
      <View style={styles.heroOneLogo}>
        <Animated.Image
          sharedTransitionTag='huelageLogo'
          style={styles.logoImage}
          source={require('@images/rectangle.png')}
        />
      </View>
      <Text style={styles.heroOneLeadText}>{lead}</Text>
      <Text style={heroOneAccentText}>{accent}</Text>
    </ImageBackground>
  );
};

export default Hero;

const styles = StyleSheet.create({
  heroOne: {
    paddingBottom: 45,
    paddingTop: hp("6.5%"),
    paddingHorizontal: wp("8%")
  },
  heroOneLogo: {
    alignItems: 'flex-end',
    marginBottom: 25
  },
  heroOneLeadText: {
    color: '#fff',
    fontSize: 36,
    fontFamily: fonts.I_700
  },
  heroOneAccentText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.I_400,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
});