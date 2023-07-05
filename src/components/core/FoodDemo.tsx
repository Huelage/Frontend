import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { FoodInterface } from '../../utils/interfaces';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fonts } from '../../utils/fontEnum';
import CustomButton from './CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FoodProps extends FoodInterface {
  addToCart: () => void;
}
const FoodDemo = ({ imgUrl, name, price, addToCart }: FoodProps) => {
  console.log(imgUrl);
  return (
    <View style={styles.container}>
      <Image style={styles.foodImage} source={require('../../../assets/images/prawnImg.png')} />
      <Text style={styles.foodName}>{name}</Text>
      <View style={styles.foodAction}>
        <Text style={styles.foodPrice}>
          <MaterialCommunityIcons name="currency-ngn" size={18} color="black" />
          {price}
        </Text>
        <CustomButton fontSize={14} height={40} label='Add' icon="add-circle-outline" onPress={addToCart} />
      </View>
    </View>
  );
};

export default FoodDemo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: '#4CAF50',
    borderRadius: 20,
    borderWidth: 2,
    height: wp("60%"),
    justifyContent: 'center',
    padding: 15,
    width: wp("60%")
  },
  foodImage: {
    height: 130,
    width: 130
  },
  foodName: {
    fontFamily: fonts.O_600,
    fontSize: 18,
    textAlign: 'center'
  },
  foodAction: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    width: '100%'
  },
  foodPrice: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.O_600,
    fontSize: 18
  }
});