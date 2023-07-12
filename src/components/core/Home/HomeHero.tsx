import { fonts } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const HomeHero = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <Text style={styles.mainText}>Your hunger</Text>
        <Text style={styles.mainTextAccent}>Companion</Text>
      </View>
      <View style={styles.promoBox}>
        <Text style={styles.promoDiscount}>30%</Text>
        <Text style={styles.promotext}>discount only valid for today</Text>
      </View>
      <Image style={styles.promoImage} source={require('@images/prawnImg.png')} />
    </View>
  );
};

export default HomeHero;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    gap: 10,
    justifyContent: 'center',
    height: 200
  },
  mainBox: {
    alignItems: 'flex-start',
    gap: -5,
    paddingLeft: 40
  },
  mainText: {
    fontFamily: fonts.I_700,
    fontSize: 30
  },
  mainTextAccent: {
    color: '#29A40A',
    fontFamily: fonts.I_700,
    fontSize: 38
  },
  promoBox: {
    alignItems: 'center',
    backgroundColor: '#47CA4C',
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 40
  },
  promoDiscount: {
    color: '#fff',
    fontFamily: fonts.I_700,
    fontSize: 48
  },
  promotext: {
    color: '#fff',
    fontFamily: fonts.I_700,
    fontSize: 16,
    width: '40%'
  },
  promoImage: {
    position: 'absolute',
    right: -wp('25%'),
    width: 250,
    height: 250,
    shadowColor: 'rgba(71, 202, 76, .4)',
    shadowOffset: { width: -15, height: 10 },
    shadowOpacity: .5,
    shadowRadius: 8
  }
});