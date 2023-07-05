import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fontEnum';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface HeroProp {
  lead: string,
  accent: string;
  page: "SU" | "SI";
}
const Hero = ({ lead, accent, page }: HeroProp) => {
  const heroOne = page == 'SU' ? { ...styles.heroOne, marginBottom: 5 } : styles.heroOne;
  return (
    <View style={heroOne}>
      <View style={styles.heroOneLogo}>
        <Image style={styles.logoImage} source={require('../../../assets/images/onboardLogo.png')} />
      </View>
      <Text style={styles.heroOneLeadText}>{lead}</Text>
      <Text style={styles.heroOneAccentText}>{accent}</Text>
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
    marginBottom: hp("2%")
  },
  heroOneLeadText: {
    color: '#fff',
    fontSize: 40,
    fontFamily: fonts.C_400
  },
  heroOneAccentText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: fonts.I_400,
    paddingLeft: 8
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  }
});