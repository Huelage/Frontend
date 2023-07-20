import { fonts } from '@utils';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface HeroProp {
  lead: string,
  accent: string;
  page: "SU" | "SI";
}
const Hero = ({ lead, accent, page }: HeroProp) => {
  const heroOneAccentText = page === 'SI' ? { ...styles.heroOneAccentText, marginLeft: 8 } : styles.heroOneAccentText;
  return (
    <ImageBackground resizeMode='cover' source={require('@images/authHeroBg.png')} style={styles.heroOne}>
      <View style={styles.heroOneLogo}>
        <Image style={styles.logoImage} source={require('@images/rectangle.png')} />
      </View>
      <Text style={styles.heroOneLeadText}>{lead}</Text>
      <Text style={heroOneAccentText}>{accent}</Text>
    </ImageBackground>
  );
};

export default Hero;

const styles = StyleSheet.create({
  heroOne: {
    paddingBottom: hp("4%"),
    paddingTop: hp("6.5%"),
    paddingHorizontal: wp("8%")
  },
  heroOneLogo: {
    alignItems: 'flex-end',
    marginBottom: hp("4%")
  },
  heroOneLeadText: {
    color: '#fff',
    fontSize: 40,
    fontFamily: fonts.I_700
  },
  heroOneAccentText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: fonts.I_400,
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  }
});