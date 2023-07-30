import { CustomModal } from '@components/misc';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FoodInterface } from '@interfaces';
import { CheckBox } from '@rneui/themed';
import { fonts, shadowStyle } from '@utils';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FoodModalContent from './FoodModalContent';

const FoodCard = ({ imgUrl, name, price, rating, cals, isFavourite, desc }: FoodInterface) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(isFavourite);
  return (
    <>
      <DropShadow style={styles.container}>
        <View style={styles.foodIntro}>
          <View style={styles.foodRatingBox}>
            <Ionicons name="star" size={24} color="#47CA4C" />
            <Text style={styles.foodRating}>{rating}</Text>
          </View>
          <DropShadow style={styles.foodImageContainer}>
            <Image style={styles.foodImage} source={{ uri: imgUrl }} resizeMode='contain' />
          </DropShadow>
          <CheckBox
            checked={isFav}
            onPress={() => setIsFav(!isFav)}
            checkedIcon="heart"
            uncheckedIcon="heart-o"
            checkedColor="red"
            uncheckedColor='black'
            containerStyle={{ backgroundColor: '#F0FFF0', padding: 0, margin: 0 }}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
          <Text style={styles.foodName}>{name}</Text>
          <View style={styles.foodCalories}>
            <MaterialCommunityIcons name="fire" size={22} color="#47CA4C" />
            <Text style={styles.foodCaloriesText}>{cals} KCal</Text>
          </View>
          <Text style={styles.foodPrice}>
            <MaterialCommunityIcons name="currency-ngn" size={12} color="black" />
            {price}
          </Text>
        </TouchableWithoutFeedback>
      </DropShadow>
      <CustomModal isVisible={showModal} close={setShowModal}>
        <FoodModalContent imgUrl={imgUrl} name={name} desc={desc} />
      </CustomModal>
    </>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F0FFF0',
    borderRadius: 10,
    gap: 5,
    justifyContent: 'center',
    marginTop: 65,
    marginLeft: 20,
    padding: 10,
    width: wp("60%"),
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
  foodImageContainer: {
    alignItems: 'center',
    borderRadius: 60,
    height: 120,
    justifyContent: 'center',
    left: 55,
    position: 'absolute',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: .3,
    shadowRadius: 5,
    top: -hp("8%"),
    width: 120,
    zIndex: 2
  },
  foodImageBlur: {
    height: '100%',
    width: '100%',
  },
  foodImage: {
    borderRadius: 55,
    height: 110,
    width: 110,
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
    fontSize: 14,
    textAlign: 'center'
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