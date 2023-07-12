import { fonts } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface HeroProp {
  lead: string,
  accent: string;
  page: "SU" | "SI";
}
const Hero = ({ lead, accent, page }: HeroProp) => {
  const heroOne = page == 'SU' ? { ...styles.heroOne, marginBottom: 5 } : styles.heroOne;
  const heroOneAccentText = page === 'SI' ? { ...styles.heroOneAccentText, marginLeft: 8 } : styles.heroOneAccentText;
  return (
    <View style={heroOne}>
      <View style={styles.heroOneLogo}>
        <Image style={styles.logoImage} source={require('../../../assets/images/rectangle.png')} />
      </View>
      <Text style={styles.heroOneLeadText}>{lead}</Text>
      <Text style={heroOneAccentText}>{accent}</Text>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  heroOne: {
    marginVertical: hp("6.5%"),
    marginHorizontal: wp("8%")
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