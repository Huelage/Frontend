import { CustomModal } from '@components/misc';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FoodInterface } from '@interfaces';
import { CheckBox } from '@rneui/themed';
import { fonts, shadowStyle } from '@utils';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FoodModalContent from './FoodModalContent';

const FoodCard = ({ imgUrl, name, price, rating, cals, isFavourite, desc }: FoodInterface) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
      <View style={styles.container}>
        <View style={styles.foodIntro}>
          <View style={styles.foodRatingBox}>
            <Ionicons name="star" size={24} color="#47CA4C" />
            <Text style={styles.foodRating}>{rating}</Text>
          </View>
          <Image style={styles.foodImage} source={{ uri: imgUrl }} resizeMode='contain' />
          <CheckBox
            checked={isFavourite}
            onPress={() => { }}
            checkedIcon="heart"
            uncheckedIcon="heart-o"
            checkedColor="red"
            uncheckedColor='black'
            containerStyle={{ backgroundColor: '#F0FFF0', padding: 0, margin: 0 }}
          />
        </View>
        <Text style={styles.foodName}>{name}</Text>
        <View style={styles.foodCalories}>
          <MaterialCommunityIcons name="fire" size={22} color="#47CA4C" />
          <Text style={styles.foodCaloriesText}>{cals} KCal</Text>
        </View>
        <Text style={styles.foodPrice}>
          <MaterialCommunityIcons name="currency-ngn" size={12} color="black" />
          {price}
        </Text>
      </View>
      <CustomModal isVisible={showModal} close={setShowModal}>
        <FoodModalContent imgUrl={imgUrl} name={name} desc={desc} />
      </CustomModal>
    </TouchableWithoutFeedback>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F0FFF0',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    gap: 5,
    width: wp("60%"),
    marginTop: 80,
    marginLeft: 20,
    ...shadowStyle
  },
  foodIntro: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 35
  },
  foodImage: {
    position: 'absolute',
    left: 48,
    top: -hp("10%"),
    borderRadius: 65,
    height: 130,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: .3,
    shadowRadius: 5,
    width: 130,
    zIndex: 2
  },
  foodCalories: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center'
  },
  foodCaloriesText: {
    fontFamily: fonts.I_400,
    fontSize: 12
  },
  foodName: {
    fontFamily: fonts.I_700,
    fontSize: 14,
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
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  foodRatingBox: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center'
  },
  foodRating: {
    fontFamily: fonts.I_400,
    fontSize: 14,
    paddingTop: 6
  }
});